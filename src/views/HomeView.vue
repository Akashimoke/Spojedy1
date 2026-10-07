<template>
  <div class="max-w-7xl mx-auto px-6 pt-8 pb-12 flex flex-col min-h-[calc(100vh-73px)]">
    <!-- Bagian highlight menampilkan lagu pilihan agar halaman Home tidak hanya berupa grid. -->
    <section
      v-if="featuredSong"
      class="mb-10 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 items-end border-b border-zinc-200 dark:border-white/10 pb-8"
    >
      <div>
        <h1 class="text-4xl md:text-5xl font-black tracking-tight text-zinc-950 dark:text-white">
          SpoJeDy
        </h1>

        <div class="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wider">
          <span class="px-3 py-2 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-black">
            {{ songList.length }} Tracks
          </span>
          <span class="px-3 py-2 rounded-md border border-zinc-300 text-zinc-700 dark:border-white/10 dark:text-zinc-300">
            {{ totalArtists }} Artists
          </span>
          <span class="px-3 py-2 rounded-md border border-zinc-300 text-zinc-700 dark:border-white/10 dark:text-zinc-300">
            {{ moods.length - 1 }} Moods
          </span>
        </div>
      </div>

      <div
        class="group cursor-pointer grid grid-cols-[112px_1fr] sm:grid-cols-[148px_1fr] gap-4 items-center rounded-lg border border-zinc-200 bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-zinc-400 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/30"
        :style="{ '--featured-accent': featuredSong.accent }"
        @click="$router.push(`/song/${featuredSong.id}`)"
      >
        <img
          :src="featuredSong.coverUrl"
          :alt="featuredSong.title"
          class="aspect-square w-full rounded-md object-cover shadow-md"
        />
        <div class="min-w-0">
          <h2 class="truncate text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
            {{ featuredSong.title }}
          </h2>
          <p class="mt-1 truncate text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {{ featuredSong.artist }}
          </p>
          <div class="mt-4 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
            <span class="rounded border border-zinc-200 px-2 py-1 dark:border-white/10">{{ featuredSong.mood }}</span>
            <span class="rounded border border-zinc-200 px-2 py-1 dark:border-white/10">{{ featuredSong.genre }}</span>
            <span class="rounded border border-zinc-200 px-2 py-1 dark:border-white/10">{{ featuredSong.year }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Area pencarian dan filter mood untuk mempercepat user menemukan lagu. -->
    <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 class="text-2xl font-semibold text-zinc-900 dark:text-white">Discover Music</h2>
      </div>

      <div class="flex w-full flex-col gap-3 md:w-auto md:items-end">
        <div class="relative w-full md:w-80">
          <svg class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35m1.1-5.15a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z" />
          </svg>
          <input
            v-model="keyword"
            type="search"
            placeholder="Cari judul, artis, atau genre"
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

    <!-- Grid lagu diisi dari hasil filter keyword dan mood. -->
    <div
      v-if="filteredSongs.length"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-8 flex-grow"
    >
      <div
        v-for="item in filteredSongs"
        :key="item.id"
        @click="$router.push(`/song/${item.id}`)"
        class="group cursor-pointer flex flex-col"
        :style="{ '--song-accent': item.accent }"
      >
        <div class="relative w-full aspect-square rounded-md overflow-hidden bg-zinc-200 dark:bg-zinc-800 mb-3 border border-zinc-300 dark:border-zinc-700/50 group-hover:border-zinc-500 transition-all duration-300 shadow-sm">
          <img
            :src="item.coverUrl"
            :alt="item.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
            <svg class="w-10 h-10 text-white opacity-90" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span class="absolute left-2 top-2 rounded bg-black/70 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {{ item.mood }}
          </span>
        </div>

        <h3 class="font-medium text-sm text-zinc-800 dark:text-gray-100 truncate group-hover:text-[var(--song-accent)] transition-colors">
          {{ item.title }}
        </h3>
        <p class="text-xs text-zinc-500 dark:text-gray-500 truncate mt-0.5">{{ item.artist }}</p>
        <p class="mt-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
          {{ item.genre }} / {{ item.year }}
        </p>
      </div>
    </div>

    <div
      v-else
      class="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 text-center dark:border-white/10"
    >
      <h3 class="text-lg font-bold text-zinc-900 dark:text-white">Lagu tidak ditemukan</h3>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { songList } from '../data/songs.js'

const keyword = ref('')
const activeMood = ref('All')

// Daftar mood dibuat otomatis dari data lagu supaya tidak perlu ditulis manual.
const moods = computed(() => [
  'All',
  ...new Set(songList.map((song) => song.mood)),
])

// Lagu unggulan yang tampil di bagian atas Home.
const featuredSong = computed(() => songList[1])
const totalArtists = computed(() => new Set(songList.map((song) => song.artist)).size)

// Menggabungkan filter mood dan pencarian teks dalam satu computed list.
const filteredSongs = computed(() => {
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
