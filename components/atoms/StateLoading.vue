<template>
  <div
    class="flex items-center justify-center h-screen bg-gradient-to-br from-gray-300 to-gray-500"
  >
    <div class="loading-spinner"></div>
  </div>
</template>

<script setup lang="ts">
// No additional JavaScript required
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .loading-spinner {
    @apply w-12 h-12 sm:w-16 sm:h-16 border-4 border-t-blue-300 border-slate-100 rounded-full animate-spin;
  }
}
</style>
