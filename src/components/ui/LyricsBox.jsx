import React, { useState } from "react";
import { AlignLeft, Mic2, Music2 } from "lucide-react";
import "./LyricsBox.css";

function LyricsBox({ activeSong }) {
  const [activeLine, setActiveLine] = useState(0);

  const lyricsList = activeSong?.lyrics || [
    "Kaisi yeh raat hai, jo kat-ti nahi",
    "Kaisi yeh baat hai, jo chhut-ti nahi",
    "Yeh yaadein teri, aati hain kyun?",
    "Dil ko hamare satai hain kyun?",
    "Baarish ki boondein giraati hain aks",
    "Tere hi chehre ka, pyara sa roop",
    "Kaisi yeh raat hai, jo kat-ti nahi",
    "Hum toh rahe bas tere hi sang..."
  ];

  return (
    <div className="lyrics-container">
      {/* Lyrics Header */}
      <div className="lyrics-header">
        <div className="lyrics-header-left">
          <Mic2 size={16} className="lyrics-icon" />
          <span className="lyrics-title">Song Lyrics</span>
        </div>
        <div className="lyrics-track-name">
          {activeSong?.title || "Baarish"} - {activeSong?.artist || "Anuv Jain"}
        </div>
      </div>

      {/* Lyrics Content List */}
      <div className="lyrics-scroll-box">
        {lyricsList.map((line, index) => (
          <div
            key={index}
            className={`lyric-line ${activeLine === index ? "active" : ""}`}
            onClick={() => setActiveLine(index)}
          >
            <Music2 size={12} className="line-bullet" />
            <span>{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LyricsBox;
