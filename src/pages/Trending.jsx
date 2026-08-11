import React from "react";
import Navbar from "@/components/ui/Navbar";
import { TrendingUp, Play, Flame, BarChart2 } from "lucide-react";
import { TRENDING_SONGS, LIKED_SONGS } from "@/data/songs";
import "./Trending.css";

function Trending() {
  const allTrending = [...TRENDING_SONGS, ...LIKED_SONGS.slice(0, 4)];

  return (
    <div className="trending-page">
      <Navbar />

      <main className="trending-main">
        {/* HERO BANNER */}
        <div className="trending-hero">
          <div className="trending-badge">
            <Flame size={16} />
            <span>GLOBAL TOP CHARTS</span>
          </div>

          <h1>Top 10 Trending Tracks</h1>
          <p>The most listened, shared, and played songs across AuraSound music network this week.</p>
        </div>

        {/* LIST OF TRENDING SONGS */}
        <div className="trending-list-container">
          {allTrending.map((song, i) => (
            <div key={song.id || i} className="trending-row">
              <div className="trend-rank">
                <span className="rank-num">#{i + 1}</span>
                {i < 3 && <Flame size={14} className="fire-icon" />}
              </div>

              <img src={song.cover} alt={song.title} className="trend-cover" />

              <div className="trend-info">
                <span className="trend-title">{song.title}</span>
                <span className="trend-artist">{song.artist}</span>
              </div>

              <div className="trend-stats">
                <BarChart2 size={14} />
                <span>{song.plays || `${(85 - i * 6).toFixed(1)}M`} plays</span>
              </div>

              <button className="trend-play-btn">
                <Play size={16} fill="#ffffff" />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Trending;
