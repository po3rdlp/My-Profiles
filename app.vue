<template>
  <div :data-theme="store.selectedTheme" class="h-screen">
    <div class="grid md:grid lg:flex justify-center">
      <div
        :class="{
          'font-bold text-slate-950': store.selectedTheme === 'lofi',
          'font-bold text-slate-200': store.selectedTheme !== 'lofi',
        }"
      >
        <div class="hidden lg:block max-w-56 h-screen">
          <SideBar />
        </div>
        <div class="lg:hidden">
          <NavBar />
        </div>
      </div>
      <div
        class="p-5 md:p-4 lg:p-6 lg:mt-10 font-sora w-screen md:w-screen lg:max-w-screen-lg"
        :class="{
          'font-bold text-slate-950': store.selectedTheme === 'lofi',
          'font-bold text-slate-200': store.selectedTheme !== 'lofi',
        }"
      >
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "animate.css";
import { useMyStore } from "./utils/stores/store";

const store = useMyStore();
</script>
