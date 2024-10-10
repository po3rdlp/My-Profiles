<template>
  <div>
    <ul
      class="flex items-center justify-between rounded-xl p-3 w-full overflow-auto min-h-full bg-transparent text-base-content"
    >
      <li v-for="link in links" :key="link.name">
        <span class="w-full hover:bg-slate-200 rounded-lg p-2">
          <NuxtLink :to="link.path">{{ link.name }}</NuxtLink>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const links = ref([
  { name: "Concepts 1", path: "/" },
  { name: "Concepts 2", path: "/dashboard" },
  { name: "Concepts 3", path: "/about" },
]);
</script>
