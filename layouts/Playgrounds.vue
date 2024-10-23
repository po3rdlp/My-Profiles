<template>
  <div class="p-3">
    <ul
      class="flex items-center justify-evenly rounded-xl p-3 w-full overflow-auto min-h-full bg-gray-600 text-base-content"
    >
      <li v-for="link in links" :key="link.name">
        <span
          class="w-full rounded-lg p-2"
          :class="{
            'shadow-2xl border rounded-2xl text-white': isActive(link.path),
          }"
        >
          <NuxtLink :to="link.path" exact-active-class="active-link">{{
            link.name
          }}</NuxtLink>
        </span>
      </li>
    </ul>
    <div>
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
const isActive = (path: string) => currentPath.value === path;
</script>
