<template>
  <div class="w-full grid items-center scroll-smooth inconsolata">
    <div class="-mt-11">
      <About />
    </div>
    <div class="">
      <exp />
    </div>
    <div class="">
      <Projects />
    </div>
  </div>
</template>

<script setup lang="ts">
import About from "../about/about.vue";
import exp from "../experience/exp.vue";
import Projects from "../projects/projects.vue";
</script>
