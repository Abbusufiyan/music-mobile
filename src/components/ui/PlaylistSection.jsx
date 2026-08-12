import React from "react";
import SongCard from "@/components/card/SongCard";
import "./PlaylistSection.css";

function PlaylistSection({ title, songs, onSelectSong }) {
  return (
    <section className="playlist-section">

      <div className="playlist-section-header">
        <h2>{title}</h2>

        <button type="button" className="see-all">
          See all
        </button>
      </div>

      <div className="playlist-cards">
        {songs.map((song) => (
          <div
            key={song.id}
            className="playlist-card-wrap"
            onClick={() => onSelectSong?.(song)}
            onKeyDown={(e) => e.key === "Enter" && onSelectSong?.(song)}
            role="button"
            tabIndex={0}
          >
            <SongCard
              image={song.image}
              songName={song.songName}
              author={song.author}
            />
          </div>
        ))}
      </div>

    </section>
  );
}

export default PlaylistSection;