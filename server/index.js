import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { initDb } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import songRoutes from "./routes/songs.js";
import { scanLocalMusicFiles } from "./services/musicScanner.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), "server/.env") });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

const corsOrigin = process.env.CORS_ORIGIN;
app.use(cors(corsOrigin ? { origin: corsOrigin.split(",").map((o) => o.trim()) } : undefined));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    service: "AuraSound Music Server",
    mode: isProduction ? "production" : "development",
  });
});

if (isProduction) {
  const distPath = path.join(__dirname, "../dist");
  app.use(express.static(distPath));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(distPath, "index.html"), (err) => {
      if (err) next(err);
    });
  });
}

async function startServer() {
  await initDb();
  const songs = scanLocalMusicFiles();

  app.listen(PORT, HOST, () => {
    console.log(`[AuraSound Backend] Server listening on http://${HOST}:${PORT}`);
    console.log(`[AuraSound Backend] Mode: ${isProduction ? "production" : "development"}`);
    console.log(`[AuraSound Backend] Indexed ${songs.length} tracks`);
    if (isProduction) {
      console.log(`[AuraSound Backend] Serving frontend from /dist`);
    }
  });
}

startServer();
