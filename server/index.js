import dotenv from "dotenv";
import path from "path";
import { createApp } from "./app.js";
import { initDb } from "./config/db.js";
import { scanLocalMusicFiles } from "./services/musicScanner.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), "server/.env") });

const app = createApp();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";
const isProduction = process.env.NODE_ENV === "production";

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
