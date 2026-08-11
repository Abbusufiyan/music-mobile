# Folder Structure & Architecture Documentation

This document provides a detailed overview of the folder hierarchy, purpose of each directory and file, and the overall working mechanism of the **AuraSound Music Application**.

---

## Workspace Root Hierarchy

```
music-app/
├── FOLDER_STRUCTURE_DOCUMENTATION.md  # (This file) Complete codebase architecture guide
├── index.html                         # HTML5 entry point for Vite React application
├── package.json                       # Frontend dependencies, scripts, and build rules
├── vite.config.js                     # Vite bundler configuration & alias shortcuts (@ -> src)
├── eslint.config.js                   # JavaScript & React code quality rules
├── server/                            # Node.js + Express + MySQL Backend Service
│   ├── config/
│   │   └── db.js                      # MySQL database pool & automatic schema setup
│   ├── routes/
│   │   ├── auth.js                    # Auth endpoints (Register, Login, Current User)
│   │   └── songs.js                   # Music API endpoints (Get Songs, Stream, Like, Lyrics)
│   ├── services/
│   │   └── musicScanner.js            # Local file scanner for /home/omr/Music/Fuck upp/
│   ├── package.json                   # Backend server dependencies (express, mysql2, cors, bcryptjs)
│   └── index.js                       # Express application launcher (Port 5000)
└── src/                               # React Frontend Application Source Code
    ├── main.jsx                       # React 19 application entry point & router root
    ├── App.jsx                        # Central client router (Landing, Login, Home, Explore, etc.)
    ├── App.css                        # Application-wide global reset & base styles
    ├── index.css                      # Utility classes & CSS custom design tokens
    ├── assets/                        # Static media assets (mp3 audio clips, images, logos)
    ├── data/
    │   └── songs.js                   # Frontend dataset for local songs, trending hits & lyrics
    ├── lib/
    │   └── utils.js                   # Utility functions (tailwind-merge, clsx helpers)
    ├── components/                    # Reusable UI component modules
    │   ├── card/
    │   │   ├── SongCard.jsx           # Individual song card component with hover play
    │   │   └── SongCard.css           # Styling for song card component
    │   └── ui/
    │       ├── Navbar.jsx             # Top header navbar with search, navigation & user profile
    │       ├── Navbar.css             # Navbar styles with sleek dark slate glassmorphism
    │       ├── OptionWheel.jsx        # 3D interactive spinning wheel for song selection
    │       ├── OptionWheel.css        # Option wheel CSS layout and transformations
    │       ├── MusicPlayer.jsx        # Small Music Player component (Trending songs)
    │       ├── MusicPlayer.css        # Small Music Player styling
    │       ├── BigMusicPlayer.jsx     # Main central audio player component with seek & controls
    │       ├── BigMusicPlayer.css     # Main central player styling
    │       ├── EqualizerBox.jsx       # Right Column Part 1: Visualizer & sound FX controls
    │       ├── EqualizerBox.css       # EqualizerBox styling
    │       ├── LyricsBox.jsx          # Right Column Part 2: Interactive scrolling song lyrics
    │       ├── LyricsBox.css          # LyricsBox styling
    │       ├── BgBox.jsx              # Reusable background glass container box wrapper
    │       ├── BgBox.css              # Container box styling
    │       ├── LineSidebar.jsx        # Interactive left sidebar filter list
    │       ├── LineSidebar.css        # LineSidebar styling
    │       ├── PlaylistSection.jsx    # Horizontal scrollable playlist section
    │       ├── PlaylistSection.css    # PlaylistSection styling
    │       ├── ShineText.jsx          # Glowing text animation component
    │       └── encrypted-text.jsx     # Encrypted cipher text animation component
    └── pages/                         # Application Views & Pages
        ├── Landing.jsx                # Launch Page (Hero, CTAs, Feature highlights)
        ├── Landing.css                # Launch Page sleek dark graphite styling
        ├── Login.jsx                  # Auth Page (Sign In & Sign Up tabbed form)
        ├── Login.css                  # Auth Page styling
        ├── Home.jsx                   # Main Music App Dashboard (3-Column Layout)
        ├── Home.css                   # Main Dashboard styling
        ├── Explore.jsx                # Explore & Genres Discovery Page
        ├── Explore.css                # Explore Page styling
        ├── LikedSongs.jsx             # Dedicated Liked Songs table page
        ├── LikedSongs.css             # Liked Songs Page styling
        ├── Playlists.jsx              # Custom Playlists & Library overview
        ├── Playlists.css              # Playlists Page styling
        ├── Trending.jsx               # Global Top 10 Charts & Rankings page
        └── Trending.css               # Trending Page styling
```

---

## Detailed Directory Breakdown & Working Mechanisms

### 1. Root Configuration Files (`/`)
- `package.json`: Manages npm packages, build scripts (`npm run dev`, `npm run build`), and dependency versions (`react`, `react-router-dom`, `lucide-react`, `motion`).
- `vite.config.js`: Configures the Vite development server and maps `@` alias to the `src/` folder for clean imports.
- `index.html`: Holds the primary root HTML element (`<div id="root"></div>`) and font links.

---

### 2. Backend Service (`server/`)
- **`server/index.js`**: The main Express backend server entry point. Configures middleware (`cors`, `express.json`), serves local audio files from `/home/omr/Music/Fuck upp/` via static routes, registers authentication & song API routes, and listens on port `5000`.
- **`server/config/db.js`**: Establishes a MySQL connection pool using `mysql2`. Automatically creates required database tables (`users`, `songs`, `lyrics`, `liked_songs`, `playlists`) if they do not exist. Features graceful fallback to embedded database storage if a local MySQL daemon is unconfigured.
- **`server/services/musicScanner.js`**: Automatically scans the local music directory `/home/omr/Music/Fuck upp/`, parses filename patterns for all 19 `.mp3` files (e.g. *Main Woh Chaand*, *Tum Hi Ho*, *Sunn Raha Hai*, *Baarishein*, *Nadaan Parinde*), matches online lyrics data, and indexes them into the database.
- **`server/routes/auth.js`**: Handles user account registration (`/api/auth/register`), password hashing with `bcryptjs`, user login authentication (`/api/auth/login`), JWT token generation, and current profile retrieval (`/api/auth/me`).
- **`server/routes/songs.js`**: Exposes endpoints for retrieving songs (`/api/songs`), streaming local audio files (`/api/songs/stream/:filename`), toggling liked songs (`/api/songs/like`), and fetching lyrics.

---

### 3. Frontend Architecture (`src/`)

#### A. Components (`src/components/`)
- **`src/components/ui/Navbar.jsx`**: Global top navigation bar containing branding logo, search input with real-time query state, quick navigation links (Home, Explore, Liked Songs, Playlists, Trending), and user authentication profile status.
- **`src/components/ui/OptionWheel.jsx`**: A 3D interactive spinning selection wheel rendered on the left column of the Home page. Displays song names; clicking or dragging items triggers the `onChange` callback to load and play that track in the player.
- **`src/components/ui/MusicPlayer.jsx`**: Small Music Player in the top-left section displaying Trending Hits with previous/next controls, audio playback, time duration, and seek slider.
- **`src/components/ui/BigMusicPlayer.jsx`**: Central main player component. Manages HTML5 audio playback (`play`, `pause`, `seek`, `skip -10s/+10s`, `prev`, `next`), time formatting, cover art display, and favorite toggle.
- **`src/components/ui/EqualizerBox.jsx`**: Located in **Part 1** of the Right Column on the Home page. Features an animated audio visualizer frequency spectrum, song stats (Genre, BPM, Quality, Release Year), and audio enhancement toggles (Bass Boost, 3D Spatial Audio, HD Clarity).
- **`src/components/ui/LyricsBox.jsx`**: Located in **Part 2** of the Right Column on the Home page. Renders interactive, karaoke-style scrolling lyrics for the currently active song. Users can click any lyric line to jump directly to that part.
- **`src/components/ui/LineSidebar.jsx`**: Interactive vertical navigation sidebar allowing users to switch category views (Favorites, Most Played, Recents, Trending, Radio).

#### B. Pages (`src/pages/`)
- **`Landing.jsx`**: The launch page (`/`) featuring a sleek dark graphite aesthetic, hero title, interactive music preview, audiophile features, and CTA button directing users to `/login`.
- **`Login.jsx`**: The authentication page (`/login`) located between Launch and Home. Provides tabbed forms for Sign In and Sign Up with client-side validation and backend API connection.
- **`Home.jsx`**: The core 3-column dashboard page (`/home`). Integrates OptionWheel with local songs, Small Player with trending hits, Big Music Player in center, and split Right Column (Top: EqualizerBox, Bottom: LyricsBox).
- **`Explore.jsx`**: Browse page (`/explore`) showcasing genre cards, curated collections, and top song charts.
- **`LikedSongs.jsx`**: Dedicated favorites page (`/liked`) listing all liked tracks in a clean table with play controls.
- **`Playlists.jsx`**: Library page (`/playlists`) displaying custom user playlists and recently played mixes.
- **`Trending.jsx`**: Top charts page (`/trending`) highlighting the global top 10 songs with play counts and rank badges.

#### C. Data (`src/data/`)
- **`src/data/songs.js`**: Contains local song definitions referencing the MP3 files in `/home/omr/Music/Fuck upp/`, full online lyrics, album cover artwork, genres, BPMs, and release information.
