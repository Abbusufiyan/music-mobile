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
    onSongChange?.(trendingList[nextIdx]);
  };

  const prevSong = () => {
    const prevIdx = (currentIndex - 1 + trendingList.length) % trendingList.length;
    setCurrentIndex(prevIdx);
    onSongChange?.(trendingList[prevIdx]);
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

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const progress = duration > 0 ? `${(currentTime / duration) * 100}%` : "0%";
  const volumeProgress = `${(muted ? 0 : volume) * 100}%`;

  return (
    <div className="mini-player">
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onEnded={() => {
          setIsPlaying(false);
          nextSong();
        }}
      />

      <div className="mini-player__badge">
        <TrendingUp size={11} strokeWidth={2.5} />
        <span>Trending #{currentIndex + 1}</span>
      </div>

      <div className="mini-player__body">
        <img src={currentSong.cover} alt={currentSong.title} className="mini-player__art" />

        <div className="mini-player__content">
          <div className="mini-player__meta">
            <p className="mini-player__title" title={currentSong.title}>{currentSong.title}</p>
            <p className="mini-player__artist">{currentSong.artist}</p>
          </div>

          <div className="mini-player__controls">
            <button type="button" className="mini-player__btn" onClick={prevSong} aria-label="Previous">
              <SkipBack size={14} />
            </button>
            <button type="button" className="mini-player__btn mini-player__btn--play" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="mini-player__play-icon" />}
            </button>
            <button type="button" className="mini-player__btn" onClick={nextSong} aria-label="Next">
              <SkipForward size={14} />
            </button>
          </div>

          <div className="mini-player__progress-row">
            <span className="mini-player__time">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgress}
              className="mini-player__slider"
              style={{ "--progress": progress }}
            />
            <span className="mini-player__time">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="mini-player__volume">
          <button
            type="button"
            className="mini-player__btn"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={muted ? 0 : volume}
            onChange={handleVolume}
            className="mini-player__vol-slider"
            style={{ "--progress": volumeProgress }}
          />
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
