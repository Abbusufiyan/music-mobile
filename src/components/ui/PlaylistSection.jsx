import React from "react";
import SongCard from "@/components/card/SongCard";
import "./PlaylistSection.css";

function PlaylistSection({ title, songs }) {
  return (
    <section className="playlist-section">

      <div className="playlist-section-header">
        <h2>{title}</h2>

        <button className="see-all">
          See all
        </button>
      </div>

      <div className="playlist-cards">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            image={song.image}
            songName={song.songName}
            author={song.author}
          />
        ))}
      </div>

    </section>
  );
}

export default PlaylistSection;