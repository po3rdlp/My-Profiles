<template>
  <!-- <div v-if="!isAppReady">
    <AtomsStateLoading />
  </div>

  <div v-else>
    <div class="fixed inset-0 -z-50">
      <ParticlesBackground />
    </div>

    <NuxtLayout :name="currentLayout">
      <NuxtPage />
    </NuxtLayout>
  </div> -->
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden relative"
  >
    <!-- Background -->
    <div class="absolute inset-0 overflow-hidden z-0">
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute top-0 left-0 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-lg opacity-20"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-lg opacity-20"
        ></div>
        <div
          class="absolute top-1/2 left-3/4 w-32 h-32 bg-slate-500 rounded-full mix-blend-multiply filter blur-lg opacity-20"
        ></div>
      </div>
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-lg opacity-20"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-lg opacity-20"
        ></div>
        <div
          class="absolute top-1/2 right-3/4 w-32 h-32 bg-slate-500 rounded-full mix-blend-multiply filter blur-lg opacity-20"
        ></div>
      </div>
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute top-0 left-0 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-lg opacity-20"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-lg opacity-20"
        ></div>
        <div
          class="absolute top-1/2 left-3/4 w-32 h-32 bg-slate-500 rounded-full mix-blend-multiply filter blur-lg opacity-20"
        ></div>
      </div>
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-lg opacity-20"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-lg opacity-20"
        ></div>
        <div
          class="absolute top-1/2 right-3/4 w-32 h-32 bg-slate-500 rounded-full mix-blend-multiply filter blur-lg opacity-20"
        ></div>
      </div>
    </div>

    <!-- Konten utama -->
    <div class="relative z-10 text-center">
      <h1 class="text-2xl">
        I'm working on updating my main portfolio to bring a better experience.
        Check back soon!
      </h1>
      <h1 class="font-bold text-xl">- Leonard Polandos -</h1>

      <div class="grid justify-center mt-3 items-center">
        <h1 class="text-center">Done Estimation!</h1>
        <p class="text-center font-medium">
          {{ waktuTersisa?.hari ?? 0 }} hari {{ waktuTersisa?.jam ?? 0 }} jam
          {{ waktuTersisa?.menit ?? 0 }} menit
          {{ waktuTersisa?.detik ?? 0 }} detik
        </p>
      </div>

      <div class="flex justify-center gap-4 mt-2">
        <a href="https://github.com/po3rdlp" target="_blank">
          <Icon name="mdi:github" size="34px" />
        </a>
        <a href="https://www.instagram.com/leonpolandos/" target="_blank">
          <Icon name="mdi:instagram" size="34px" />
        </a>
        <a href="https://www.facebook.com/Lpolandos/" target="_blank">
          <Icon name="ic:baseline-facebook" size="34px" />
        </a>
        <a href="https://twitter.com/po3rdlp" target="_blank">
          <Icon name="fa6-brands:square-x-twitter" size="34px" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const targetDate = new Date(2025, 6, 1, 0, 0, 0);

const waktuTersisa = ref(null);
let intervalId = null;

function updateCountdown() {
  const now = new Date();
  const selisih = targetDate - now;

  if (selisih <= 0) {
    waktuTersisa.value = null;
    clearInterval(intervalId);
    return;
  }

  const detikTotal = Math.floor(selisih / 1000);
  const hari = Math.floor(detikTotal / (3600 * 24));
  const jam = Math.floor((detikTotal % (3600 * 24)) / 3600);
  const menit = Math.floor((detikTotal % 3600) / 60);
  const detik = detikTotal % 60;

  waktuTersisa.value = { hari, jam, menit, detik };
}

onMounted(() => {
  updateCountdown();
  intervalId = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<!-- <script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import "animate.css";

const store = useMyStore();
const isAppReady = ref(false);
const route = useRoute();

// Determine current layout
const currentLayout = computed(() =>
  route.path === "/" ? "landing-page" : "main"
);

// Initialize everything
const initializeApp = async () => {
  try {
    await store.initialize();

    await new Promise((resolve) => setTimeout(resolve, 300));

    isAppReady.value = true;
  } catch (error) {
    console.error("Initialization failed:", error);
    isAppReady.value = true;
  }
};

onMounted(initializeApp);
</script> -->
