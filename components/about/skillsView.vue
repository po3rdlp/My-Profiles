<template>
  <div class="mb-5">
    <div>
      <NuxtMarquee :autoFill="true" class="p-1">
        <div
          class="flex items-center gap-2 mr-3 rounded-full py-2 px-5 w-max shadow-sm"
        >
          <img
            src="https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg"
            alt="ex"
            class="w-10 h-10"
          />
          <span>Express</span>
        </div>
        <div
          class="flex items-center gap-2 mr-3 rounded-full py-2 px-5 w-max shadow-sm"
        >
          <img
            src="https://www.vectorlogo.zone/logos/javascript/javascript-icon.svg"
            alt="ex"
            class="w-10 h-10"
          />
          <span>JavaScript</span>
        </div>
        <div
          class="flex items-center gap-2 mr-3 rounded-full py-2 px-5 w-max shadow-sm"
        >
          <img
            src="https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg"
            alt="ex"
            class="w-10 h-10"
          />
          <span>TypeScript</span>
        </div>
        <div
          class="flex items-center gap-2 mr-3 rounded-full py-2 px-5 w-max shadow-sm"
        >
          <img
            src="https://www.vectorlogo.zone/logos/vitessio/vitessio-icon.svg"
            alt="ex"
            class="w-10 h-10"
          />
          <span>Vite</span>
        </div>
      </NuxtMarquee>
    </div>

    <div class="mt-5">
      <NuxtMarquee :direction="'right'" :autoFill="true" class="p-2">
        <div
          class="flex items-center gap-2 mr-3 rounded-full py-2 px-5 w-max shadow-sm"
        >
          <img
            src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"
            alt="ex"
            class="w-10 h-10"
          />
          <span>React</span>
        </div>
        <div
          class="flex items-center gap-2 mr-3 rounded-full py-2 px-5 w-max shadow-sm"
        >
          <img
            src="https://www.vectorlogo.zone/logos/vuejs/vuejs-icon.svg"
            alt="ex"
            class="w-10 h-10"
          />
          <span>Vue</span>
        </div>
        <div
          class="flex items-center gap-2 mr-3 rounded-full py-2 px-5 w-max shadow-sm"
        >
          <img
            src="https://www.vectorlogo.zone/logos/wordpress/wordpress-icon.svg"
            alt="ex"
            class="w-10 h-10"
          />
          <span>Wordpress</span>
        </div>
        <div
          class="flex items-center gap-2 mr-3 rounded-full py-2 px-5 w-max shadow-sm"
        >
          <img
            src="https://www.vectorlogo.zone/logos/nuxtjs/nuxtjs-icon.svg"
            alt="ex"
            class="w-10 h-10"
          />
          <span>NuxtJs</span>
        </div>
      </NuxtMarquee>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtMarquee } from "#build/components";
</script>
