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
import MainBoxPanel from "@/components/ui/MainBoxPanel";

import { LOCAL_SONGS_LIST, TRENDING_SONGS } from "@/data/songs";
import "./Home.css";

const Home = () => {
  const [songsList, setSongsList] = useState(LOCAL_SONGS_LIST);
  const [activeSongIndex, setActiveSongIndex] = useState(0);
  const [searchVal, setSearchVal] = useState("");
  const [activeSidebarTab, setActiveSidebarTab] = useState(null);
  const [mainView, setMainView] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/songs")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.songs && data.songs.length > 0) {
          const merged = data.songs.map((apiSong) => {
            const local = LOCAL_SONGS_LIST.find(
              (s) => s.id === apiSong.id || s.title === apiSong.title
            );
            const audio =
              apiSong.audio ||
              (apiSong.audioUrl?.startsWith("http")
                ? apiSong.audioUrl
                : apiSong.audioUrl
                  ? `http://localhost:5000${apiSong.audioUrl}`
                  : local?.audio);

            return {
              ...(local || {}),
              ...apiSong,
              audio,
              cover: local?.cover || apiSong.cover,
            };
          });
          setSongsList(merged);
        }
      })
      .catch(() => {
        console.log("Using local offline song dataset fallback.");
      });
  }, []);

  const filteredSongs = searchVal.trim() === ""
    ? songsList
    : songsList.filter(s =>
        s.title.toLowerCase().includes(searchVal.toLowerCase()) ||
        s.artist.toLowerCase().includes(searchVal.toLowerCase())
      );

  const activeSong = filteredSongs[activeSongIndex] || filteredSongs[0] || songsList[0];
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
    const idx = filteredSongs.findIndex(
      (s) => s.id === song.id || s.title === song.title || s.title === song.songName
    );
    if (idx !== -1) setActiveSongIndex(idx);
  };

  const handleSidebarClick = (idx) => {
    setActiveSidebarTab(idx);
    setMainView(idx);
  };

  const handleBackToHome = () => {
    setMainView(null);
    setActiveSidebarTab(null);
  };

  const mapSongForCard = (s) => ({
    id: s.id,
    title: s.title,
    songName: s.title,
    author: s.artist,
    image: s.cover,
  });

  return (
    <div className="home-main">
      <Navbar searchVal={searchVal} onSearchChange={setSearchVal} />

      <main className="dashboard">

        <section className="left-column">
          <BgBox className="home-box home-box--player">
            <div className="small-player">
              <MusicPlayer
                trendingList={TRENDING_SONGS}
                onSongChange={handlePlaySongDirectly}
              />
            </div>
          </BgBox>

          <BgBox className="home-box home-box--wheel">
            <div className="wheel-content">
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

          <BgBox className="home-box home-box--sidebar">
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
              onItemClick={handleSidebarClick}
            />
          </BgBox>
        </section>

        <section className="main-content">
          <BgBox className="home-box home-box--main">
            <div className="main-box">
              {mainView !== null ? (
                <MainBoxPanel
                  viewIndex={mainView}
                  songs={filteredSongs}
                  trendingSongs={TRENDING_SONGS}
                  onBack={handleBackToHome}
                  onSelectSong={handlePlaySongDirectly}
                />
              ) : (
                <>
                  <PlaylistSection
                    title="My Playlist"
                    songs={filteredSongs.slice(0, 4).map(mapSongForCard)}
                    onSelectSong={handlePlaySongDirectly}
                  />

                  <PlaylistSection
                    title="Most Played Hits"
                    songs={filteredSongs.slice(4, 8).map(mapSongForCard)}
                    onSelectSong={handlePlaySongDirectly}
                  />
                </>
              )}

              <BigMusicPlayer
                image={activeSong?.cover}
                songName={activeSong?.title}
                author={activeSong?.artist}
                duration={activeSong?.duration}
                audio={activeSong?.audio || activeSong?.fallbackAudio}
                lyrics={activeSong?.lyrics}
                onNext={handleNextSong}
                onPrev={handlePrevSong}
              />
            </div>
          </BgBox>
        </section>

        <section className="right-column">
          <div className="right-column-container">
            <BgBox className="home-box home-box--eq">
              <EqualizerBox activeSong={activeSong} isPlaying={true} />
            </BgBox>

            <BgBox className="home-box home-box--lyrics">
              <LyricsBox activeSong={activeSong} />
            </BgBox>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;
