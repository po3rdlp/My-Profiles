<template>
  <div class="light-cursor-container">
    <div class="light-cursor base" :style="{ left: `${x}px`, top: `${y}px` }" />

    <div
      class="light-cursor green"
      :class="{ visible: isHoveringClickable }"
      :style="{ left: `${x}px`, top: `${y}px` }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const x = ref(0);
const y = ref(0);
const isHoveringClickable = ref(false);

const updatePosition = (e) => {
  x.value = e.clientX;
  y.value = e.clientY;

  const target = document.elementFromPoint(e.clientX, e.clientY);
  isHoveringClickable.value = target && isClickable(target);
};

const isClickable = (el) => {
  if (!el) return false;
  const clickableTags = ["A", "BUTTON", "INPUT", "TEXTAREA", "LABEL"];
  const role = el.getAttribute("role");

  return (
    clickableTags.includes(el.tagName) ||
    el.hasAttribute("onclick") ||
    role === "button" ||
    role === "link" ||
    el.classList.contains("clickable")
  );
};

onMounted(() => {
  window.addEventListener("mousemove", updatePosition);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", updatePosition);
});
</script>

<style scoped>
.light-cursor-container {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
}

.light-cursor {
  position: fixed;
  width: 650px;
  height: 650px;
  border-radius: 55%;
  transform: translate(-50%, -50%);
  mix-blend-mode: lighten;
  transition: top 0.05s, left 0.05s, opacity 0.4s ease, transform 0.4s ease;
}

.light-cursor.base {
  background: radial-gradient(
    circle,
    rgba(85, 124, 189, 0.2) 0%,
    rgba(15, 23, 42, 0) 65%
  );
  opacity: 1;
}

.light-cursor.green {
  background: radial-gradient(
    circle,
    rgba(34, 197, 94, 0.3) 0%,
    rgba(15, 23, 42, 0) 65%
  );
  opacity: 0;
}

.light-cursor.green.visible {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.05);
}
</style>
