<template>
  <div>
    <div
      v-if="!layoutReady"
      class="bg-slate-200 animate animate-ping w-full h-screen flex justify-center items-center"
    ></div>
    <div v-else>
      <NuxtLayout name="main">
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import "animate.css";
import { ref, onMounted } from "vue";
const store = useMyStore();
const layoutReady = ref(false);

const initializeStore = async () => {
  await store.initialize();
  layoutReady.value = true;
};

onMounted(async () => {
  await initializeStore();
});
</script>
