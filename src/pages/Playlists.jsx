import React from "react";
import Navbar from "@/components/ui/Navbar";
import BgBox from "@/components/ui/BgBox";
import { Disc, Plus, Play, Music } from "lucide-react";
import { FEATURED_PLAYLISTS, LIKED_SONGS } from "@/data/songs";
import "./Playlists.css";

function Playlists() {
  return (
    <div className="playlists-page">
      <Navbar />

      <main className="playlists-main">
        <div className="playlists-header">
          <div>
            <h1>Your Library & Playlists</h1>
            <p>Organize your songs, custom mixes, and favorite collections.</p>
          </div>

          <button className="create-playlist-btn">
            <Plus size={18} />
            <span>Create Playlist</span>
          </button>
        </div>

        <div className="playlists-grid">
          {FEATURED_PLAYLISTS.map((pl) => (
            <BgBox key={pl.id} style={{ backgroundColor: "#3a3d4a", borderRadius: "16px", padding: "20px" }}>
              <div className="playlist-card-content">
                <div className="playlist-cover-wrapper">
                  <img src={pl.cover} alt={pl.title} className="pl-big-cover" />
                  <button className="pl-hover-play">
                    <Play size={20} fill="#ffffff" />
                  </button>
                </div>

                <div className="pl-details">
                  <h2>{pl.title}</h2>
                  <p>{pl.description}</p>
                  <span className="pl-meta">{pl.count} Songs • Updated 2 days ago</span>
                </div>
              </div>
            </BgBox>
          ))}
        </div>

        <section className="recent-activity">
          <h2>Recently Played Mixes</h2>
          <div className="recent-rows">
            {LIKED_SONGS.slice(0, 5).map((song, i) => (
              <div key={song.id} className="recent-item">
                <Music size={18} className="item-icon" />
                <span className="item-title">{song.title}</span>
                <span className="item-artist">{song.artist}</span>
                <span className="item-time">Played 10m ago</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Playlists;
