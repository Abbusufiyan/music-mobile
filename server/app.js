import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import songRoutes from "./routes/songs.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), "server/.env") });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";

export function createApp() {
  const app = express();

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

  if (isProduction && !process.env.VERCEL) {
    const distPath = path.join(__dirname, "../dist");
    app.use(express.static(distPath));
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api")) return next();
      res.sendFile(path.join(distPath, "index.html"), (err) => {
        if (err) next(err);
      });
    });
  }

  return app;
}
