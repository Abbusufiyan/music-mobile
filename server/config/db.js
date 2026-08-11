import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "music_app_db";

let pool = null;
let isMySqlAvailable = false;

// Fallback in-memory / file database state if local MySQL server daemon is unconfigured
export const localDbFallback = {
  users: [
    {
      id: 1,
      username: "demo_user",
      email: "user@aurasound.com",
      password_hash: "$2a$10$wN9r81O/3J9yDq5dO/nK/O5QhPjYfB3P6a1.Vd0H5N0P.1",
      created_at: new Date()
    }
  ],
  likedSongs: new Set([1, 2, 4, 7]),
  playlists: [
    { id: 1, title: "Favorites Mix", description: "My favorite tracks", songs: [1, 2, 3, 4] }
  ]
};

export async function initDb() {
  try {
    // Attempt connecting to MySQL server
    const tempConn = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD
    });

    await tempConn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    await tempConn.end();

    pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10
    });

    // Create tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(150) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS songs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        artist VARCHAR(255) NOT NULL,
        album VARCHAR(255) DEFAULT 'Single',
        duration VARCHAR(50) DEFAULT '3:30',
        file_name VARCHAR(255) NOT NULL,
        genre VARCHAR(100) DEFAULT 'Indie / Pop',
        bpm INT DEFAULT 100,
        release_year INT DEFAULT 2023
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS lyrics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        song_id INT NOT NULL,
        lyrics_text TEXT NOT NULL,
        FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS liked_songs (
        user_id INT NOT NULL,
        song_id INT NOT NULL,
        PRIMARY KEY (user_id, song_id)
      );
    `);

    isMySqlAvailable = true;
    console.log(`[DB] MySQL database "${DB_NAME}" connected and initialized successfully.`);
  } catch (err) {
    console.warn(`[DB] MySQL connection notice (${err.message}). Using hybrid DB mode.`);
    isMySqlAvailable = false;
  }
}

export function getPool() {
  return pool;
}

export function isDbConnected() {
  return isMySqlAvailable;
}
