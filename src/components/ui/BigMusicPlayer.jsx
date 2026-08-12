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

  const lyricsList = Array.isArray(lyrics) ? lyrics : [lyrics];
  const activeLineIndex = duration > 0
    ? Math.min(Math.floor((currentTime / duration) * lyricsList.length), lyricsList.length - 1)
    : 0;

  const togglePlay = async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      if (el.paused) {
        await el.play();
        setIsPlaying(true);
      } else {
        el.pause();
        setIsPlaying(false);
      }
    } catch (err) {
      console.error("BigMusicPlayer playback error:", err);
    }
  };

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => setCurrentTime(el.currentTime);
    const onMeta = () => { if (el.duration && !isNaN(el.duration)) setDuration(el.duration); };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (el) el.volume = muted ? 0 : volume;
  }, [volume, muted]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [audio, songName]);

  useEffect(() => {
    const line = lyricsRef.current?.querySelector(".big-player__lyric--active");
    line?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeLineIndex, songName]);

  const formatTime = (t) => {
    if (!t || isNaN(t)) return "0:00";
    return `${Math.floor(t / 60)}:${Math.floor(t % 60).toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? `${(currentTime / duration) * 100}%` : "0%";
  const volProgress = `${(muted ? 0 : volume) * 100}%`;

  return (
    <div className="big-player">
      <audio
        ref={audioRef}
        src={audio}
        onEnded={() => { setIsPlaying(false); setCurrentTime(0); onNext?.(); }}
      />

      <div className="big-player__top">
        <div className="big-player__track">
          <div className="big-player__cover-wrap">
            <img src={image} alt={songName} className="big-player__cover" />
            <button
              type="button"
              className={`big-player__heart ${isLiked ? "big-player__heart--on" : ""}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart size={12} fill={isLiked ? "#ec4899" : "none"} color={isLiked ? "#ec4899" : "#fff"} />
            </button>
          </div>
          <div className="big-player__info">
            <p className="big-player__title" title={songName}>{songName}</p>
            <p className="big-player__artist">{author}</p>
          </div>
        </div>

        <div className="big-player__lyrics" ref={lyricsRef}>
          {lyricsList.map((line, i) => (
            <p key={`${songName}-${i}`} className={`big-player__lyric ${activeLineIndex === i ? "big-player__lyric--active" : ""}`}>
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="big-player__bar">
        <div className="big-player__transport">
          <button type="button" className="big-player__icon-btn" onClick={onPrev} aria-label="Previous">
            <SkipBack size={15} />
          </button>
          <button type="button" className="big-player__play-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="big-player__play-offset" />}
          </button>
          <button type="button" className="big-player__icon-btn" onClick={onNext} aria-label="Next">
            <SkipForward size={15} />
          </button>
        </div>

        <div className="big-player__timeline">
          <span className="big-player__time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (audioRef.current) audioRef.current.currentTime = v;
              setCurrentTime(v);
            }}
            className="big-player__seek"
            style={{ "--progress": progress }}
          />
          <span className="big-player__time">{formatTime(duration)}</span>
        </div>

        <div className="big-player__volume">
          <button type="button" className="big-player__icon-btn" onClick={() => setMuted((m) => !m)} aria-label="Volume">
            {muted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={muted ? 0 : volume}
            onChange={(e) => {
              const v = Number(e.target.value);
              setVolume(v);
              setMuted(v === 0);
            }}
            className="big-player__vol"
            style={{ "--progress": volProgress }}
          />
        </div>
      </div>
    </div>
  );
}

export default BigMusicPlayer;
