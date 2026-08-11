import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from "lucide-react";
import "./BigMusicPlayer.css";

function BigMusicPlayer({
  image,
  songName,
  author,
  audio,
  lyrics = "Lyrics will appear here...",
  onPrev,
  onNext
}) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(true);

  const togglePlay = async () => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    try {
      if (audioElement.paused) {
        await audioElement.play();
        setIsPlaying(true);
      } else {
        audioElement.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("BigMusicPlayer playback error:", error);
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const updateTime = () => setCurrentTime(audioElement.currentTime);
    const updateDuration = () => {
      if (audioElement.duration && !isNaN(audioElement.duration)) {
        setDuration(audioElement.duration);
      }
    };

    audioElement.addEventListener("timeupdate", updateTime);
    audioElement.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audioElement.removeEventListener("timeupdate", updateTime);
      audioElement.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    audioElement.pause();
    audioElement.currentTime = 0;
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [audio, songName]);

  const handleProgress = (e) => {
    const value = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
    setCurrentTime(value);
  };

  const skip = (seconds) => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    audioElement.currentTime = Math.max(
      0,
      Math.min(audioElement.currentTime + seconds, duration || 0)
    );
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const progress = duration > 0 ? `${(currentTime / duration) * 100}%` : "0%";

  return (
    <div className="big-music-player">
      <audio
        ref={audioRef}
        src={audio}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
          if (onNext) onNext();
        }}
      />

      {/* LEFT: Cover & Song Details */}
      <div className="big-player-left">
        <div className="cover-wrapper">
          <img src={image} alt={songName} className="big-player-cover" />
          <button
            className={`heart-btn ${isLiked ? "liked" : ""}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart size={16} fill={isLiked ? "#ec4899" : "none"} color={isLiked ? "#ec4899" : "#fff"} />
          </button>
        </div>

        <div className="big-player-info">
          <div className="big-player-song" title={songName}>
            {songName}
          </div>
          <div className="big-player-author">
            {author}
          </div>
        </div>
      </div>

      {/* CENTER: Lyrics & Controls */}
      <div className="big-player-center">
        <div className="big-player-lyrics-preview">
          <span className="lyrics-snippet">
            "{Array.isArray(lyrics) ? lyrics[0] : lyrics}"
          </span>
        </div>

        <div className="big-player-bottom">
          <button
            className="big-player-control"
            aria-label="Previous Track"
            onClick={onPrev || (() => skip(-10))}
          >
            <SkipBack size={18} />
          </button>

          <button
            className="big-player-play"
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: "2px" }} />}
          </button>

          <button
            className="big-player-control"
            aria-label="Next Track"
            onClick={onNext || (() => skip(10))}
          >
            <SkipForward size={18} />
          </button>

          <span className="big-player-time">
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgress}
            className="big-player-range"
            style={{ "--progress": progress }}
          />

          <span className="big-player-time">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BigMusicPlayer;