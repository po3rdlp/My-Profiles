<template>
  <div>
    <NuxtParticles
      id="tsparticles"
      :options="options"
      @load="onLoad"
    ></NuxtParticles>
  </div>
</template>

<script setup lang="ts">
import type { Container as TspContainer } from "tsparticles-engine";

const options = {
  fullScreen: {
    enable: true,
  },
  size: {
    value: 20,
    random: false,
  },
  background: {
    color: {
      value: "#141414",
    },
  },
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "bubble",
        parallax: {
          enable: false,
          force: 2,
          smooth: 10,
        },
        resize: {
          delay: 0.5,
          enable: true,
        },
      },
    },
  },
  number: {
    density: {
      enable: true,
      area: 800,
    },
  },
  particles: {
    color: {
      value: "#E3E3E3",
    },
    links: {
      color: "#000",
      enable: false,
    },
    shape: {
      close: true,
      fill: true,
      options: {},
      type: "circle",
    },
    move: {
      enable: true,
      outMode: "bounce",
      random: false,
      straight: false,
      speed: 0.53,
    },
    number: {
      value: 200,
    },
    size: {
      value: {
        min: 0.5,
        max: 4.2,
      },
    },
    detectRetina: true,
    fpsLimit: 120,
  },
};

const onLoad = (container: TspContainer): void => {
  container.pause();
  setTimeout(() => container.play(), 0);
};
</script>
