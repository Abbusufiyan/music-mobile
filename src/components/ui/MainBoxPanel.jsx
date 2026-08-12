import React from "react";
import { ArrowLeft, Play, Radio } from "lucide-react";
import SongCard from "@/components/card/SongCard";
import "./MainBoxPanel.css";

const VIEW_CONFIG = {
  0: { title: "My Favorites", subtitle: "Songs you've saved and love" },
  1: { title: "Most Played", subtitle: "Your top tracks this week" },
  2: { title: "Recents", subtitle: "Recently played on this device" },
  3: { title: "Trending Hits", subtitle: "What's hot right now" },
  4: { title: "Radio Stations", subtitle: "Curated live-style stations" },
};

const RADIO_STATIONS = [
  { id: "radio-1", name: "Bollywood Beats FM", genre: "Bollywood / Pop", listeners: "12.4k" },
  { id: "radio-2", name: "Sufi Soul Radio", genre: "Qawwali / Sufi", listeners: "8.1k" },
  { id: "radio-3", name: "Indie Vibes", genre: "Indie / Acoustic", listeners: "5.6k" },
  { id: "radio-4", name: "Romantic Nights", genre: "Love Songs", listeners: "15.2k" },
  { id: "radio-5", name: "Classic Hits", genre: "Retro Bollywood", listeners: "9.8k" },
];

function MainBoxPanel({ viewIndex, songs, trendingSongs, onBack, onSelectSong }) {
  const config = VIEW_CONFIG[viewIndex] || VIEW_CONFIG[0];

  const getSongsForView = () => {
    switch (viewIndex) {
      case 0:
        return songs;
      case 1:
        return [...songs].slice(0, 12);
      case 2:
        return [...songs].slice().reverse().slice(0, 10);
      case 3:
        return trendingSongs;
      default:
        return [];
    }
  };

  const viewSongs = getSongsForView();

  return (
    <div className="main-box-panel">
      <div className="main-box-panel-header">
        <button type="button" className="main-box-back-btn" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>
        <div className="main-box-panel-titles">
          <h2>{config.title}</h2>
          <p>{config.subtitle}</p>
        </div>
      </div>

      {viewIndex === 4 ? (
        <div className="radio-stations-grid">
          {RADIO_STATIONS.map((station) => (
            <button
              key={station.id}
              type="button"
              className="radio-station-card"
              onClick={() => onSelectSong?.(songs[0])}
            >
              <div className="radio-station-icon">
                <Radio size={22} />
              </div>
              <div className="radio-station-info">
                <span className="radio-station-name">{station.name}</span>
                <span className="radio-station-meta">{station.genre} · {station.listeners} listening</span>
              </div>
              <div className="radio-station-play">
                <Play size={14} fill="currentColor" />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="main-box-songs-grid">
          {viewSongs.map((song) => (
            <div
              key={song.id}
              className="main-box-song-item"
              onClick={() => onSelectSong?.(song)}
              onKeyDown={(e) => e.key === "Enter" && onSelectSong?.(song)}
              role="button"
              tabIndex={0}
            >
              <SongCard
                image={song.cover}
                songName={song.title}
                author={song.artist}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MainBoxPanel;
