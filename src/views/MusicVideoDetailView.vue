<template>
  <div
    class="relative min-h-[calc(100vh-73px)] p-6 transition-colors duration-300 lg:p-12"
    :style="{ '--video-accent': videoAktif?.accent || '#22c55e' }"
  >
    <div
      v-if="videoAktif"
      class="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12"
    >
      <div class="flex w-full flex-col lg:flex-1">
        <div class="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-black shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:border dark:border-white/10">
          <!-- Iframe YouTube menampilkan MV sesuai lagu yang dipilih. -->
          <iframe
            ref="playerVideo"
            :src="`${videoAktif.videoUrl}?rel=0`"
            :title="`${videoAktif.title} - ${videoAktif.artist}`"
            class="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <aside class="flex w-full shrink-0 flex-col justify-between gap-8 text-zinc-900 dark:text-white lg:w-80">
        <div>
          <h1 class="truncate text-2xl font-black tracking-tight">
            {{ videoAktif.title }}
          </h1>
          <p class="mb-5 mt-2 text-sm font-medium text-zinc-500 dark:text-gray-400">
            {{ videoAktif.artist }}
          </p>

          <div class="mb-5 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-300">
            <span class="rounded border border-zinc-200 px-2 py-1 dark:border-white/10">{{ videoAktif.mood }}</span>
            <span class="rounded border border-zinc-200 px-2 py-1 dark:border-white/10">{{ videoAktif.genre }}</span>
            <span class="rounded border border-zinc-200 px-2 py-1 dark:border-white/10">{{ videoAktif.year }}</span>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <!-- Tombol ini menghubungkan halaman MV kembali ke detail audio. -->
          <button
            class="w-full rounded-lg border border-zinc-300 py-3 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-zinc-900 hover:text-white dark:border-white/10 dark:hover:bg-white dark:hover:text-black"
            @click="$router.push(`/song/${videoAktif.id}`)"
          >
            Beralih ke Audio
          </button>

          <!-- Kontrol next dan previous memenuhi requirement navigasi video. -->
          <div class="grid grid-cols-2 gap-3">
            <button
              class="rounded-lg border border-zinc-300 py-3 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-zinc-900 hover:text-white dark:border-white/10 dark:hover:bg-white dark:hover:text-black"
              @click="keVideoSebelumnya"
            >
              Previous
            </button>
            <button
              class="rounded-lg border border-zinc-300 py-3 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-zinc-900 hover:text-white dark:border-white/10 dark:hover:bg-white dark:hover:text-black"
              @click="keVideoSelanjutnya"
            >
              Next
            </button>
          </div>

          <!-- Fullscreen dipanggil dari element iframe. -->
          <button
            class="w-full rounded-lg border border-zinc-300 py-3 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-zinc-900 hover:text-white dark:border-white/10 dark:hover:bg-white dark:hover:text-black"
            @click="fullscreenVideo"
          >
            Fullscreen
          </button>

          <button
            v-if="videoBerikutnya"
            class="group rounded-lg border border-zinc-200 bg-zinc-100 p-3 text-left transition-colors hover:border-[var(--video-accent)] dark:border-white/5 dark:bg-white/[0.02]"
            @click="keVideoSelanjutnya"
          >
            <p class="truncate text-xs font-semibold transition-colors group-hover:text-[var(--video-accent)]">
              {{ videoBerikutnya.title }}
            </p>
          </button>
        </div>
      </aside>
    </div>

    <div
      v-else
      class="flex h-[60vh] flex-col items-center justify-center text-center text-zinc-900 dark:text-white"
    >
      <h2 class="text-2xl font-bold mb-2">Video tidak ditemukan</h2>
      <button
        class="mt-4 rounded-lg bg-zinc-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-transform hover:scale-105 dark:bg-white dark:text-black"
        @click="$router.push('/music-video')"
      >
        Kembali
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { songList } from '../data/songs.js'

const route = useRoute()
const router = useRouter()
const videoAktif = ref(null)
const playerVideo = ref(null)

// Video berikutnya dihitung melingkar dari array songList.
const videoBerikutnya = computed(() => {
  if (!videoAktif.value) return null
  const i = songList.findIndex((x) => x.videoId == videoAktif.value.videoId)
  return songList[(i + 1) % songList.length]
})

// Video sebelumnya juga melingkar agar item pertama bisa kembali ke item terakhir.
const videoSebelumnya = computed(() => {
  if (!videoAktif.value) return null
  const i = songList.findIndex((x) => x.videoId == videoAktif.value.videoId)
  return songList[(i - 1 + songList.length) % songList.length]
})

// Mencari video berdasarkan parameter URL.
const muatVideo = (urlParam) => {
  if (!urlParam) return
  const idDicari = Number(urlParam)
  videoAktif.value = songList.find((x) => x.videoId === idDicari || x.id === idDicari) || null
}

onMounted(() => {
  muatVideo(route.params.videoId || route.params.id)
})

watch(
  () => route.params,
  (newParams) => {
    muatVideo(newParams.videoId || newParams.id)
  },
  { deep: true },
)

// Mengganti route agar data video detail ikut berubah.
const keVideoSelanjutnya = () => {
  if (videoBerikutnya.value) {
    router.push(`/music-video/${videoBerikutnya.value.videoId}`)
  }
}

const keVideoSebelumnya = () => {
  if (videoSebelumnya.value) {
    router.push(`/music-video/${videoSebelumnya.value.videoId}`)
  }
}

// Browser akan menampilkan iframe YouTube dalam mode fullscreen jika didukung.
const fullscreenVideo = () => {
  if (playerVideo.value?.requestFullscreen) {
    playerVideo.value.requestFullscreen()
  }
}
</script>
