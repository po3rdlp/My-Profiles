<template>
  <div>
    <NuxtLayout name="main">
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

// watch(
//   () => store.userData,
//   async (newValue, oldValue) => {
//     if (newValue !== oldValue) {
//       await initializeStore();
//     }
//   }
// );

onMounted(async () => {
  await initializeStore();
});
</script>
