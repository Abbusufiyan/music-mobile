import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart } from "lucide-react";
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
  const lyricsRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(true);
  const [volume, setVolume] = useState(0.85);
  const [muted, setMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);

  const lyricsList = Array.isArray(lyrics) ? lyrics : [lyrics];
  const activeLineIndex = duration > 0
    ? Math.min(Math.floor((currentTime / duration) * lyricsList.length), lyricsList.length - 1)
    : 0;

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
    audioElement.volume = muted ? 0 : volume;
  }, [volume, muted]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    audioElement.pause();
    audioElement.currentTime = 0;
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [audio, songName]);

  useEffect(() => {
    const container = lyricsRef.current;
    const activeLine = container?.querySelector(".big-lyric-line.active");
    if (activeLine) {
      activeLine.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeLineIndex, songName]);

  const handleProgress = (e) => {
    const value = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
    setCurrentTime(value);
  };

  const handleVolume = (e) => {
    const val = Number(e.target.value);
    setVolume(val);
    setMuted(val === 0);
  };

  const toggleMute = () => setMuted((prev) => !prev);

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const progress = duration > 0 ? `${(currentTime / duration) * 100}%` : "0%";
  const volumeProgress = `${(muted ? 0 : volume) * 100}%`;

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

      <div className="big-player-left">
        <div className="cover-wrapper">
          <img src={image} alt={songName} className="big-player-cover" />
          <button
            type="button"
            className={`heart-btn ${isLiked ? "liked" : ""}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart size={16} fill={isLiked ? "#ec4899" : "none"} color={isLiked ? "#ec4899" : "#fff"} />
          </button>
        </div>

        <div className="big-player-info">
          <div className="big-player-song" title={songName}>{songName}</div>
          <div className="big-player-author">{author}</div>
        </div>
      </div>

      <div className="big-player-center">
        <div className="big-player-lyrics-scroll" ref={lyricsRef}>
          {lyricsList.map((line, index) => (
            <p
              key={`${songName}-${index}`}
              className={`big-lyric-line ${activeLineIndex === index ? "active" : ""}`}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="big-player-bottom">
          <button type="button" className="big-player-control" aria-label="Previous Track" onClick={onPrev}>
            <SkipBack size={18} />
          </button>

          <button type="button" className="big-player-play" aria-label={isPlaying ? "Pause" : "Play"} onClick={togglePlay}>
            {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: "2px" }} />}
          </button>

          <button type="button" className="big-player-control" aria-label="Next Track" onClick={onNext}>
            <SkipForward size={18} />
          </button>

          <span className="big-player-time">{formatTime(currentTime)}</span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgress}
            className="big-player-range"
            style={{ "--progress": progress }}
          />

          <span className="big-player-time">{formatTime(duration)}</span>

          <div className="big-volume-wrap">
            <button
              type="button"
              className="big-player-control volume-btn"
              aria-label={muted ? "Unmute" : "Volume"}
              onClick={toggleMute}
              onMouseEnter={() => setShowVolume(true)}
            >
              {muted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <div
              className={`big-volume-slider-wrap ${showVolume ? "visible" : ""}`}
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
                className="big-volume-range"
                style={{ "--progress": volumeProgress }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BigMusicPlayer;
