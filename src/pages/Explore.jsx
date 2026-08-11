import React, { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import BgBox from "@/components/ui/BgBox";
import { Compass, Flame, Radio, Music, Play } from "lucide-react";
import { LIKED_SONGS, TRENDING_SONGS, FEATURED_PLAYLISTS } from "@/data/songs";
import "./Explore.css";

const GENRES = [
  { name: "Indie Pop", color: "linear-gradient(135deg, #ec4899, #818cf8)" },
  { name: "Synthwave", color: "linear-gradient(135deg, #a855f7, #6366f1)" },
  { name: "Acoustic", color: "linear-gradient(135deg, #f59e0b, #ef4444)" },
  { name: "Hip-Hop / R&B", color: "linear-gradient(135deg, #10b981, #3b82f6)" },
  { name: "Chillwave", color: "linear-gradient(135deg, #06b6d4, #3b82f6)" },
  { name: "Rock & Roll", color: "linear-gradient(135deg, #8b5cf6, #ec4899)" },
];

function Explore() {
  const [selectedGenre, setSelectedGenre] = useState("All");

  return (
    <div className="explore-page">
      <Navbar />

      <main className="explore-main">
        {/* HERO BANNER */}
        <div className="explore-hero">
          <div className="explore-hero-content">
            <div className="hero-tag">
              <Compass size={14} />
              <span>Discover New Soundscapes</span>
            </div>
            <h1>Explore Trending Genres & Artists</h1>
            <p>Uncover hand-curated playlists, top charts, and indie sound waves from across the globe.</p>
          </div>
        </div>

        {/* GENRE CARDS */}
        <section className="explore-section">
          <h2>Browse Categories</h2>
          <div className="genres-grid">
            {GENRES.map((g, i) => (
              <div
                key={i}
                className="genre-card"
                style={{ background: g.color }}
                onClick={() => setSelectedGenre(g.name)}
              >
                <span>{g.name}</span>
                <Music size={24} className="genre-icon" />
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED PLAYLISTS */}
        <section className="explore-section">
          <h2>Curated Collections</h2>
          <div className="playlists-grid">
            {FEATURED_PLAYLISTS.map((pl) => (
              <BgBox key={pl.id} style={{ padding: "16px", borderRadius: "14px", backgroundColor: "#3a3d4a" }}>
                <div className="pl-card">
                  <img src={pl.cover} alt={pl.title} className="pl-cover" />
                  <div className="pl-info">
                    <h3>{pl.title}</h3>
                    <p>{pl.description}</p>
                    <span className="pl-count">{pl.count} tracks</span>
                  </div>
                  <button className="pl-play-btn">
                    <Play size={16} fill="#ffffff" />
                  </button>
                </div>
              </BgBox>
            ))}
          </div>
        </section>

        {/* TOP SONGS TABLE */}
        <section className="explore-section">
          <h2>Top Songs Chart</h2>
          <div className="songs-list-table">
            {LIKED_SONGS.map((song, i) => (
              <div key={song.id} className="table-row">
                <span className="row-num">{i + 1}</span>
                <img src={song.cover} alt={song.title} className="row-cover" />
                <div className="row-details">
                  <span className="row-title">{song.title}</span>
                  <span className="row-artist">{song.artist}</span>
                </div>
                <span className="row-genre">{song.genre}</span>
                <span className="row-duration">{song.duration}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Explore;
