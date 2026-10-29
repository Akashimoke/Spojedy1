SpoJeDy
A Spotify-style music player web app built with Vue 3. Browse and search songs, filter them by mood, play tracks, watch music videos, and switch between light and dark themes.

Live demo: https://spojedy1.vercel.app

University assignment, built to practice single-page app development with Vue 3, Vue Router, and Tailwind CSS.

Features
Discover music: browse the song list on the home page, search by title, artist, or genre, and filter by mood.
Song detail page: cover art, artist, year, genre, and duration, with play/pause, previous/next, shuffle, and volume controls.
Music videos: a separate music video gallery with an embedded YouTube player on each video's detail page.
Profile settings: switch between light and dark themes. The choice is saved in localStorage, so it persists after a page reload.
Not-found handling: song and video detail pages show a friendly message when the ID doesn't exist.
Tech Stack
Tool	Purpose
Vue 3	UI framework (Single File Components)
Vue Router	Client-side routing
Tailwind CSS	Styling and dark mode
Vite	Dev server and build tool
YouTube embed	Audio and music video playback
Pages
Route	Page
/	Home: song list with search and mood filter
/song/:id	Song detail and player
/music-video	Music video gallery
/music-video/:id	Music video detail
/profile	Profile and theme settings
Project Structure
src/
├── data/songs.js      # Song and music video data
├── router/index.js    # Route definitions
├── components/        # Shared components (Navbar)
├── views/             # One file per page
├── App.vue            # Root layout
└── main.js            # App entry point
Getting Started
Requires Node.js 20.19+ or 22.12+.

npm install      # install dependencies
npm run dev      # start the dev server
npm run build    # build for production
npm run preview  # preview the production build
Author
Muhammad Ridho Fathi Fauzan: Portfolio · GitHub

Credits
Song data is sample content for learning purposes. All music, cover art, and videos belong to their respective artists and labels, and playback uses the official YouTube embeds.
