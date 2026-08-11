import express from "express";
import fs from "fs";
import path from "path";
import { scanLocalMusicFiles, LOCAL_MUSIC_DIR } from "../services/musicScanner.js";
import { localDbFallback } from "../config/db.js";

const router = express.Router();

// GET ALL SONGS (Index local files from /home/omr/Music/Fuck upp/)
router.get("/", (req, res) => {
  const songs = scanLocalMusicFiles();
  res.json({ songs, total: songs.length });
});

// STREAM LOCAL MP3 FILE
router.get("/stream/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(LOCAL_MUSIC_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Local audio file not found." });
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "audio/mpeg",
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "audio/mpeg",
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

// TOGGLE LIKE
router.post("/like", (req, res) => {
  const { songId } = req.body;
  if (!songId) return res.status(400).json({ error: "Song ID required." });

  if (localDbFallback.likedSongs.has(songId)) {
    localDbFallback.likedSongs.delete(songId);
    res.json({ liked: false, message: "Removed from Liked Songs." });
  } else {
    localDbFallback.likedSongs.add(songId);
    res.json({ liked: true, message: "Added to Liked Songs." });
  }
});

export default router;
