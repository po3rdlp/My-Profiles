<template>
  <div>
    <div
      v-if="!layoutReady"
      class="bg-slate-300 animate animate-pulse w-full h-screen flex justify-center items-center"
    >
      <p class="font-bold text-center">LOADING ...</p>
    </div>
    <div v-else>
      <NuxtLayout :name="layoutName">
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import "animate.css";
import { ref, onMounted, computed } from "vue";
const store = useMyStore();
const layoutReady = ref(false);

const initializeStore = async () => {
  await store.initialize();
  await store.checkToken();
  layoutReady.value = true;
};

const layoutName = computed(() => {
  return store.IsLoggedIn ? "playgrounds" : "main";
});

onMounted(async () => {
  await initializeStore();
});
</script>
