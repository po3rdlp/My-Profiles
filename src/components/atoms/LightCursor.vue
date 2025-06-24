<template>
  <div
    class="light-cursor"
    :style="{
      left: `${x}px`,
      top: `${y}px`,
    }"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const x = ref(0);
const y = ref(0);

const updatePosition = (e) => {
  x.value = e.clientX;
  y.value = e.clientY;
};

onMounted(() => {
  window.addEventListener("mousemove", updatePosition);
});
onUnmounted(() => {
  window.removeEventListener("mousemove", updatePosition);
});
</script>

<style scoped>
.light-cursor {
  position: fixed;
  width: 650px;
  height: 650px;
  pointer-events: none;
  border-radius: 55%;
  background: radial-gradient(
    circle,
    rgba(85, 124, 189, 0.2) 0%,
    rgba(15, 23, 42, 0) 65%
  );
  mix-blend-mode: lighten;
  transform: translate(-50%, -50%);
  z-index: 9999;
  transition: top 0.05s, left 0.05s;
}
</style>
