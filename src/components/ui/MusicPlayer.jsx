import { useState, useRef, useEffect } from "react";
import { TrendingUp, SkipBack, SkipForward, Play, Pause, Volume2, VolumeX } from "lucide-react";
import "./MusicPlayer.css";
import { TRENDING_SONGS } from "../../data/songs";

function MusicPlayer({ trendingList = TRENDING_SONGS, onSongChange }) {
  const audioRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);

  const currentSong = trendingList[currentIndex] || trendingList[0];

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Small player playback error:", error);
    }
  };

  const nextSong = () => {
    const nextIdx = (currentIndex + 1) % trendingList.length;
    setCurrentIndex(nextIdx);
    if (onSongChange) onSongChange(trendingList[nextIdx]);
  };

  const prevSong = () => {
    const prevIdx = (currentIndex - 1 + trendingList.length) % trendingList.length;
    setCurrentIndex(prevIdx);
    if (onSongChange) onSongChange(trendingList[prevIdx]);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume;
  }, [volume, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
  }, [currentIndex]);

  const handleProgress = (e) => {
    const value = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const handleVolume = (e) => {
    const val = Number(e.target.value);
    setVolume(val);
    setMuted(val === 0);
  };

  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const progress = duration > 0 ? `${(currentTime / duration) * 100}%` : "0%";
  const volumeProgress = `${(muted ? 0 : volume) * 100}%`;

  return (
    <div className="player-card player-card--trending">
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onEnded={() => {
          setIsPlaying(false);
          nextSong();
        }}
      />

      <div className="trending-card-top">
        <div className="trending-badge">
          <TrendingUp size={12} />
          <span>Trending Hit #{currentIndex + 1}</span>
        </div>
        <div className="trending-live-dot">
          <span className="live-pulse" />
          Live
        </div>
      </div>

      <div className="trending-body">
        <div className="trending-art-wrap">
          <img src={currentSong.cover} alt={currentSong.title} className="album-art" />
          {isPlaying && <div className="art-glow-ring" />}
        </div>

        <div className="trending-meta-controls">
          <div className="meta">
            <div className="track-title" title={currentSong.title}>{currentSong.title}</div>
            <div className="artist-name">{currentSong.artist}</div>
          </div>

          <div className="player-controls">
            <div className="buttons">
              <button className="btn-icon" aria-label="Previous Track" onClick={prevSong}>
                <SkipBack size={16} />
              </button>

              <button
                className="btn-play"
                aria-label={isPlaying ? "Pause" : "Play"}
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="play-offset" />}
              </button>

              <button className="btn-icon" aria-label="Next Track" onClick={nextSong}>
                <SkipForward size={16} />
              </button>

              <div className="volume-wrap">
                <button
                  className="btn-icon volume-btn"
                  aria-label={muted ? "Unmute" : "Volume"}
                  onClick={toggleMute}
                  onMouseEnter={() => setShowVolume(true)}
                >
                  {muted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <div
                  className={`volume-slider-wrap ${showVolume ? "visible" : ""}`}
                  onMouseEnter={() => setShowVolume(true)}
                  onMouseLeave={() => setShowVolume(false)}
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={muted ? 0 : volume}
                    onChange={handleVolume}
                    className="volume-slider"
                    style={{ "--progress": volumeProgress }}
                  />
                </div>
              </div>
            </div>

            <div className="progress-container">
              <span className="time">{formatTime(currentTime)}</span>
              <div className="progress-bar-bg">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleProgress}
                  className="progress-slider"
                  style={{ "--progress": progress }}
                />
              </div>
              <span className="time">{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
