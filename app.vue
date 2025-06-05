<template>
  <div v-if="!isAppReady">
    <AtomsStateLoading />
  </div>

  <div v-else>
    <div class="fixed inset-0 -z-50">
      <ParticlesBackground />
    </div>

    <NuxtLayout :name="currentLayout">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
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
</script>
