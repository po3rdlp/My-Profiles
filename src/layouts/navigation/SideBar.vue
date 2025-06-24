<template>
  <div
    class="fixed top-5 left-5 w-2/6 z-50 h-screen rounded-r flex flex-col gap-4 font-bold inconsolata"
  >
    <div class="">
      <p class="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
        Leonard Petter
      </p>
      <p class="tracking-tight text-slate-200">Front End Engineer</p>
      <p class="break-words whitespace-normal w-full max-w-xs">
        I build accessible, pixel-perfect digital experiences for the web.
      </p>
    </div>

    <!-- Anchor link -->
    <div class="grid items-center gap-2 p-4 no-underline">
      <a
        href="#index1"
        :class="activeSection === 'index1' ? activeClass : defaultClass"
        >About</a
      >
      <a
        href="#index2"
        :class="activeSection === 'index2' ? activeClass : defaultClass"
        >Experience</a
      >
      <a
        href="#index3"
        :class="activeSection === 'index3' ? activeClass : defaultClass"
        >Projects</a
      >
    </div>

    <div class="p-4">
      <div class="flex gap-3">
        <a href="https://github.com/po3rdlp" target="_blank">
          <Icon name="mdi:github" size="34px" />
        </a>
        <a href="https://www.instagram.com/leonpolandos/" target="_blank">
          <Icon name="mdi:instagram" size="34px" />
        </a>
        <a href="https://www.facebook.com/Lpolandos/" target="_blank">
          <Icon name="ic:baseline-facebook" size="34px" />
        </a>
        <a href="https://twitter.com/po3rdlp" target="_blank">
          <Icon name="fa6-brands:square-x-twitter" size="34px" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const activeSection = ref("");
const defaultClass = "transition-all duration-200 !no-underline";
const activeClass =
  "font-semibold transition-all text-3xl dration-200 !no-underline";

const updateActiveSection = () => {
  const sections = ["index1", "index2", "index3"];
  const scrollPosition = window.scrollY + 100;

  for (const id of sections) {
    const el = document.getElementById(id);
    if (!el) continue;

    const sectionTop = el.offsetTop;
    const sectionHeight = el.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      if (activeSection.value !== id) {
        activeSection.value = id;
      }
      break;
    }
  }
};

onMounted(() => {
  setTimeout(() => {
    window.addEventListener("scroll", updateActiveSection);
    updateActiveSection();
  }, 100);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateActiveSection);
});
</script>
