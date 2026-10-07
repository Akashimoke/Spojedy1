import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SongDetailView from '../views/SongDetailView.vue'
import MusicVideoView from '../views/MusicVideoView.vue'
import MusicVideoDetailView from '../views/MusicVideoDetailView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // Setiap route merepresentasikan halaman utama yang diminta pada soal.
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/song/:id', name: 'song-detail', component: SongDetailView },
    { path: '/music-video', name: 'music-video', component: MusicVideoView },
    { path: '/music-video/:id', name: 'music-video-detail', component: MusicVideoDetailView },
    { path: '/profile', name: 'profile', component: ProfileView }
  ]
})

export default router
