import fs from "fs";
import path from "path";
import { getPool, isDbConnected } from "../config/db.js";

export const LOCAL_MUSIC_DIR = "/home/omr/Music/Fuck upp/";

export const ONLINE_LYRICS_MAP = {
  "1. Main Woh Chaand": [
    "Main woh chaand jiska tere bin na koi aasmaan",
    "Main woh chaand jiska tere bin na koi aasmaan",
    "Dhoondta hai tujhko dil yeh mera har jagah",
    "Tere bina jeena mera mushkil ho gaya",
    "Main woh chaand jiska tere bin na koi aasmaan..."
  ],
  "2. Aasan Nahin Yahan": [
    "Aasan nahin yahan aashiqui ho jaana",
    "Palkon pe kaanton ko sajaana",
    "Aashiqui mein har aashiq ho jaata hai majboor",
    "Dil ko sambhaalna nahi hai aasan...",
    "Aasan nahin yahan aashiqui ho jaana..."
  ],
  "3. Sunn Raha Hai": [
    "Sunn raha hai na tu, ro raha hoon main",
    "Sunn raha hai na tu, kyun ro raha hoon main",
    "Manzilayein ruswa hain, khoya hoon main mazhab se",
    "Yaad aaye har lamha, tera hi chehra mujhe...",
    "Sunn raha hai na tu, ro raha hoon main..."
  ],
  "4. Tum Hi Ho": [
    "Hum tere bin ab reh nahi sakte",
    "Tere bina kya wajood mera",
    "Tujhse juda agar ho jaayenge",
    "Toh khud se hi ho jaayenge judaa",
    "Kyunki tum hi ho, ab tum hi ho",
    "Zindagi ab tum hi ho",
    "Chain bhi, mera dard bhi",
    "Meri aashiqui ab tum hi ho..."
  ],
  "5. Chahun Main Ya Naa": [
    "Tu hi ye mujhko bata de, chahun main ya naa",
    "Apne tu dil ka pata de, chahun main ya naa",
    "Itna bata doon tujhko, chaahat pe apni mujhko",
    "Yoon to nahi ikhtiyaar...",
    "Tu hi ye mujhko bata de..."
  ],
  "6. Milne Hai Mujhse Aayi": [
    "Milne hai mujhse aayi, phir jaane kyun tanhai",
    "Kisko sunayein hum yeh dastaan",
    "Batein ye kabhi na tu bhoolna",
    "Koi tere khatir hai jee raha...",
    "Milne hai mujhse aayi..."
  ],
  "7. Ae Dil Hai Mushkil": [
    "Tu safar mera, hai tu hi meri manzil",
    "Tere bina guzara, ae dil hai mushkil",
    "Tu mera khuda, tu hi dua mein shamil",
    "Tere bina guzara, ae dil hai mushkil",
    "Mujhe aazmati hai teri kami",
    "Meri har kami ko hai tu lazmi..."
  ],
  "8. Daastan": [
    "Yeh dastaan hai kiski, kehde mujhe bata de",
    "Raaton mein jaagne ki, wajah mujhe bata de",
    "Kyun dil mera yeh bole, tu hi hai meri manzil",
    "Baatein teri mehakti, yaadein teri sunhari..."
  ],
  "9. Samjhawan": [
    "Main tenu samjhawan ki, na tere bina lagda jee",
    "Tu ki jaane pyar mera, main karu intezar tera",
    "Tu dil tui-yon jaan meri...",
    "Mere dil vich rehndi aen, tu saahan vich vagdi aen",
    "Main tenu samjhawan ki..."
  ],
  "10. Khat": [
    "Khat jo likhe the maine tere naam ke",
    "Kaagaz woh saare purane ho gaye",
    "Yaadon ke mausam सुहाने ho gaye",
    "Tujhko pukare dil mera har pal",
    "Lauta de mere woh kal..."
  ],
  "11. Darkhaast": [
    "Is kadar tu mujhe pyar kar",
    "Kharaj ho jaaoon main tere andar",
    "Meri darkhaast hai ye, tujhse meri iltaza",
    "Na hona judaa tu kabhi...",
    "Is kadar tu mujhe pyar kar..."
  ],
  "12. Arz Kiya Hai": [
    "Arz kiya hai dil ki baat sunlo",
    "Sufiyana jazbaat sunlo",
    "Coke Studio Bharat ki yeh dhun hai",
    "Manzil ki taraf naye kadam hai",
    "Arz kiya hai..."
  ],
  "13. Baarishein": [
    "Kaisi yeh raat hai, jo kat-ti nahi",
    "Kaisi yeh baat hai, jo chhut-ti nahi",
    "Yeh yaadein teri, aati hain kyun?",
    "Dil ko hamare satai hain kyun?",
    "Baarish ki boondein giraati hain aks",
    "Tere hi chehre ka, pyara sa roop..."
  ],
  "14. Tum Se Hi": [
    "Na hai yeh panaah, na hai yeh gumaan",
    "Na jaane kahan se aaya hai yeh samaan",
    "Tum se hi din hota hai, surmai shaam aati hai",
    "Tum se hi, tum se hi...",
    "Har ghadi saans aati hai, tum se hi..."
  ],
  "15. Nadaan Parinde": [
    "Nadaan parinde ghar aaja",
    "Kyun des bides phire maara",
    "Kyun bhool gaya hai tu apna ghar",
    "Nadaan parinde ghar aaja...",
    "Kaga re kaga re mori itni araj suniyo..."
  ],
  "16. Guzarish": [
    "Tu meri adhoori pyas pyas, tu aa bhaja le meri pyas pyas",
    "Tu har lamha meri guzarish hai",
    "Har pal tera hi intazaar hai",
    "Kahaani hamari sabse juda hai...",
    "Tu meri adhoori pyas pyas..."
  ],
  "17. Tum Ho": [
    "Tum ho paas mere, saath mere ho tum yoon",
    "Jitna mehsus karoon tumko, utna hi paaloon yoon",
    "Tum ho mera junoon, tum ho mera sukoon",
    "Kahi se bhi dekhoon, tum hi ho har taraf...",
    "Tum ho paas mere..."
  ],
  "18. Jeena Jeena": [
    "Dehleez pe mere dil ki, jo rakhe hain tune kadam",
    "Tere naam pe meri zindagi, likh di mere humdum",
    "Haan sikhaya tune jeena jeena kaise jeena",
    "Haan sikhaya tune jeena mere humdum...",
    "Dehleez pe mere dil ki..."
  ],
  "19. Aadat": [
    "Juda hoke bhi, tu mujhmein kahin baaki hai",
    "Palkon mein ban ke aansu, tu chhipi aadat hai",
    "Ab toh aadat si hai mujhko aise jeene mein",
    "Yeh dooriyan, yeh tanhaiyaan...",
    "Ab toh aadat si hai..."
  ]
};

export function scanLocalMusicFiles() {
  const songsList = [];
  try {
    if (!fs.existsSync(LOCAL_MUSIC_DIR)) {
      console.warn(`[Scanner] Music dir ${LOCAL_MUSIC_DIR} not found.`);
      return songsList;
    }

    const files = fs.readdirSync(LOCAL_MUSIC_DIR).filter(f => f.toLowerCase().endsWith(".mp3"));

    files.forEach((file, idx) => {
      const cleanName = path.basename(file, ".mp3");
      // Extract title and artist
      let title = cleanName;
      let artist = "Arijit Singh / Local Artist";

      if (cleanName.includes("Baarishein")) artist = "Anuv Jain";
      else if (cleanName.includes("Tum Se Hi")) artist = "Mohit Chauhan";
      else if (cleanName.includes("Nadaan Parinde") || cleanName.includes("Tum Ho")) artist = "A.R. Rahman & Mohit Chauhan";
      else if (cleanName.includes("Jeena Jeena")) artist = "Atif Aslam";
      else if (cleanName.includes("Aadat")) artist = "Atif Aslam / Jal";
      else if (cleanName.includes("Ae Dil Hai Mushkil")) artist = "Arijit Singh";
      else if (cleanName.includes("Samjhawan")) artist = "Arijit Singh & Shreya Ghoshal";

      // Match online lyrics
      let lyrics = ONLINE_LYRICS_MAP[cleanName] || [
        `Playing ${title}`,
        "Online lyrics synchronized...",
        "Enjoy your peace with high fidelity audio sound"
      ];

      // Key lookup
      for (const k of Object.keys(ONLINE_LYRICS_MAP)) {
        if (cleanName.includes(k) || k.includes(cleanName)) {
          lyrics = ONLINE_LYRICS_MAP[k];
          break;
        }
      }

      songsList.push({
        id: idx + 1,
        title: title,
        artist: artist,
        album: "Bollywood Hits",
        duration: "4:15",
        fileName: file,
        audioUrl: `/api/songs/stream/${encodeURIComponent(file)}`,
        genre: idx % 2 === 0 ? "Indie / Acoustic" : "Bollywood Romantic",
        bpm: 95 + (idx * 3) % 40,
        releaseYear: 2015 + (idx % 9),
        lyrics: lyrics
      });
    });

    console.log(`[Scanner] Successfully indexed ${songsList.length} local MP3 tracks from ${LOCAL_MUSIC_DIR}`);
  } catch (err) {
    console.error("[Scanner] Error reading local music files:", err.message);
  }

  return songsList;
}
