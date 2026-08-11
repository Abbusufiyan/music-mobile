import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Music, Search, Heart, Compass, Disc, TrendingUp, Home as HomeIcon, User, LogOut } from "lucide-react";
import "./Navbar.css";

function Navbar({ searchVal, onSearchChange }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("aura_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("aura_token");
    localStorage.removeItem("aura_user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="app-navbar">
      <div className="nav-brand" onClick={() => navigate("/")}>
        <div className="brand-icon-wrapper">
          <Music className="brand-icon" size={20} />
        </div>
        <span className="brand-name">AuraSound</span>
      </div>

      <div className="nav-links">
        <NavLink to="/home" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <HomeIcon size={18} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/explore" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <Compass size={18} />
          <span>Explore</span>
        </NavLink>
        <NavLink to="/liked" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <Heart size={18} />
          <span>Liked Songs</span>
        </NavLink>
        <NavLink to="/playlists" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <Disc size={18} />
          <span>Playlists</span>
        </NavLink>
        <NavLink to="/trending" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <TrendingUp size={18} />
          <span>Trending</span>
        </NavLink>
      </div>

      <div className="nav-search">
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search songs, artists..."
            value={searchVal || ""}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="nav-actions">
        {user ? (
          <div className="user-profile-badge">
            <User size={16} className="user-icon" />
            <span className="username-display">{user.username || "User"}</span>
            <button className="logout-btn" onClick={handleLogout} title="Sign Out">
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button className="launch-btn" onClick={() => navigate("/login")}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
