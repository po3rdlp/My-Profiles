<template>
  <NuxtLoadingIndicator v-if="store.IsLoading" />
  <div :data-theme="store.selectedTheme" class="min-h-dvh">
    <div class="grid md:grid lg:flex lg:justify-center">
      <div
        :class="{
          'font-bold text-slate-950': store.selectedTheme === 'acid',
          'font-bold text-slate-200': store.selectedTheme !== 'acid',
        }"
      >
        <div class="hidden lg:block max-w-56 h-full">
          <NuxtLayout name="navigation-side-bar" />
        </div>
        <div class="lg:hidden">
          <NuxtLayout name="navigation-nav-bar" />
        </div>
      </div>
      <div
        class="p-3 md:p-4 lg:p-5 lg:mt-10 font-sora w-full md:w-full lg:max-w-screen-md overflow-x-hidden"
        :class="{
          'font-bold text-slate-950': store.selectedTheme === 'acid',
          'font-bold text-slate-200': store.selectedTheme !== 'acid',
        }"
      >
        <NuxtLoadingIndicator />
        <NuxtLayout name="main">
          <NuxtPage />
        </NuxtLayout>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "animate.css";

const store = useMyStore();

onMounted(() => {
  store.initialize();
  store.checkToken();
});
</script>
