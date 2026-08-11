import React, { useState, useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import OptionWheel from "@/components/ui/OptionWheel";
import BgBox from "@/components/ui/BgBox";
import MusicPlayer from "@/components/ui/MusicPlayer";
import LineSidebar from "@/components/ui/LineSidebar";
import ShinyText from '@/components/ui/ShineText';
import PlaylistSection from "@/components/ui/PlaylistSection";
import BigMusicPlayer from "@/components/ui/BigMusicPlayer";
import EqualizerBox from "@/components/ui/EqualizerBox";
import LyricsBox from "@/components/ui/LyricsBox";

import { LOCAL_SONGS_LIST, TRENDING_SONGS } from "@/data/songs";
import "./Home.css";

const Home = () => {
  const [songsList, setSongsList] = useState(LOCAL_SONGS_LIST);
  const [activeSongIndex, setActiveSongIndex] = useState(0);
  const [searchVal, setSearchVal] = useState("");
  const [activeSidebarTab, setActiveSidebarTab] = useState(0);

  // Fetch local songs from backend API if running
  useEffect(() => {
    fetch("http://localhost:5000/api/songs")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.songs && data.songs.length > 0) {
          setSongsList(data.songs);
        }
      })
      .catch((err) => {
        console.log("Using local offline song dataset fallback.");
      });
  }, []);

  // Filter songs based on search input
  const filteredSongs = searchVal.trim() === ""
    ? songsList
    : songsList.filter(s =>
        s.title.toLowerCase().includes(searchVal.toLowerCase()) ||
        s.artist.toLowerCase().includes(searchVal.toLowerCase())
      );

  const activeSong = filteredSongs[activeSongIndex] || filteredSongs[0] || songsList[0];

  // Song titles for the 3D Option Wheel
  const likedSongTitles = filteredSongs.map(s => s.title);

  const handleWheelChange = (index) => {
    if (index >= 0 && index < filteredSongs.length) {
      setActiveSongIndex(index);
    }
  };

  const handleNextSong = () => {
    setActiveSongIndex((prev) => (prev + 1) % filteredSongs.length);
  };

  const handlePrevSong = () => {
    setActiveSongIndex((prev) => (prev - 1 + filteredSongs.length) % filteredSongs.length);
  };

  const handlePlaySongDirectly = (song) => {
    const idx = filteredSongs.findIndex(s => s.id === song.id || s.title === song.title);
    if (idx !== -1) setActiveSongIndex(idx);
  };

  return (
    <div className="home-main">
      {/* NAVBAR */}
      <Navbar searchVal={searchVal} onSearchChange={setSearchVal} />

      {/* DASHBOARD GRID */}
      <main className="dashboard">

        {/* ================= LEFT COLUMN ================= */}
        <section className="left-column">

          {/* SMALL MUSIC PLAYER (TRENDING LOCAL SONGS) */}
          <BgBox
            style={{
              width: "100%",
              height: "150px",
              backgroundColor: "#1e252a",
              borderRadius: "14px",
              padding: "16px",
              color: "white",
              position: "relative",
              border: "1px solid rgba(255, 255, 255, 0.08)"
            }}
          >
            <div className="small-player">
              <MusicPlayer
                trendingList={TRENDING_SONGS}
                onSongChange={handlePlaySongDirectly}
              />
            </div>
          </BgBox>

          {/* OPTION WHEEL (LOCAL LIKED SONGS LIST) */}
          <BgBox
            style={{
              width: "100%",
              height: "350px",
              backgroundColor: "#1e252a",
              borderRadius: "14px",
              padding: "16px",
              color: "white",
              position: "relative",
              border: "1px solid rgba(255, 255, 255, 0.08)"
            }}
          >
            <div className="wheel-content">
              {/* LEFT VERTICAL TEXT */}
              <div className="wheel-text">
                <ShinyText
                  text="MY TRACKS"
                  speed={2}
                  delay={0}
                  color="#ffffff"
                  shineColor="#818cf8"
                  spread={120}
                  direction="left"
                />
              </div>

              {/* WHEEL DISPLAYING LOCAL SONG NAMES */}
              <div className="option-wheel">
                <OptionWheel
                  items={likedSongTitles}
                  defaultSelected={activeSongIndex}
                  onChange={handleWheelChange}
                  activeColor="#ffffff"
                  textColor="#94a3b8"
                />
              </div>
            </div>
          </BgBox>

          {/* SIDEBAR NAVIGATION */}
          <BgBox
            style={{
              width: "100%",
              height: "284px",
              backgroundColor: "#1e252a",
              borderRadius: "14px",
              padding: "16px",
              color: "white",
              position: "relative",
              border: "1px solid rgba(255, 255, 255, 0.08)"
            }}
          >
            <LineSidebar
              items={[
                "My Favorites",
                "Most Played",
                "Recents",
                "Trending Hits",
                "Radio Stations",
              ]}
              accentColor="#818cf8"
              textColor="#94a3b8"
              markerColor="#6366f1"
              showIndex
              showMarker
              proximityRadius={100}
              maxShift={30}
              falloff="smooth"
              markerLength={60}
              markerGap={0}
              tickScale={0.5}
              scaleTick
              itemGap={20}
              fontSize={1.1}
              smoothing={100}
              defaultActive={activeSidebarTab}
              onItemClick={(idx) => setActiveSidebarTab(idx)}
            />
          </BgBox>

        </section>

        {/* ================= MAIN CONTENT (CENTER) ================= */}
        <section className="main-content">
          <BgBox
            style={{
              width: "100%",
              height: "814px",
              backgroundColor: "#1e252a",
              borderRadius: "14px",
              padding: "20px",
              color: "white",
              position: "relative",
              border: "1px solid rgba(255, 255, 255, 0.08)"
            }}
          >
            <div className="main-box">
              <PlaylistSection
                title="My Playlist"
                songs={filteredSongs.slice(0, 4).map(s => ({ id: s.id, songName: s.title, author: s.artist, image: s.cover }))}
                onSelectSong={handlePlaySongDirectly}
              />

              <PlaylistSection
                title="Most Played Hits"
                songs={filteredSongs.slice(4, 8).map(s => ({ id: s.id, songName: s.title, author: s.artist, image: s.cover }))}
                onSelectSong={handlePlaySongDirectly}
              />

              <BigMusicPlayer
                image={activeSong.cover}
                songName={activeSong.title}
                author={activeSong.artist}
                duration={activeSong.duration}
                audio={activeSong.audio || activeSong.fallbackAudio}
                lyrics={activeSong.lyrics}
                onNext={handleNextSong}
                onPrev={handlePrevSong}
              />
            </div>
          </BgBox>
        </section>

        {/* ================= RIGHT COLUMN (2-PARTS: EQUALIZER + LYRICS) ================= */}
        <section className="right-column">
          <div className="right-column-container">

            {/* PART 1: EQUALIZER / VISUALIZER / SONG STATS (TOP) */}
            <BgBox
              style={{
                width: "100%",
                height: "395px",
                backgroundColor: "#1e252a",
                borderRadius: "14px",
                padding: "16px",
                color: "white",
                position: "relative",
                border: "1px solid rgba(255, 255, 255, 0.08)"
              }}
            >
              <EqualizerBox activeSong={activeSong} isPlaying={true} />
            </BgBox>

            {/* PART 2: LYRICS BOX FOR ACTIVE SONG (BOTTOM) */}
            <BgBox
              style={{
                width: "100%",
                height: "404px",
                backgroundColor: "#1e252a",
                borderRadius: "14px",
                padding: "16px",
                color: "white",
                position: "relative",
                border: "1px solid rgba(255, 255, 255, 0.08)"
              }}
            >
              <LyricsBox activeSong={activeSong} />
            </BgBox>

          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;