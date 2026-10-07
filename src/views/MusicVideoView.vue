<template>
  <div class="max-w-7xl mx-auto px-6 pt-10 pb-12 flex flex-col min-h-[calc(100vh-73px)]">
    <!-- Header halaman video berisi pencarian dan filter mood. -->
    <div class="mb-8 flex flex-col gap-4 border-b border-zinc-200 pb-5 dark:border-white/10 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 class="text-3xl font-black tracking-tight text-zinc-950 dark:text-white">Music Videos</h1>
      </div>

      <div class="flex w-full flex-col gap-3 md:w-auto md:items-end">
        <div class="relative w-full md:w-80">
          <svg class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35m1.1-5.15a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z" />
          </svg>
          <input
            v-model="keyword"
            type="search"
            placeholder="Cari video atau artis"
            class="w-full rounded-lg border border-zinc-300 bg-white py-3 pl-10 pr-4 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:focus:border-white"
          />
        </div>

        <div class="flex max-w-full gap-2 overflow-x-auto pb-1">
          <button
            v-for="mood in moods"
            :key="mood"
            @click="activeMood = mood"
            :class="activeMood === mood
              ? 'bg-zinc-900 text-white dark:bg-white dark:text-black'
              : 'border border-zinc-300 text-zinc-600 hover:border-zinc-500 dark:border-white/10 dark:text-zinc-400 dark:hover:border-white/30'"
            class="shrink-0 rounded-md px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition"
          >
            {{ mood }}
          </button>
        </div>
      </div>
    </div>

    <!-- Daftar music video memakai data yang sama dengan daftar lagu. -->
    <div
      v-if="filteredVideos.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 flex-grow"
    >
      <div
        v-for="mv in filteredVideos"
        :key="mv.videoId"
        @click="$router.push(`/music-video/${mv.videoId}`)"
        class="group cursor-pointer flex flex-col"
        :style="{ '--video-accent': mv.accent }"
      >
        <div class="relative w-full aspect-video rounded-md overflow-hidden bg-zinc-800 mb-3 border border-zinc-300 dark:border-zinc-700/50 group-hover:border-zinc-500 transition-all duration-300 shadow-sm">
          <img
            :src="mv.videoCoverUrl"
            :alt="mv.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <span class="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider backdrop-blur-sm">
            M/V
          </span>
          <span class="absolute left-2 top-2 rounded bg-black/70 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {{ mv.mood }}
          </span>

          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
            <svg class="w-12 h-12 text-white opacity-90" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        <h3 class="font-medium text-sm text-zinc-800 dark:text-gray-100 truncate group-hover:text-[var(--video-accent)] transition-colors">
          {{ mv.title }}
        </h3>
        <p class="text-xs text-zinc-500 dark:text-gray-500 truncate mt-0.5">{{ mv.artist }}</p>
        <p class="mt-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
          {{ mv.genre }} / {{ mv.year }}
        </p>
      </div>
    </div>

    <div
      v-else
      class="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 text-center dark:border-white/10"
    >
      <h3 class="text-lg font-bold text-zinc-900 dark:text-white">Video tidak ditemukan</h3>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { songList } from '../data/songs.js'

const keyword = ref('')
const activeMood = ref('All')

// Mood diambil dari data lagu agar filter video selalu sinkron dengan Home.
const moods = computed(() => [
  'All',
  ...new Set(songList.map((song) => song.mood)),
])

// Filter video berdasarkan keyword dan mood yang dipilih user.
const filteredVideos = computed(() => {
  const query = keyword.value.trim().toLowerCase()

  return songList.filter((song) => {
    const cocokMood = activeMood.value === 'All' || song.mood === activeMood.value
    const cocokKeyword = !query || [
      song.title,
      song.artist,
      song.genre,
      song.mood,
      song.year,
    ].join(' ').toLowerCase().includes(query)

    return cocokMood && cocokKeyword
  })
})
</script>
