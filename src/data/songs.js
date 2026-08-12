// src/data/songs.js
// Parses /home/omr/Music/music_library.json structure into a usable frontend dataset

import baarishCover from "../assets/image.png";
import heroCover from "../assets/hero.png";
import { apiUrl } from "../config/api.js";

const BASE_STREAM = apiUrl("/api/songs/stream");

// Curated short lyrics (placeholder — real lyrics at lyrics_url in JSON)
const LYRICS_MAP = {
  "Main Woh Chaand": [
    "Main woh chaand jiska tere bin na koi aasmaaan",
    "Dhoondta hai tujhko dil yeh mera har jagah",
    "Tere bina jeena mujhko mushkil ho gaya",
    "Har raat teri yaad mujhe chain na aane de",
    "Main woh chaand jiska tere bin na koi aasmaan..."
  ],
  "Aasan Nahin Yahan": [
    "Aasan nahin yahan aashiqui ho jaana",
    "Palkon pe kaanton ko sajaana",
    "Aashiqui mein har aashiq ho jaata hai majboor",
    "Dil ko sambhaalna nahi hai aasan...",
    "Na jaane kaise kaatungi yeh raat"
  ],
  "Sunn Raha Hai": [
    "Sunn raha hai na tu ro raha hoon main",
    "Kyun ro raha hoon main, tu na jaane",
    "Manzilayein ruswa hain, khoya hoon main",
    "Yaad aaye har lamha tera chehra",
    "Sunn raha hai na tu..."
  ],
  "Tum Hi Ho": [
    "Hum tere bin ab reh nahi sakte",
    "Tere bina kya wajood mera",
    "Tujhse juda agar ho jaayenge",
    "Toh khud se hi ho jaayenge judaa",
    "Kyunki tum hi ho, ab tum hi ho..."
  ],
  "Chahun Main Ya Naa": [
    "Tu hi ye mujhko bata de, chahun main ya naa",
    "Apne tu dil ka pata de, chahun main ya naa",
    "Itna bata doon tujhko chaahat pe apni mujhko",
    "Yoon to nahi ikhtiyaar, itna bata de",
    "Tu hi ye mujhko bata de..."
  ],
  "Milne Hai Mujhse Aayi": [
    "Milne hai mujhse aayi phir jaane kyun tanhai",
    "Kisko sunayein hum yeh dastaan",
    "Batein ye kabhi na tu bhoolna",
    "Koi tere khatir hai jee raha",
    "Milne hai mujhse aayi..."
  ],
  "Ae Dil Hai Mushkil": [
    "Tu safar mera, hai tu hi meri manzil",
    "Tere bina guzara ae dil hai mushkil",
    "Tu mera khuda, tu hi dua mein shamil",
    "Tere bina guzara ae dil hai mushkil...",
    "Mujhe aazmati hai teri kami"
  ],
  "Daastan": [
    "Yeh dastaan hai kiski kehde mujhe bata de",
    "Raaton mein jaagne ki wajah mujhe bata de",
    "Kyun dil mera yeh bole tu hi meri manzil",
    "Baatein teri mehakti yaadein teri sunhari",
    "Yeh dastaan..."
  ],
  "Samjhawan": [
    "Main tenu samjhawan ki na tere bina lagda jee",
    "Tu ki jaane pyar mera main karu intezar tera",
    "Mere dil vich rehndi aen tu saahan vich vagdi aen",
    "Main tenu samjhawan ki...",
    "Tenu samjhawan na jaave"
  ],
  "Khat": [
    "Khat jo likhe the maine tere naam ke",
    "Kaagaz woh saare purane ho gaye",
    "Tujhko pukare dil mera har pal",
    "Lauta de mere woh pal wo din",
    "Khat jo likhe the maine..."
  ],
  "Darkhaast": [
    "Is kadar tu mujhe pyar kar",
    "Meri darkhaast hai ye tujhse meri iltaza",
    "Na hona judaa tu kabhi",
    "Har pal tere bin soona lagta hai",
    "Is kadar tu mujhe pyar kar..."
  ],
  "Arz Kiya Hai": [
    "Arz kiya hai dil ki baat sunlo",
    "Sufiyana jazbaat sunlo",
    "Manzil ki taraf naye kadam hai",
    "Sang saath chalte chalte jaayein",
    "Arz kiya hai..."
  ],
  "Baarishein": [
    "Kaisi yeh raat hai jo kat-ti nahi",
    "Kaisi yeh baat hai jo chhut-ti nahi",
    "Yeh yaadein teri aati hain kyun",
    "Baarish ki boondein giraati hain aks",
    "Kaisi yeh raat hai..."
  ],
  "Tum Se Hi": [
    "Tum se hi din hota hai surmai shaam aati hai",
    "Tum se hi tum se hi har ghadi saans aati hai",
    "Na hai yeh panaah na hai yeh gumaan",
    "Tum se hi meri yeh zindagaani",
    "Tum se hi tum se hi..."
  ],
  "Nadaan Parinde": [
    "Nadaan parinde ghar aaja",
    "Kyun des bides phire maara",
    "Kyun bhool gaya hai tu apna ghar",
    "Kaga re kaga re mori itni araj suniyo",
    "Nadaan parinde ghar aaja..."
  ],
  "Guzarish": [
    "Tu meri adhoori pyas tu aa bhaja le meri pyas",
    "Tu har lamha meri guzarish hai",
    "Har pal tera hi intazaar hai",
    "Kahaani hamari sabse juda hai",
    "Tu meri adhoori pyas..."
  ],
  "Tum Ho": [
    "Tum ho paas mere saath mere ho tum yoon",
    "Jitna mehsus karoon tumko utna hi paaloon yoon",
    "Tum ho mera junoon tum ho mera sukoon",
    "Kahi se bhi dekhoon tum hi ho har taraf",
    "Tum ho paas mere..."
  ],
  "Jeena Jeena": [
    "Dehleez pe mere dil ki jo rakhe hain tune kadam",
    "Tere naam pe meri zindagi likh di mere humdum",
    "Haan sikhaya tune jeena jeena kaise jeena",
    "Haan sikhaya tune jeena mere humdum",
    "Dehleez pe mere dil ki..."
  ],
  "Aadat": [
    "Juda hoke bhi tu mujhmein kahin baaki hai",
    "Palkon mein ban ke aansu tu chhipi aadat hai",
    "Ab toh aadat si hai mujhko aise jeene mein",
    "Yeh dooriyan yeh tanhaiyaan",
    "Ab toh aadat si hai..."
  ],
  // NFAK songs
  "Hai Kahan Ka Irada": [
    "Hai kahan ka irada kahan chal diye",
    "Aankhon se aankhein mila ke na ja",
    "Dil se dil ka jo rishta hai woh tod ke na ja",
    "Ik baar phir se aa mere paas",
    "Hai kahan ka irada..."
  ],
  "Hae Kahan Ka Irada Sanam": [
    "Hae kahan ka irada sanam aa bhi ja",
    "Dil ki tasveer mein tu hi hai bas",
    "Yaad teri aati hai har dam mujhe",
    "Tere bina yeh zindagi adhuri hai",
    "Hae kahan ka irada sanam..."
  ],
  "Tum Agar Yuhin Nazren Milate Rahe": [
    "Tum agar yuhin nazren milate rahe",
    "Main kahin kho jaunga deewaana ban ke",
    "Dil ka armaan hai tujhse milna",
    "Har pal teri yaad satati hai mujhe",
    "Tum agar yuhin nazren..."
  ],
  "Aisa Bana Sanwarna Mubarik Tumhen": [
    "Aisa bana sanwarna mubarik tumhen",
    "Khub sanwara khuda ne tumhe aaj",
    "Rangon se bhari hain yeh aankhein teri",
    "Har khushbu hai teri aaj",
    "Aisa bana sanwarna mubarik..."
  ],
  "Halka Halka Saroor": [
    "Halka halka saroor hai dil mein",
    "Kuch kuch ho raha hai dil mein aaj",
    "Tere ishq ne mujhe pagal kiya",
    "Yeh kaisi meethi si taklif hai",
    "Halka halka saroor hai..."
  ],
  "Dil Pe Zakham Khate Hain": [
    "Dil pe zakham khate hain hum bhi",
    "Phir bhi dil se pyar karte hain",
    "Tere naam pe jaan dete hain",
    "Itna dard kahan se laaun main",
    "Dil pe zakham khate hain..."
  ],
  "Sanson Ki Mala Pe": [
    "Sanson ki mala pe simron main pee ka naam",
    "Pee ka naam simroon har dam",
    "Mann mera tujhpe fida hai",
    "Tu hi mera sukoon hai",
    "Sanson ki mala pe..."
  ],
  "Tumhen Dillagi Bhool Jani Paregee": [
    "Tumhen dillagi bhool jani paregee",
    "Mohabbat ki raahon mein tum aaye ho",
    "Yeh rasta nahi hai aasaan",
    "Dil deke phir kuch nahi milta yahan",
    "Tumhen dillagi bhool jani paregee..."
  ],
  "Biba Sada Dil Morr De": [
    "Biba sada dil morr de",
    "Ruk ja yaara ikk pal ruk ja",
    "Dil ne tenu yaad kiya hai",
    "Tu hi to hai sab kuch mera",
    "Biba sada dil morr de..."
  ],
  "Na To Caravan Ki Talash Hai": [
    "Na to caravan ki talash hai na koi manzil",
    "Hum to chalte hain yun hi be-raah",
    "Dil ka dard kaun samjhe yahan",
    "Na to caravan ki talash hai...",
    "Yunhi chalte chalte"
  ],
  "Un Ka Andaz-E-Karam": [
    "Un ka andaz-e-karam dekha to kar diya deewaana",
    "Nigaah-e-naz ne kiya mujhe kya",
    "Kuch aisa jadoo kar diya unne",
    "Dil mein basa liya humein unhone",
    "Un ka andaz-e-karam..."
  ],
  "Husn Walon Se Allah Bachaye": [
    "Husn walon se allah bachaye",
    "Dekhte hain to dil kho jaata hai",
    "Yeh kya kiya tumne ae haseen",
    "Har taraf teri hi yaad hai",
    "Husn walon se allah bachaye..."
  ],
  "Sat Asmana De Tale": [
    "Sat asmana de tale khada haan main",
    "Teri raah takda haan raat din",
    "Tenu milaawan da dil karda e",
    "Yaad teri aundi hai sanu",
    "Sat asmana de tale..."
  ],
  "Barsoon Kay Intizar Ka": [
    "Barsoon kay intizar ka silsila khatam hua",
    "Tum aaye to laga jaise aasmaan khul gaya",
    "Yeh intezaar tha jo ab poora hua",
    "Barson baad mili ho tum aaj",
    "Barsoon kay intizar ka..."
  ],
  "Aisa Banna Sanwarna Mubarik Tumhen": [
    "Aisa banna sanwarna mubarik tumhen aaj",
    "Har khushbu hai teri rang mein",
    "Khuda ne tumhe khaas banaya hai",
    "Yeh khushi hai jo teri aankhon mein",
    "Aisa banna sanwarna mubarik..."
  ]
};

// Album cover images from JSON (iTunes CDN)
const ALBUM_COVERS = {
  "ALB_001": null,
  "ALB_002": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/2d/11/b9/2d11b994-b4fa-19eb-953d-70b472165e95/8903431566911_cover.jpg/600x600bb.jpg",
  "ALB_003": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/bb/23/ee/bb23eeed-0c35-4f1d-2b11-485622777ae4/8902894353007_cover.jpg/600x600bb.jpg",
  "ALB_004": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/43/3c/7a/433c7a84-116b-4001-115e-c8e34d57ebd0/886446235608.jpg/600x600bb.jpg",
  "ALB_005": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b7/43/10/b743109c-5742-96df-e571-d247e805d185/cover.jpg/600x600bb.jpg",
  "ALB_006": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/24/a5/a4/24a5a4bf-5854-abf3-a834-845c0fef65c6/886444676540.jpg/600x600bb.jpg",
  "ALB_007": null,
  "ALB_008": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/b5/20/55/b520556d-a1b7-ed6a-db24-5de2f1762998/8902894358422_cover.jpg/600x600bb.jpg",
  "ALB_009": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/02/e7/77/02e77709-a5f6-5470-9e5b-70a0d6ff45ed/25UM1IM13936.rgb.jpg/600x600bb.jpg",
  "ALB_010": null,
  "ALB_011": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/3d/c7/43/3dc74387-e7f4-2342-397c-4cf2037c69a5/8902894623223_cover.jpg/600x600bb.jpg",
  "ALB_012": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/b1/2a/54/b12a5476-65db-75b9-be67-611bede2596e/8902894628464_cover.jpg/600x600bb.jpg",
  "ALB_013": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/35/85/12/358512ee-128b-977f-40bc-669beb1bcc8d/196871079747.jpg/600x600bb.jpg",
  "ALB_014": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/27/41/48/27414810-2929-aa34-e145-000948a5c8b7/0602465586596.jpg/600x600bb.jpg",
  "ALB_015": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/0e/f7/76/0ef776a6-1443-77a0-2266-8473a018b0c2/24UM1IM19407.rgb.jpg/600x600bb.jpg",
  "ALB_016": null,
  "ALB_017": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/ff/21/39/ff21398b-cc6c-1d11-250e-846f04b752a1/24UM1IM13704.rgb.jpg/600x600bb.jpg",
  "ALB_018": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/eb/26/a0/eb26a06b-eaa5-fdd7-a531-39eb979c8a78/25UMGIM02927.rgb.jpg/600x600bb.jpg",
  "ALB_019": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/0e/f7/76/0ef776a6-1443-77a0-2266-8473a018b0c2/24UM1IM19407.rgb.jpg/600x600bb.jpg",
  "ALB_020": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/6a/64/92/6a649255-2bf3-bbd3-9b64-bdabad4f0480/199538861662.jpg/600x600bb.jpg",
  "ALB_021": "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/7c/34/26/7c3426e7-ac56-7c79-11b5-e0628d659653/0884108002995_cover.jpg/600x600bb.jpg",
  "ALB_022": "https://is1-ssl.mzstatic.com/image/thumb/Music4/v4/ec/5f/17/ec5f1718-e330-957b-cdb2-bf0a869cc629/888831762294.jpg/600x600bb.jpg",
  "ALB_023": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/8e/1f/fd/8e1ffd82-3970-4364-eaa1-8b4bce9a7704/24UM1IM13831.rgb.jpg/600x600bb.jpg",
  "ALB_024": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/af/50/50/af505022-da0b-0c4a-ef28-b8784598236b/24UM1IM14604.rgb.jpg/600x600bb.jpg"
};

const ARTIST_NAMES = {
  "ART_001": "A.R. Rahman", "ART_002": "Aastha Gill", "ART_003": "Amaal Mallik",
  "ART_004": "Ankit Tiwari", "ART_005": "Arijit Singh", "ART_006": "Arko",
  "ART_007": "Armaan Malik", "ART_008": "Atif Aslam", "ART_009": "Goher Mumtaz",
  "ART_010": "Hrithik Roshan", "ART_011": "Jeet Gannguli", "ART_012": "Mithoon",
  "ART_013": "Mohit Chauhan", "ART_014": "Nusrat Fateh Ali Khan",
  "ART_015": "Palak Muchhal", "ART_016": "Pritam", "ART_017": "Rahat Fateh Ali Khan",
  "ART_018": "Sachin-Jigar", "ART_019": "Sanjay Leela Bhansali",
  "ART_020": "Sharib-Toshi", "ART_021": "Shreya Ghoshal", "ART_022": "Sonu Nigam",
  "ART_023": "Stebin Ben", "ART_024": "Sunidhi Chauhan",
  "ART_025": "Tanishk Bagchi", "ART_026": "Tulsi Kumar"
};

const ALBUM_GENRES = {
  "ALB_001": "Bollywood / Romantic", "ALB_002": "Bollywood / Rockstar",
  "ALB_003": "Bollywood / Romantic", "ALB_004": "Bollywood / Romantic",
  "ALB_005": "Ghazal / Sufi", "ALB_006": "Bollywood / Romantic",
  "ALB_007": "Indie / Romantic", "ALB_008": "Bollywood / Action",
  "ALB_009": "Indie / Sufi", "ALB_010": "Indie Pop",
  "ALB_011": "Bollywood / Romantic", "ALB_012": "Bollywood / Romantic",
  "ALB_013": "Bollywood / Romantic", "ALB_014": "Pakistani Pop / Rock",
  "ALB_015": "Qawwali / Sufi", "ALB_016": "Ghazal / Sufi",
  "ALB_017": "Qawwali / Sufi", "ALB_018": "Qawwali / Sufi",
  "ALB_019": "Ghazal / Sufi", "ALB_020": "Qawwali / Devotional",
  "ALB_021": "Punjabi Qawwali", "ALB_022": "Ghazal / Sufi",
  "ALB_023": "Ghazal / Sufi", "ALB_024": "Qawwali / Sufi - Live"
};

// Build the folder→filename map based on track_no
const FUCK_UPP_FILES = {
  1: "1. Main Woh Chaand.mp3",
  2: "2. Aasan Nahin Yahan.mp3",
  3: "3. Sunn Raha Hai.mp3",
  4: "4. Tum Hi Ho.mp3",
  5: "5. Chahun Main Ya Naa.mp3",
  6: "6. Milne Hai Mujhse Aayi.mp3",
  7: "7. Ae Dil Hai Mushkil Title Track (From \"Ae Dil Hai Mushkil\").mp3",
  8: "8. Daastan.mp3",
  9: "9. Samjhawan.mp3",
  10: "10. Khat.mp3",
  11: "11. Darkhaast.mp3",
  12: "12. Arz Kiya Hai | Coke Studio Bharat.mp3",
  13: "13. Baarishein.mp3",
  14: "14. Tum Se Hi.mp3",
  15: "15. Nadaan Parinde.mp3",
  16: "16. Guzarish.mp3",
  17: "17. Tum Ho.mp3",
  18: "18. Jeena Jeena.mp3",
  19: "19. Aadat - Trending Version.mp3"
};

const NFAK_FILES = {
  1: "1. Hai Kahan Ka Irada.mp3",
  2: "2. Hae Kahan Ka Irada Sanam.mp3",
  3: "3. Tum Agar Yuhin Nazren Milate Rahe.mp3",
  4: "4. Aisa Bana Sanwarna Mubarik Tumhen.mp3",
  5: "5. Halka Halka Saroor.mp3",
  6: "6. Dil Pe Zakham Khate Hain.mp3",
  7: "7. Sanson Ki Mala Pe.mp3",
  8: "8. Tumhen Dillagi Bhool Jani Paregee.mp3",
  9: "9. Sanson Ki Mala Pe.mp3",
  10: "10. Biba Sada Dil Morr De.mp3",
  11: "11. Na To Caravan Ki Talash Hai.mp3",
  12: "12. Aisa Banna Sanwarna Mubarik Tumhen.mp3",
  13: "13. Un Ka Andaz-E-Karam.mp3",
  14: "14. Husn Walon Se Allah Bachaye - Live Version.mp3",
  15: "15. Sat Asmana De Tale.mp3",
  16: "16. Barsoon Kay Intizar Ka.mp3"
};

function buildAudioUrl(folder, trackNo, filename) {
  const encoded = encodeURIComponent(filename);
  if (folder === "Fuck upp") {
    return `${BASE_STREAM}/fuckupp/${encoded}`;
  }
  return `${BASE_STREAM}/nfak/${encoded}`;
}

// Raw songs from music_library.json (Fuck upp folder)
const RAW_FUCK_UPP = [
  { song_id: "SNG_001", title: "Main Woh Chaand", album_id: "ALB_001", singer_ids: ["ART_023"], track_no: 1, folder: "Fuck upp", bpm: 88 },
  { song_id: "SNG_002", title: "Aasan Nahin Yahan", album_id: "ALB_002", singer_ids: ["ART_013"], track_no: 2, folder: "Fuck upp", bpm: 94 },
  { song_id: "SNG_003", title: "Sunn Raha Hai", album_id: "ALB_003", singer_ids: ["ART_004", "ART_021"], track_no: 3, folder: "Fuck upp", bpm: 78 },
  { song_id: "SNG_004", title: "Tum Hi Ho", album_id: "ALB_003", singer_ids: ["ART_005"], track_no: 4, folder: "Fuck upp", bpm: 72 },
  { song_id: "SNG_005", title: "Chahun Main Ya Naa", album_id: "ALB_003", singer_ids: ["ART_005", "ART_015"], track_no: 5, folder: "Fuck upp", bpm: 90 },
  { song_id: "SNG_006", title: "Milne Hai Mujhse Aayi", album_id: "ALB_003", singer_ids: ["ART_015"], track_no: 6, folder: "Fuck upp", bpm: 85 },
  { song_id: "SNG_007", title: "Ae Dil Hai Mushkil", album_id: "ALB_004", singer_ids: ["ART_005"], track_no: 7, folder: "Fuck upp", bpm: 102 },
  { song_id: "SNG_008", title: "Daastan", album_id: "ALB_005", singer_ids: ["ART_017"], track_no: 8, folder: "Fuck upp", bpm: 70 },
  { song_id: "SNG_009", title: "Samjhawan", album_id: "ALB_006", singer_ids: ["ART_005", "ART_021"], track_no: 9, folder: "Fuck upp", bpm: 80 },
  { song_id: "SNG_010", title: "Khat", album_id: "ALB_007", singer_ids: ["ART_007"], track_no: 10, folder: "Fuck upp", bpm: 92 },
  { song_id: "SNG_011", title: "Darkhaast", album_id: "ALB_008", singer_ids: ["ART_005", "ART_024"], track_no: 11, folder: "Fuck upp", bpm: 98 },
  { song_id: "SNG_012", title: "Arz Kiya Hai", album_id: "ALB_009", singer_ids: ["ART_005", "ART_026"], track_no: 12, folder: "Fuck upp", bpm: 95 },
  { song_id: "SNG_013", title: "Baarishein", album_id: "ALB_010", singer_ids: ["ART_006", "ART_002"], track_no: 13, folder: "Fuck upp", bpm: 84 },
  { song_id: "SNG_014", title: "Tum Se Hi", album_id: "ALB_011", singer_ids: ["ART_013"], track_no: 14, folder: "Fuck upp", bpm: 76 },
  { song_id: "SNG_015", title: "Nadaan Parinde", album_id: "ALB_002", singer_ids: ["ART_013"], track_no: 15, folder: "Fuck upp", bpm: 110 },
  { song_id: "SNG_016", title: "Guzarish", album_id: "ALB_012", singer_ids: ["ART_022", "ART_010"], track_no: 16, folder: "Fuck upp", bpm: 86 },
  { song_id: "SNG_017", title: "Tum Ho", album_id: "ALB_002", singer_ids: ["ART_013"], track_no: 17, folder: "Fuck upp", bpm: 82 },
  { song_id: "SNG_018", title: "Jeena Jeena", album_id: "ALB_013", singer_ids: ["ART_008"], track_no: 18, folder: "Fuck upp", bpm: 100 },
  { song_id: "SNG_019", title: "Aadat", album_id: "ALB_014", singer_ids: ["ART_008"], track_no: 19, folder: "Fuck upp", bpm: 96 }
];

const RAW_NFAK = [
  { song_id: "SNG_020", title: "Hai Kahan Ka Irada", album_id: "ALB_015", singer_ids: ["ART_014"], track_no: 1, folder: "NFAK", bpm: 68 },
  { song_id: "SNG_021", title: "Hae Kahan Ka Irada Sanam", album_id: "ALB_015", singer_ids: ["ART_014"], track_no: 2, folder: "NFAK", bpm: 65 },
  { song_id: "SNG_022", title: "Tum Agar Yuhin Nazren Milate Rahe", album_id: "ALB_016", singer_ids: ["ART_014"], track_no: 3, folder: "NFAK", bpm: 60 },
  { song_id: "SNG_023", title: "Aisa Bana Sanwarna Mubarik Tumhen", album_id: "ALB_017", singer_ids: ["ART_014"], track_no: 4, folder: "NFAK", bpm: 72 },
  { song_id: "SNG_024", title: "Halka Halka Saroor", album_id: "ALB_018", singer_ids: ["ART_014"], track_no: 5, folder: "NFAK", bpm: 74 },
  { song_id: "SNG_025", title: "Dil Pe Zakham Khate Hain", album_id: "ALB_019", singer_ids: ["ART_014"], track_no: 6, folder: "NFAK", bpm: 66 },
  { song_id: "SNG_026", title: "Sanson Ki Mala Pe", album_id: "ALB_020", singer_ids: ["ART_014"], track_no: 7, folder: "NFAK", bpm: 70 },
  { song_id: "SNG_027", title: "Tumhen Dillagi Bhool Jani Paregee", album_id: "ALB_015", singer_ids: ["ART_014"], track_no: 8, folder: "NFAK", bpm: 63 },
  { song_id: "SNG_028", title: "Biba Sada Dil Morr De", album_id: "ALB_021", singer_ids: ["ART_014"], track_no: 10, folder: "NFAK", bpm: 88 },
  { song_id: "SNG_029", title: "Na To Caravan Ki Talash Hai", album_id: "ALB_022", singer_ids: ["ART_014"], track_no: 11, folder: "NFAK", bpm: 64 },
  { song_id: "SNG_030", title: "Aisa Banna Sanwarna Mubarik Tumhen", album_id: "ALB_017", singer_ids: ["ART_014"], track_no: 12, folder: "NFAK", bpm: 72 },
  { song_id: "SNG_031", title: "Un Ka Andaz-E-Karam", album_id: "ALB_023", singer_ids: ["ART_014"], track_no: 13, folder: "NFAK", bpm: 67 },
  { song_id: "SNG_032", title: "Husn Walon Se Allah Bachaye", album_id: "ALB_024", singer_ids: ["ART_014"], track_no: 14, folder: "NFAK", bpm: 78 },
  { song_id: "SNG_033", title: "Sat Asmana De Tale", album_id: "ALB_018", singer_ids: ["ART_014"], track_no: 15, folder: "NFAK", bpm: 75 },
  { song_id: "SNG_034", title: "Barsoon Kay Intizar Ka", album_id: "ALB_020", singer_ids: ["ART_014"], track_no: 16, folder: "NFAK", bpm: 70 }
];

function buildSong(raw) {
  const fileMap = raw.folder === "Fuck upp" ? FUCK_UPP_FILES : NFAK_FILES;
  const filename = fileMap[raw.track_no] || `${raw.track_no}. ${raw.title}.mp3`;
  const cover = ALBUM_COVERS[raw.album_id];
  const singerNames = raw.singer_ids.map(id => ARTIST_NAMES[id] || id).join(" & ");
  return {
    id: raw.song_id,
    title: raw.title,
    artist: singerNames,
    album: raw.album_id,
    genre: ALBUM_GENRES[raw.album_id] || "Bollywood",
    bpm: raw.bpm || 90,
    folder: raw.folder,
    cover: cover || baarishCover,
    audio: buildAudioUrl(raw.folder, raw.track_no, filename),
    fallbackAudio: null,
    duration: "4:20",
    lyrics: LYRICS_MAP[raw.title] || [
      `${raw.title} — now playing`,
      "Dil ki baat kaho",
      "Yeh lamha hai khaas",
      "Teri yaad aati hai",
      "Apna samjha hain tujhe..."
    ]
  };
}

export const FUCK_UPP_SONGS = RAW_FUCK_UPP.map(buildSong);
export const NFAK_SONGS = RAW_NFAK.map(buildSong);
export const LOCAL_SONGS_LIST = [...FUCK_UPP_SONGS, ...NFAK_SONGS];
export const LIKED_SONGS = LOCAL_SONGS_LIST;

export const TRENDING_SONGS = [
  FUCK_UPP_SONGS[3],  // Tum Hi Ho
  FUCK_UPP_SONGS[1],  // Aasan Nahin Yahan
  FUCK_UPP_SONGS[6],  // Ae Dil Hai Mushkil
  FUCK_UPP_SONGS[17], // Jeena Jeena
  FUCK_UPP_SONGS[12], // Baarishein
];

export const FEATURED_PLAYLISTS = [
  {
    id: "pl-1",
    title: "Bollywood Romantic",
    description: "Handpicked romantic Bollywood hits",
    count: FUCK_UPP_SONGS.length,
    cover: FUCK_UPP_SONGS[3].cover,
    songs: FUCK_UPP_SONGS
  },
  {
    id: "pl-2",
    title: "NFAK — Sufi & Qawwali",
    description: "Timeless Nusrat Fateh Ali Khan masterpieces",
    count: NFAK_SONGS.length,
    cover: NFAK_SONGS[0].cover,
    songs: NFAK_SONGS
  }
];
