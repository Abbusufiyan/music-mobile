import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDb } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import songRoutes from "./routes/songs.js";
import { scanLocalMusicFiles } from "./services/musicScanner.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "online", service: "AuraSound Music Server" });
});

async function startServer() {
  await initDb();
  scanLocalMusicFiles();

  app.listen(PORT, () => {
    console.log(`[AuraSound Backend] Server listening on http://localhost:${PORT}`);
  });
}

startServer();
