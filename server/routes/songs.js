import express from "express";
import fs from "fs";
import path from "path";
import { scanLocalMusicFiles } from "../services/musicScanner.js";
import { localDbFallback } from "../config/db.js";

const router = express.Router();

const MUSIC_DIRS = {
  fuckupp: "/home/omr/Music/Fuck upp/",
  nfak: "/home/omr/Music/NFAK/",
};

function resolveMusicFile(folder, filename) {
  const decoded = decodeURIComponent(filename);
  if (folder) {
    const dir = MUSIC_DIRS[folder.toLowerCase()];
    if (!dir) return null;
    return path.join(dir, decoded);
  }
  // Legacy single-segment route: try Fuck upp first, then NFAK
  for (const dir of Object.values(MUSIC_DIRS)) {
    const candidate = path.join(dir, decoded);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function streamAudioFile(req, res, filePath) {
  if (!filePath || !fs.existsSync(filePath)) {
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
      "Accept-Ranges": "bytes",
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
}

// GET ALL SONGS
router.get("/", (req, res) => {
  const songs = scanLocalMusicFiles();
  res.json({ songs, total: songs.length });
});

// STREAM: /api/songs/stream/:folder/:filename  (e.g. fuckupp or nfak)
router.get("/stream/:folder/:filename", (req, res) => {
  const filePath = resolveMusicFile(req.params.folder, req.params.filename);
  streamAudioFile(req, res, filePath);
});

// STREAM: /api/songs/stream/:filename  (legacy — searches both folders)
router.get("/stream/:filename", (req, res) => {
  const filePath = resolveMusicFile(null, req.params.filename);
  streamAudioFile(req, res, filePath);
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
