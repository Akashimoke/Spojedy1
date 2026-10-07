// src/data/songs.js

// Helper untuk membuat URL embed YouTube dari video id.
const youtubeEmbedUrl = (videoId) => `https://www.youtube.com/embed/${videoId}`;

// Dummy data lagu dan music video yang digunakan oleh Home, Song Detail, dan Music Video.
export const songList = [
  {
    id: 1,
    title: "Losing Us.",
    artist: "Raissa Anggiani",
    year: "2021",
    mood: "Melancholy",
    genre: "Pop",
    durationLabel: "3:57",
    accent: "#f9a8d4",
    youtubeId: "vJ4OXsMSwMU",
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/e5/5c/f2/e55cf22c-ef75-6218-d89f-cd572e19c213/22UMGIM50978.rgb.jpg/600x600bb.jpg",
    audioUrl: youtubeEmbedUrl("vJ4OXsMSwMU"),
    videoCoverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/e5/5c/f2/e55cf22c-ef75-6218-d89f-cd572e19c213/22UMGIM50978.rgb.jpg/600x600bb.jpg",
    videoUrl: youtubeEmbedUrl("vJ4OXsMSwMU"),
    videoId: 1,
  },
  {
    id: 2,
    title: "if u could see me cryin' in my room",
    artist: "Arash Buana & Raissa Anggiani",
    year: "2020",
    mood: "Sad",
    genre: "Indie Pop",
    durationLabel: "4:17",
    accent: "#93c5fd",
    youtubeId: "OsPiO2JTpVg",
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/53/91/f3/5391f3ff-414d-f617-2378-84381af213a5/22UMGIM50627.rgb.jpg/600x600bb.jpg",
    audioUrl: youtubeEmbedUrl("OsPiO2JTpVg"),
    videoCoverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/53/91/f3/5391f3ff-414d-f617-2378-84381af213a5/22UMGIM50627.rgb.jpg/600x600bb.jpg",
    videoUrl: youtubeEmbedUrl("OsPiO2JTpVg"),
    videoId: 2,
  },
  {
    id: 3,
    title: "drunk text",
    artist: "Henry Moodie",
    year: "2023",
    mood: "Bittersweet",
    genre: "Pop",
    durationLabel: "3:08",
    accent: "#86efac",
    youtubeId: "OqEc_169ywY",
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/61/3d/a6/613da60e-5b3d-7305-19db-ed79f5aa0b05/196589768643.jpg/600x600bb.jpg",
    audioUrl: youtubeEmbedUrl("OqEc_169ywY"),
    videoCoverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/61/3d/a6/613da60e-5b3d-7305-19db-ed79f5aa0b05/196589768643.jpg/600x600bb.jpg",
    videoUrl: youtubeEmbedUrl("OqEc_169ywY"),
    videoId: 3,
  },
  {
    id: 4,
    title: "Car's Outside",
    artist: "James Arthur",
    year: "2019",
    mood: "Longing",
    genre: "Pop",
    durationLabel: "4:09",
    accent: "#c4b5fd",
    youtubeId: "v27COkZT4GY",
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/2b/3e/86/2b3e86e6-c21f-329b-a629-ca53c070ebd6/886446678108.jpg/600x600bb.jpg",
    audioUrl: youtubeEmbedUrl("v27COkZT4GY"),
    videoCoverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/2b/3e/86/2b3e86e6-c21f-329b-a629-ca53c070ebd6/886446678108.jpg/600x600bb.jpg",
    videoUrl: youtubeEmbedUrl("v27COkZT4GY"),
    videoId: 4,
  },
  {
    id: 5,
    title: "Location Unknown [Brooklyn Session]",
    artist: "HONNE feat. BEKA",
    year: "2019",
    mood: "Soulful",
    genre: "Alternative R&B",
    durationLabel: "5:29",
    accent: "#facc15",
    youtubeId: "btIQvYcLNoI",
    coverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/b4/25/6b/b4256bbc-f2d9-cb31-0e8e-7df2de28bf87/190295214296.jpg/600x600bb.jpg",
    audioUrl: youtubeEmbedUrl("btIQvYcLNoI"),
    videoCoverUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/b4/25/6b/b4256bbc-f2d9-cb31-0e8e-7df2de28bf87/190295214296.jpg/600x600bb.jpg",
    videoUrl: youtubeEmbedUrl("btIQvYcLNoI"),
    videoId: 5,
  },
];
