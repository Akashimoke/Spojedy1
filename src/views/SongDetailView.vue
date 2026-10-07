<template>
  <div
    v-if="laguAktif"
    class="relative min-h-[calc(100vh-73px)] bg-[#050505] text-white overflow-hidden selection:bg-white selection:text-black"
    :style="{ '--song-accent': laguAktif.accent || '#22c55e' }"
  >
    <img
      :src="laguAktif.coverUrl"
      alt=""
      class="absolute inset-0 h-full w-full object-cover opacity-15 blur-3xl scale-110"
    />
    <div class="absolute inset-0 bg-[#050505]/85"></div>

    <div class="relative z-10 mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-6xl flex-col justify-center gap-10 px-6 py-10 lg:flex-row lg:items-center lg:px-12">
      <button
        class="group relative mx-auto aspect-square w-64 shrink-0 cursor-zoom-in overflow-hidden rounded-lg border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:w-80 lg:mx-0 lg:w-96"
        @click="bukaFullscreen"
      >
        <img
          :src="laguAktif.coverUrl"
          :alt="laguAktif.title"
          class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span class="absolute inset-x-4 bottom-4 rounded-md bg-black/70 px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          Expand Cover
        </span>
      </button>

      <div class="flex w-full flex-1 flex-col justify-center">
        <div class="mb-8">
          <div class="mb-4 flex flex-wrap items-center gap-3">
            <span class="rounded-md bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--song-accent)]">
              {{ laguAktif.mood }} Mood
            </span>
            <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
              {{ laguAktif.genre }} / {{ laguAktif.year }}
            </span>
          </div>

          <div class="mb-4 flex h-4 items-end gap-1.5">
            <template v-if="lagiMain">
              <div class="h-full w-1 animate-[bounce_1s_infinite] bg-[var(--song-accent)]"></div>
              <div class="h-2/3 w-1 animate-[bounce_1.2s_infinite] bg-[var(--song-accent)]"></div>
              <div class="h-full w-1 animate-[bounce_0.8s_infinite] bg-[var(--song-accent)]"></div>
              <div class="h-1/2 w-1 animate-[bounce_1.5s_infinite] bg-[var(--song-accent)]"></div>
            </template>
            <span v-else class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Paused</span>
          </div>

          <h1 class="text-4xl font-black tracking-tight text-gray-100 md:text-5xl lg:text-6xl">
            {{ laguAktif.title }}
          </h1>
          <p class="mt-2 text-lg font-medium text-gray-400">{{ laguAktif.artist }}</p>
        </div>

        <!-- Elemen tersembunyi ini dipakai YouTube IFrame API sebagai audio source. -->
        <div ref="youtubePlayerEl" class="h-0 w-0 overflow-hidden opacity-0 pointer-events-none"></div>

        <!-- Progress bar disinkronkan dengan waktu video YouTube yang sedang berjalan. -->
        <div class="mb-8 flex items-center gap-4">
          <span class="w-10 text-xs font-mono text-gray-500">{{ formatWaktu(waktuSkrg) }}</span>
          <input
            v-model="waktuSeek"
            type="range"
            min="0"
            :max="durasiTotal || 100"
            step="1"
            class="player-range h-1 flex-1 cursor-pointer appearance-none rounded-full bg-gray-800"
            @input="mulaiSeek"
            @change="selesaiSeek"
          />
          <span class="w-10 text-right text-xs font-mono text-gray-500">{{ formatWaktu(durasiTotal) }}</span>
        </div>

        <!-- Kontrol audio custom: previous, play/pause, next, shuffle, dan volume. -->
        <div class="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-5">
            <button
              class="text-gray-500 transition-colors hover:text-white"
              aria-label="Previous song"
              @click="laguSebelumnya"
            >
              <svg class="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
              </svg>
            </button>

            <button
              class="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black transition-all hover:scale-105"
              aria-label="Play or pause"
              @click="mainkanPause"
            >
              <svg v-if="!lagiMain" class="ml-1 h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <svg v-else class="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </button>

            <button
              class="text-gray-500 transition-colors hover:text-white"
              aria-label="Next song"
              @click="keLaguSelanjutnya"
            >
              <svg class="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="m6 18 8.5-6L6 6v12zM16 6v12h2V6z" />
              </svg>
            </button>

            <button
              class="rounded-full border border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-300 transition hover:border-[var(--song-accent)] hover:text-white"
              @click="acakLagu"
            >
              Shuffle
            </button>
          </div>

          <div class="flex items-center gap-3 sm:w-36">
            <svg class="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
            </svg>
            <input
              v-model="volumeLevel"
              type="range"
              min="0"
              max="1"
              step="0.05"
              class="player-range h-1 w-full cursor-pointer appearance-none rounded-full bg-gray-800"
              @input="aturVolume"
            />
          </div>
        </div>

        <!-- Queue sederhana untuk menampilkan lagu berikutnya dan tombol menuju MV. -->
        <div class="border-t border-white/10 pt-6">
          <div class="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <button
              v-if="laguBerikutnya"
              class="group grid w-full grid-cols-[52px_1fr] items-center gap-3 text-left"
              @click="keLaguSelanjutnya"
            >
              <img
                :src="laguBerikutnya.coverUrl"
                :alt="laguBerikutnya.title"
                class="h-14 w-14 rounded object-cover"
              />
              <span class="min-w-0">
                <span class="block truncate text-sm font-bold text-gray-200 group-hover:text-white">
                  {{ laguBerikutnya.title }}
                </span>
                <span class="block truncate text-xs text-gray-500">
                  {{ laguBerikutnya.artist }}
                </span>
              </span>
            </button>

            <button
              class="mt-4 w-full rounded-md border border-white/10 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] transition hover:border-white hover:bg-white hover:text-black"
              @click="$router.push(`/music-video/${laguAktif.videoId}`)"
            >
              Watch Video
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal fullscreen cover dengan fitur zoom in dan zoom out. -->
    <div v-if="tampilFull" class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] p-4">
      <div class="absolute right-6 top-6 z-50 flex items-center gap-3">
        <button class="text-xl font-bold text-gray-400 transition hover:text-white" @click="zoomOut">-</button>
        <button class="text-xl font-bold text-gray-400 transition hover:text-white" @click="zoomIn">+</button>
        <button
          class="ml-3 rounded-full border border-gray-700 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 transition hover:border-white hover:text-white"
          @click="tutupFullscreen"
        >
          Close
        </button>
      </div>
      <div class="flex h-full w-full items-center justify-center overflow-auto">
        <img
          :src="laguAktif.coverUrl"
          :alt="laguAktif.title"
          :style="{ transform: `scale(${skalaZoom})` }"
          class="max-h-[85vh] rounded-md object-contain shadow-2xl transition-transform duration-200"
        />
      </div>
    </div>
  </div>

  <div v-else class="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center bg-[#050505] px-6 text-center text-white">
    <h1 class="text-2xl font-black">Lagu tidak ditemukan</h1>
    <button
      class="mt-4 rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-black"
      @click="$router.push('/')"
    >
      Kembali ke Home
    </button>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { songList } from '../data/songs.js'

const route = useRoute()
const router = useRouter()

const laguAktif = ref(null)
const youtubePlayerEl = ref(null)
const youtubePlayer = ref(null)
const playerSiap = ref(false)
const lagiMain = ref(false)
const volumeLevel = ref(1)
const tampilFull = ref(false)
const skalaZoom = ref(1)

const waktuSkrg = ref(0)
const durasiTotal = ref(0)
const waktuSeek = ref(0)
const sedangSeek = ref(false)
let intervalWaktu = null

// Menghitung lagu berikutnya secara melingkar dari data lagu.
const laguBerikutnya = computed(() => {
  if (!laguAktif.value) return null
  const i = songList.findIndex((x) => x.id === laguAktif.value.id)
  return songList[(i + 1) % songList.length]
})

// Mengambil data lagu berdasarkan parameter route.
const ambilDataLagu = (urlId) => {
  laguAktif.value = songList.find((x) => x.id == urlId) || null
  lagiMain.value = false
  waktuSkrg.value = 0
  waktuSeek.value = 0
  durasiTotal.value = 0

  if (youtubePlayer.value && playerSiap.value && laguAktif.value?.youtubeId) {
    youtubePlayer.value.cueVideoById(laguAktif.value.youtubeId)
  }
}

// Memuat script YouTube IFrame API satu kali sebelum player dibuat.
const muatYouTubeApi = () =>
  new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve(window.YT)
      return
    }

    const callbackLama = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (typeof callbackLama === 'function') callbackLama()
      resolve(window.YT)
    }

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(script)
    }
  })

// Membuat player YouTube tersembunyi agar kontrol audio dapat dibuat custom.
const buatPlayerYouTube = async () => {
  if (!laguAktif.value?.youtubeId || !youtubePlayerEl.value) return
  await muatYouTubeApi()

  youtubePlayer.value = new window.YT.Player(youtubePlayerEl.value, {
    width: '200',
    height: '200',
    videoId: laguAktif.value.youtubeId,
    playerVars: {
      controls: 0,
      disablekb: 1,
      playsinline: 1,
      rel: 0,
    },
    events: {
      onReady: (event) => {
        playerSiap.value = true
        event.target.setVolume(Math.round(volumeLevel.value * 100))
        durasiTotal.value = event.target.getDuration() || 0
      },
      onStateChange: (event) => {
        lagiMain.value = event.data === window.YT.PlayerState.PLAYING

        if (event.data === window.YT.PlayerState.ENDED) {
          keLaguSelanjutnya()
        }

        if (event.target?.getDuration) {
          durasiTotal.value = event.target.getDuration() || durasiTotal.value
        }
      },
    },
  })
}

// Menyalin currentTime dan duration dari YouTube player ke UI progress bar.
const sinkronkanWaktu = () => {
  if (!youtubePlayer.value || !playerSiap.value || sedangSeek.value) return

  const waktu = youtubePlayer.value.getCurrentTime?.() || 0
  const durasi = youtubePlayer.value.getDuration?.() || 0
  waktuSkrg.value = waktu
  waktuSeek.value = waktu
  durasiTotal.value = durasi || durasiTotal.value
}

onMounted(async () => {
  ambilDataLagu(route.params.id)
  await nextTick()
  await buatPlayerYouTube()
  intervalWaktu = window.setInterval(sinkronkanWaktu, 500)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  if (intervalWaktu) window.clearInterval(intervalWaktu)
  if (youtubePlayer.value?.destroy) youtubePlayer.value.destroy()
})

watch(() => route.params.id, (newVal) => ambilDataLagu(newVal))

// Toggle play/pause menggunakan method dari YouTube IFrame API.
const mainkanPause = async () => {
  if (!youtubePlayer.value || !playerSiap.value) return

  if (lagiMain.value) {
    youtubePlayer.value.pauseVideo()
    lagiMain.value = false
    return
  }

  youtubePlayer.value.playVideo()
}

// Volume UI bernilai 0-1, sedangkan YouTube API memakai 0-100.
const aturVolume = () => {
  if (youtubePlayer.value && playerSiap.value) {
    youtubePlayer.value.setVolume(Math.round(volumeLevel.value * 100))
  }
}

// Navigasi lagu memanfaatkan route agar halaman detail ikut ter-update.
const keLaguSelanjutnya = () => {
  if (laguBerikutnya.value) router.push(`/song/${laguBerikutnya.value.id}`)
}

const laguSebelumnya = () => {
  if (!laguAktif.value) return
  const i = songList.findIndex((x) => x.id === laguAktif.value.id)
  router.push(`/song/${songList[(i - 1 + songList.length) % songList.length].id}`)
}

const acakLagu = () => {
  if (!laguAktif.value || songList.length < 2) return
  const pilihan = songList.filter((song) => song.id !== laguAktif.value.id)
  const laguAcak = pilihan[Math.floor(Math.random() * pilihan.length)]
  router.push(`/song/${laguAcak.id}`)
}

const mulaiSeek = () => {
  sedangSeek.value = true
}

// Saat user selesai menggeser progress bar, player berpindah ke detik yang dipilih.
const selesaiSeek = () => {
  if (youtubePlayer.value && playerSiap.value) {
    youtubePlayer.value.seekTo(Number(waktuSeek.value), true)
  }
  waktuSkrg.value = waktuSeek.value
  sedangSeek.value = false
}

const formatWaktu = (detik) => {
  if (!detik || isNaN(detik)) return '0:00'
  const m = Math.floor(detik / 60)
  const s = Math.floor(detik % 60)
  return `${m}:${s < 10 ? '0' + s : s}`
}

const bukaFullscreen = () => {
  tampilFull.value = true
  skalaZoom.value = 1
  document.body.style.overflow = 'hidden'
}

const tutupFullscreen = () => {
  tampilFull.value = false
  skalaZoom.value = 1
  document.body.style.overflow = ''
}

const zoomIn = () => {
  skalaZoom.value += 0.2
}

const zoomOut = () => {
  if (skalaZoom.value > 0.5) skalaZoom.value -= 0.2
}
</script>

<style scoped>
.player-range {
  accent-color: var(--song-accent);
}
</style>
