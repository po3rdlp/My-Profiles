<script setup lang="ts">
import SideBar from "./navigation/SideBar.vue";
</script>

<template>
  <div
    class="fixed top-0 left-0 w-full z-50 p-1 bg-base-200 text-md text-white text-center sh"
  >
    <p
      class="mt-1 flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300"
    >
    <div class="grid items-center">
      <span class="flex items-center gap-1.5 animate-pulse">
        🛠️ V2 Portfolio in progress
      </span>
      <span>Thank you for stopping by!</span>
    </div>
    </p>
  </div>

  <div
    class="pt-[52px] flex justify-between items-start p-4"
    data-theme="night"
  >
    <AtomsLightCursor />

    <div class="hidden lg:block">
      <SideBar />
    </div>
    <div class="lg:ml-[33.333%] w-full mt-14 lg:mt-15">
      <slot />
    </div>
  </div>
</template>
