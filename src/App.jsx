import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import LikedSongs from "./pages/LikedSongs";
import Playlists from "./pages/Playlists";
import Trending from "./pages/Trending";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/liked" element={<LikedSongs />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </div>
  );
}

export default App;
