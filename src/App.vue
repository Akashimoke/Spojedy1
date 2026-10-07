<template>
  <div 
    :class="isDarkMode ? 'dark bg-[#050505] text-white' : 'bg-zinc-100 text-zinc-900'"
    class="min-h-screen transition-colors duration-300 font-sans selection:bg-cyan-300 selection:text-black"
  >
    <!-- Navbar selalu muncul agar user bisa berpindah halaman dari semua view. -->
    <NavBar />
    <main>
      <router-view />
    </main>
  </div>
  
</template>

<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from './components/Navbar.vue'

// State global untuk menentukan apakah aplikasi sedang memakai dark mode.
const isDarkMode = ref(true)

const cekStatusTemaSistem = () => {
  const temaAktif = localStorage.getItem('themePreference') || 'dark'
  isDarkMode.value = (temaAktif === 'dark')
}

onMounted(() => {
  cekStatusTemaSistem()
  // ProfileView mengirim event ini saat user mengganti theme preference.
  window.addEventListener('theme-change-event', cekStatusTemaSistem)
})

onUnmounted(() => {
  window.removeEventListener('theme-change-event', cekStatusTemaSistem)
})
</script> 
