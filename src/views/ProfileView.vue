<template>
  <div
    :class="themePreference === 'dark' ? 'text-white' : 'text-zinc-900'"
    class="max-w-4xl mx-auto px-6 pt-10 pb-12 flex flex-col min-h-[calc(100vh-73px)] transition-colors duration-300"
  >
    <div
      :class="
        themePreference === 'dark' ? 'border-white/10' : 'border-zinc-300'
      "
      class="mb-10 border-b pb-4"
    >
      <h1 class="text-2xl font-semibold">Profile Settings</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
      <div
        :class="
          themePreference === 'dark'
            ? 'bg-zinc-900/50 border-white/5'
            : 'bg-white border-zinc-200 shadow-sm'
        "
        class="flex flex-col items-center gap-4 p-6 rounded-xl border transition-colors"
      >
        <div
          :class="
            themePreference === 'dark'
              ? 'bg-zinc-800 border-zinc-700'
              : 'bg-zinc-100 border-zinc-300'
          "
          class="relative w-32 h-32 rounded-full overflow-hidden flex items-center justify-center shadow-md"
        >
          <!-- Preview avatar menampilkan gambar tersimpan atau ikon default. -->
          <img
            v-if="profileImage && !sedangMemuatGambar"
            :src="profileImage"
            class="w-full h-full object-cover"
          />
          <svg
            v-if="!profileImage && !sedangMemuatGambar"
            class="w-16 h-16 text-zinc-400 dark:text-zinc-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
          <div
            v-if="sedangMemuatGambar"
            class="absolute inset-0 bg-zinc-900 flex flex-col items-center justify-center gap-2"
          >
            <div
              class="w-6 h-6 border-2 border-cyan-300 border-t-transparent rounded-full animate-spin"
            ></div>
          </div>
        </div>

        <!-- File input disembunyikan agar tombol upload bisa distyling. -->
        <label
          class="cursor-pointer text-xs font-semibold uppercase tracking-wider text-cyan-700 bg-cyan-300/10 hover:bg-cyan-300/20 px-4 py-2 rounded-lg transition-colors border border-cyan-300/30"
        >
          Upload Photo
          <input
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleUploadFoto"
          />
        </label>
      </div>

      <div
        :class="
          themePreference === 'dark'
            ? 'bg-zinc-900/30 border-white/5'
            : 'bg-white border-zinc-200 shadow-sm'
        "
        class="md:col-span-2 flex flex-col gap-6 p-6 rounded-xl border transition-colors"
      >
        <div class="flex flex-col gap-2">
          <label
            class="text-xs font-bold uppercase tracking-widest text-zinc-400"
            >Username</label
          >
          <input
            type="text"
            v-model="username"
            :class="
              themePreference === 'dark'
                ? 'bg-zinc-900 border-zinc-800 text-gray-100'
                : 'bg-zinc-100 border-zinc-300 text-zinc-900'
            "
            class="w-full rounded-lg px-4 py-3 text-sm outline-none transition-colors focus:border-cyan-300"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label
            class="text-xs font-bold uppercase tracking-widest text-zinc-400"
            >Theme Preference</label
          >
          <div class="flex gap-4 mt-1">
            <button
              @click="gantiTemaSistem('dark')"
              :class="
                themePreference === 'dark'
                  ? 'border-cyan-300 bg-cyan-300/10 text-cyan-700 dark:text-cyan-300 font-bold'
                  : 'border-zinc-200 text-zinc-400'
              "
              class="flex-1 py-3 text-xs uppercase tracking-wider border rounded-xl transition-all"
            >
              Dark Mode
            </button>
            <button
              @click="gantiTemaSistem('light')"
              :class="
                themePreference === 'light'
                  ? 'border-cyan-300 bg-cyan-300/10 text-cyan-700 dark:text-cyan-300 font-bold'
                  : 'border-zinc-200 text-zinc-400'
              "
              class="flex-1 py-3 text-xs uppercase tracking-wider border rounded-xl transition-all"
            >
              Light Mode
            </button>
          </div>
        </div>

        <div
          :class="
            themePreference === 'dark' ? 'border-white/5' : 'border-zinc-200'
          "
          class="pt-4 border-t flex justify-end"
        >
          <button
            @click="simpanDataProfil"
            :class="
              themePreference === 'dark'
                ? 'bg-white text-black'
                : 'bg-zinc-900 text-white'
            "
            class="px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-transform hover:scale-[1.02]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="notifikasiTeks"
      class="fixed bottom-6 right-6 z-50 bg-cyan-300 text-black px-4 py-3 rounded-lg shadow-lg text-xs font-semibold tracking-wide animate-bounce"
    >
      {{ notifikasiTeks }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const username = ref("");
const profileImage = ref("");
const themePreference = ref("dark");
const sedangMemuatGambar = ref(false);
const notifikasiTeks = ref("");
const batasMaksimalFoto = 1024 * 1024;

// Saat halaman dibuka, data profil diambil kembali dari localStorage.
onMounted(() => {
  username.value = localStorage.getItem("username") || "JedyUser";
  themePreference.value = localStorage.getItem("themePreference") || "dark";
  profileImage.value = localStorage.getItem("profileImage") || "";
});

// Theme disimpan dan event dikirim agar App.vue memperbarui tampilan global.
const gantiTemaSistem = (pilihan) => {
  themePreference.value = pilihan;
  localStorage.setItem("themePreference", pilihan);
  // Picu event global agar dibaca oleh App.vue
  window.dispatchEvent(new Event("theme-change-event"));
};

// Helper promise untuk mengubah canvas menjadi file blob JPEG.
const ubahCanvasKeBlob = (canvas, kualitas) =>
  new Promise((resolve) => {
    canvas.toBlob(resolve, "image/jpeg", kualitas);
  });

// Foto di-crop persegi dan dikompres bertahap sampai ukurannya <= 1 MB.
const buatBlobFotoProfil = async (img) => {
  let ukuran = 400;

  while (ukuran >= 160) {
    const canvas = document.createElement("canvas");
    canvas.width = ukuran;
    canvas.height = ukuran;
    const ctx = canvas.getContext("2d");
    const sisiPendek = Math.min(img.naturalWidth, img.naturalHeight);
    const sx = (img.naturalWidth - sisiPendek) / 2;
    const sy = (img.naturalHeight - sisiPendek) / 2;

    ctx.drawImage(img, sx, sy, sisiPendek, sisiPendek, 0, 0, ukuran, ukuran);

    for (let kualitas = 0.85; kualitas >= 0.4; kualitas -= 0.1) {
      const blob = await ubahCanvasKeBlob(canvas, kualitas);
      if (blob && blob.size <= batasMaksimalFoto) return blob;
    }

    ukuran = Math.floor(ukuran * 0.8);
  }

  return null;
};

// Membaca file gambar, mengompresnya, lalu menyimpan hasilnya sebagai data URL.
const handleUploadFoto = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  sedangMemuatGambar.value = true;
  const img = new Image();
  const objectUrl = URL.createObjectURL(file);

  img.onload = async () => {
    try {
      const blob = await buatBlobFotoProfil(img);
      if (!blob) {
        tampilkanAlert("Foto gagal dikompres di bawah 1 MB.");
        return;
      }

      const blobReader = new FileReader();
      blobReader.onloadend = () => {
        profileImage.value = blobReader.result;
      };
      blobReader.readAsDataURL(blob);
    } finally {
      URL.revokeObjectURL(objectUrl);
      setTimeout(() => {
        sedangMemuatGambar.value = false;
      }, 500);
    }
  };

  img.onerror = () => {
    URL.revokeObjectURL(objectUrl);
    sedangMemuatGambar.value = false;
    tampilkanAlert("Foto tidak bisa dibaca.");
  };

  img.src = objectUrl;
};

// Menyimpan semua perubahan profil ke localStorage.
const simpanDataProfil = () => {
  localStorage.setItem("username", username.value);
  localStorage.setItem("themePreference", themePreference.value);
  if (profileImage.value)
    localStorage.setItem("profileImage", profileImage.value);
  window.dispatchEvent(new Event("profile-update-event"));
  tampilkanAlert("Profile settings saved successfully!");
};

const tampilkanAlert = (pesan) => {
  notifikasiTeks.value = pesan;
  setTimeout(() => {
    notifikasiTeks.value = "";
  }, 3000);
};
</script>
