<template>
  <div :data-theme="store.selectedTheme">
    <div class="rounded-sm bg-slate-500 p-2">
      <div
        v-on:click="store.logOut()"
        class="flex justify-end lg:justify-end p-3"
      >
        <button class="btn btn-ghost btn-sm">
          <Icon name="solar:logout-line-duotone" class="w-8 h-8" />Keluar
        </button>
      </div>
      <ul class="flex items-center justify-evenly min-h-full text-base-content">
        <li v-for="link in links" :key="link.name">
          <span
            class="w-full rounded-lg p-2"
            :class="{
              'shadow-2xl border rounded-2xl text-white': isActive(link.path),
            }"
          >
            <NuxtLink
              :to="link.path"
              :class="{
                'shadow-2xl border rounded-2xl text-red-500': isActive(
                  link.path
                ),
              }"
              >{{ link.name }}</NuxtLink
            >
          </span>
        </li>
      </ul>
    </div>
    <div
      class="p-3"
      :class="{
        'font-bold text-slate-950': store.selectedTheme === 'acid',
        'font-bold text-slate-200': store.selectedTheme !== 'acid',
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
const store = useMyStore();

interface Link {
  name: string;
  path: string;
}

const links = ref<Link[]>([]);

onMounted(() => {
  if (store.userData) {
    links.value = [
      { name: "Home", path: `/playgrounds/user-${store.userData.id}/` },
      { name: "Show", path: `/playgrounds/user-${store.userData.id}/show` },
    ];
  }
});

const currentPath = computed(() => window.location.pathname);

const isActive = (path: string) => {
  return currentPath.value === path;
};
</script>
