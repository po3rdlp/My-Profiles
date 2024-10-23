<template>
  <NuxtLoadingIndicator v-if="store.IsLoading" />
  <div :data-theme="store.selectedTheme" class="min-h-dvh">
    <div
      v-if="store.IsLoggedIn"
      v-on:click="store.logOut()"
      class="flex justify-center items-center gap-3"
    >
      <p class="text-sm font-bold">
        You Are Currently Login as {{ store.userData?.userName }}, click to log
        out
      </p>
    </div>
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
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
let store = useMyStore();

onMounted(() => {
  store;
});
</script>
