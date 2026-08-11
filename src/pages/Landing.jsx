import React from "react";
import { useNavigate } from "react-router-dom";
import { Play, Disc, Mic2, Activity, Compass, ArrowRight, Sparkles, Music, Lock } from "lucide-react";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { LIKED_SONGS, TRENDING_SONGS } from "@/data/songs";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  const handleLaunch = () => {
    navigate("/login");
  };

  return (
    <div className="landing-page">
      {/* HEADER / NAVBAR */}
      <header className="landing-header">
        <div className="landing-logo" onClick={handleLaunch}>
          <div className="logo-badge">
            <Music size={22} color="#ffffff" />
          </div>
          <span className="logo-text">AuraSound</span>
        </div>

        <nav className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#trending">Trending Hits</a>
          <a href="#about">About</a>
        </nav>

        <button className="cta-launch-btn" onClick={handleLaunch}>
          <span>Sign In / Enter App</span>
          <ArrowRight size={16} />
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="landing-hero">
        <div className="hero-badge">
          <Sparkles size={14} className="sparkle-icon" />
          <span>Next-Gen Audio Architecture</span>
        </div>

        <h1 className="hero-title">
          <EncryptedText text="ENJOY YOUR PEACE" />
        </h1>

        <p className="hero-subtitle">
          Immerse yourself in high-fidelity sound, 3D wheel music selection, interactive live lyrics, and personalized acoustic wave equalizers.
        </p>

        <div className="hero-actions">
          <button className="primary-hero-btn" onClick={handleLaunch}>
            <Play size={18} fill="#ffffff" />
            <span>Get Started & Listen</span>
          </button>

          <button className="secondary-hero-btn" onClick={() => navigate("/explore")}>
            <Compass size={18} />
            <span>Explore Library</span>
          </button>
        </div>

        {/* HERO FLOATING PLAYER PREVIEW */}
        <div className="hero-player-preview" onClick={handleLaunch}>
          <div className="preview-cover">
            <img src={LIKED_SONGS[0].cover} alt="Now Playing Preview" />
            <div className="preview-play-badge">
              <Play size={16} fill="#ffffff" />
            </div>
          </div>
          <div className="preview-meta">
            <div className="preview-title">{LIKED_SONGS[0].title}</div>
            <div className="preview-artist">{LIKED_SONGS[0].artist} • High Fidelity Studio HD</div>
            <div className="preview-wave">
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS GRID */}
      <section id="features" className="landing-features">
        <h2 className="section-title">Designed for Audiophiles</h2>
        <p className="section-sub">Experience sound with features built from the ground up.</p>

        <div className="features-grid">
          <div className="feature-card" onClick={handleLaunch}>
            <div className="feature-icon icon-slate">
              <Disc size={24} />
            </div>
            <h3>3D Wheel Selection</h3>
            <p>Spin through your Liked Songs list on an interactive 3D option wheel with smooth spatial curve dynamics.</p>
          </div>

          <div className="feature-card" onClick={handleLaunch}>
            <div className="feature-icon icon-slate">
              <Mic2 size={24} />
            </div>
            <h3>Live Synced Lyrics</h3>
            <p>Sing along with real-time scrolling karaoke lyrics right alongside your player controls.</p>
          </div>

          <div className="feature-card" onClick={handleLaunch}>
            <div className="feature-icon icon-slate">
              <Activity size={24} />
            </div>
            <h3>Studio Equalizer & FX</h3>
            <p>Customize your sound with Bass Boost, 3D Spatial Audio, and real-time audio visualizers.</p>
          </div>
        </div>
      </section>

      {/* TRENDING PREVIEW SECTION */}
      <section id="trending" className="landing-trending">
        <div className="trending-header">
          <h2>Trending Hits</h2>
          <button className="view-all-btn" onClick={handleLaunch}>
            View All Charts
          </button>
        </div>

        <div className="trending-cards-row">
          {TRENDING_SONGS.map((song, i) => (
            <div key={song.id} className="trending-card" onClick={handleLaunch}>
              <div className="card-rank">#{i + 1}</div>
              <img src={song.cover} alt={song.title} className="card-cover" />
              <div className="card-info">
                <span className="card-song">{song.title}</span>
                <span className="card-artist">{song.artist}</span>
              </div>
              <div className="card-plays">Local Audio</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <p>© 2026 AuraSound Music. Engineered for high fidelity audio.</p>
      </footer>
    </div>
  );
};

export default Landing;