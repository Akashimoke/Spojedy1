<template>
  <nav class="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 transition-all">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Brand mengarah ke Home Page. -->
      <router-link to="/" class="flex items-center gap-3 text-white hover:text-cyan-300 transition-colors">
        <svg class="w-8 h-8 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 14v-4m4 7V7m4 12V5m4 10V9m4 5v-4" />
        </svg>
        <span class="text-2xl font-bold tracking-tight">SpoJeDy</span>
      </router-link>

      <!-- Link desktop untuk navigasi halaman utama. -->
      <div class="hidden md:flex gap-8 font-bold text-sm text-[#b3b3b3]">
        <router-link to="/" class="hover:text-white transition-colors" exact-active-class="text-white">Audio Mix</router-link>
        <router-link to="/music-video" class="hover:text-white transition-colors" active-class="text-white">Music Videos</router-link>
      </div>

      <!-- Data username dan foto profil dibaca dari localStorage. -->
      <router-link to="/profile" class="flex items-center gap-3 bg-black hover:bg-zinc-800 p-1 pr-4 rounded-full transition-colors border border-transparent hover:border-zinc-700">
        <img :src="fotoProfil || 'https://via.placeholder.com/150'" alt="Avatar" class="w-8 h-8 rounded-full object-cover" />
        <span class="font-bold text-sm text-white hidden sm:block">{{ namaUser }}</span>
      </router-link>

    </div>
    <!-- Link mobile tetap menampilkan tiga halaman sesuai requirement soal. -->
    <div class="md:hidden max-w-7xl mx-auto px-6 pb-4 flex gap-5 font-bold text-xs text-[#b3b3b3]">
      <router-link to="/" class="hover:text-white transition-colors" exact-active-class="text-white">Audio Mix</router-link>
      <router-link to="/music-video" class="hover:text-white transition-colors" active-class="text-white">Music Videos</router-link>
      <router-link to="/profile" class="hover:text-white transition-colors" active-class="text-white">Profile</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const namaUser = ref('JedyUser')
const fotoProfil = ref('')

// Mengambil data terupdate secara dinamis dari LocalStorage
const sinkronisasiDataNav = () => {
  namaUser.value = localStorage.getItem('username') || 'JedyUser'
  fotoProfil.value = localStorage.getItem('profileImage') || ''
}

onMounted(() => {
  sinkronisasiDataNav()
  // Menangkap sinyal (event) apabila ada perubahan data dari ProfileView.vue
  window.addEventListener('profile-update-event', sinkronisasiDataNav)
})

onUnmounted(() => {
  window.removeEventListener('profile-update-event', sinkronisasiDataNav)
})
</script>
