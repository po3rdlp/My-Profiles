<template>
  <div>
    <NuxtLayout :name="layoutName">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import "animate.css";

const store = useMyStore();

const initializeStore = async () => {
  await store.initialize();
  await store.checkToken();
};

const layoutName = computed(() => {
  return store.IsLoggedIn ? "playgrounds" : "main";
});

onMounted(async () => {
  await initializeStore();
});
</script>
