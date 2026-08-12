import React, { useState, useMemo } from "react";
import { Sliders, Activity, Disc, Sparkles, Volume2 } from "lucide-react";
import "./EqualizerBox.css";

const BAR_COUNT = 24;

function EqualizerBox({ activeSong, isPlaying }) {
  const [bassBoost, setBassBoost] = useState(true);
  const [spatialAudio, setSpatialAudio] = useState(false);
  const [highClarity, setHighClarity] = useState(true);

  const barHeights = useMemo(
    () => Array.from({ length: BAR_COUNT }, (_, i) => 25 + ((i * 17 + 13) % 55)),
    [activeSong?.id]
  );

  return (
    <div className="equalizer-container">
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

      <div className="eq-visualizer eq-visualizer--wave">
        <div className="eq-visualizer-glow" />
        <div className="eq-bars-container">
          {barHeights.map((h, i) => (
            <div key={i} className="eq-bar-group">
              <div
                className={`eq-bar eq-bar--top ${isPlaying ? "animating" : ""}`}
                style={{
                  height: isPlaying ? `${h}%` : `${h * 0.45}%`,
                  animationDelay: `${(i % 6) * 0.12}s`,
                  "--bar-hue": `${240 + (i * 8) % 80}`,
                }}
              />
              <div
                className={`eq-bar eq-bar--bottom ${isPlaying ? "animating" : ""}`}
                style={{
                  height: isPlaying ? `${h * 0.6}%` : `${h * 0.25}%`,
                  animationDelay: `${(i % 6) * 0.12 + 0.06}s`,
                  "--bar-hue": `${240 + (i * 8) % 80}`,
                }}
              />
            </div>
          ))}
        </div>
        <div className="eq-visualizer-baseline" />
      </div>

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

      <div className="eq-controls-row">
        <button
          type="button"
          className={`eq-toggle-btn ${bassBoost ? "active" : ""}`}
          onClick={() => setBassBoost(!bassBoost)}
        >
          <Sliders size={13} />
          <span>Bass Boost</span>
        </button>

        <button
          type="button"
          className={`eq-toggle-btn ${spatialAudio ? "active" : ""}`}
          onClick={() => setSpatialAudio(!spatialAudio)}
        >
          <Disc size={13} />
          <span>3D Spatial</span>
        </button>

        <button
          type="button"
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
