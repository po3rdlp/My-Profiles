<script setup lang="ts">
import SideBar from "./navigation/SideBar.vue";
</script>

<template>
  <div class="flex justify-between items-center p-4 py-4" data-theme="night">
    <AtomsLightCursor />
    <SideBar />
    <div class="ml-[33.333%] w-full">
      <slot />
    </div>
  </div>
</template>
