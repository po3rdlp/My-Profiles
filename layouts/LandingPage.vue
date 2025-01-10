<template>
  <div class="absolute -z-50">
    <ParticlesBackground />
  </div>
  <slot />
</template>

<script setup lang="ts">
import ParticlesBackground from "~/components/atoms/ParticlesBackground.vue";
</script>
