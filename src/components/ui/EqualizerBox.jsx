import React, { useState } from "react";
import { Sliders, Activity, Disc, Sparkles, Volume2 } from "lucide-react";
import "./EqualizerBox.css";

function EqualizerBox({ activeSong, isPlaying }) {
  const [bassBoost, setBassBoost] = useState(true);
  const [spatialAudio, setSpatialAudio] = useState(false);
  const [highClarity, setHighClarity] = useState(true);

  return (
    <div className="equalizer-container">
      {/* Header */}
      <div className="eq-header">
        <div className="eq-title">
          <Activity size={16} className="eq-icon pulsing" />
          <span>Now Playing Spotlight</span>
        </div>
        <div className="eq-badge">
          <Sparkles size={12} />
          <span>Studio HD</span>
        </div>
      </div>

      {/* Visualizer Spectrum Bars */}
      <div className="eq-visualizer">
        {[40, 75, 55, 90, 60, 30, 85, 95, 50, 70, 45, 80, 65, 90, 40, 75, 60, 85].map((h, i) => (
          <div
            key={i}
            className={`eq-bar ${isPlaying ? "animating" : ""}`}
            style={{
              height: isPlaying ? `${Math.floor(Math.random() * 60) + 30}%` : `${h / 2}%`,
              animationDelay: `${(i % 5) * 0.15}s`
            }}
          />
        ))}
      </div>

      {/* Song Metadata Grid */}
      <div className="eq-stats-grid">
        <div className="stat-card">
          <span className="stat-label">Genre</span>
          <span className="stat-value">{activeSong?.genre || "Indie Pop"}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Tempo</span>
          <span className="stat-value">{activeSong?.bpm || 98} BPM</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Quality</span>
          <span className="stat-value">324 kbps</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Release</span>
          <span className="stat-value">{activeSong?.releaseYear || 2023}</span>
        </div>
      </div>

      {/* Quick Audio Controls / Enhancements */}
      <div className="eq-controls-row">
        <button
          className={`eq-toggle-btn ${bassBoost ? "active" : ""}`}
          onClick={() => setBassBoost(!bassBoost)}
        >
          <Sliders size={13} />
          <span>Bass Boost</span>
        </button>

        <button
          className={`eq-toggle-btn ${spatialAudio ? "active" : ""}`}
          onClick={() => setSpatialAudio(!spatialAudio)}
        >
          <Disc size={13} />
          <span>3D Spatial</span>
        </button>

        <button
          className={`eq-toggle-btn ${highClarity ? "active" : ""}`}
          onClick={() => setHighClarity(!highClarity)}
        >
          <Volume2 size={13} />
          <span>HD Clarity</span>
        </button>
      </div>
    </div>
  );
}

export default EqualizerBox;
