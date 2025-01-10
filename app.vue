<template>
  <div>
    <div
      v-if="!layoutReady"
      class="bg-slate-200 animate animate-ping w-full h-screen flex justify-center items-center"
    ></div>
    <div v-else>
      <NuxtLayout :name="currentLayout">
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import "animate.css";

const store = useMyStore();
const layoutReady = ref(false);

// Reactive route
const route = useRoute();

// Determine current layout
const currentLayout = computed(() =>
  route.path === "/" ? "landing-page" : "main"
);

// Initialize the store
const initializeStore = async () => {
  await store.initialize();
  layoutReady.value = true;
};

// Mount
onMounted(async () => {
  await initializeStore();
});
</script>
