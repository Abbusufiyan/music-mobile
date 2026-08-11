import React, { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import { Heart, Play, Clock, Music } from "lucide-react";
import { LIKED_SONGS } from "@/data/songs";
import "./LikedSongs.css";

function LikedSongs() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredSongs = activeTab === "All"
    ? LIKED_SONGS
    : LIKED_SONGS.filter(s => s.genre.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <div className="liked-page">
      <Navbar />

      <main className="liked-main">
        {/* HEADER HERO */}
        <div className="liked-hero">
          <div className="liked-cover-icon">
            <Heart size={44} fill="#ffffff" color="#ffffff" />
          </div>

          <div className="liked-meta">
            <span className="type">PLAYLIST</span>
            <h1>Liked Songs</h1>
            <p className="details">
              <span>{LIKED_SONGS.length} tracks</span> • <span>28 mins 42 secs</span>
            </p>
          </div>
        </div>

        {/* CONTROLS & FILTER */}
        <div className="liked-controls">
          <button className="play-all-btn">
            <Play size={20} fill="#ffffff" />
            <span>Play All</span>
          </button>

          <div className="genre-filter-tabs">
            {["All", "Indie", "Synthwave", "Rock"].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* SONGS TABLE */}
        <div className="liked-table-container">
          <div className="table-header">
            <span className="th-num">#</span>
            <span className="th-title">TITLE</span>
            <span className="th-album">ALBUM</span>
            <span className="th-genre">GENRE</span>
            <span className="th-time"><Clock size={14} /></span>
          </div>

          <div className="table-body">
            {filteredSongs.map((song, i) => (
              <div key={song.id} className="table-row">
                <span className="td-num">{i + 1}</span>
                <div className="td-title">
                  <img src={song.cover} alt={song.title} className="track-cover" />
                  <div className="track-details">
                    <span className="track-name">{song.title}</span>
                    <span className="track-artist">{song.artist}</span>
                  </div>
                </div>
                <span className="td-album">{song.album || "Single"}</span>
                <span className="td-genre">{song.genre}</span>
                <span className="td-time">{song.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default LikedSongs;
