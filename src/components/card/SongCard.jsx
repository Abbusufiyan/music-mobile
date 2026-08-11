import React from "react";
import "./SongCard.css";

function SongCard({ image, songName, author }) {
  return (
    <div className="song-card">

      {/* Cover */}
      <div className="song-card-cover">
        <img src={image} alt={songName} />

        {/* Play button on hover */}
        <div className="song-card-overlay">
          <div className="song-card-play">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Song information */}
      <div className="song-card-info">
        <div className="song-card-name">
          {songName}
        </div>

        <div className="song-card-author">
          {author}
        </div>
      </div>

    </div>
  );
}

export default SongCard;