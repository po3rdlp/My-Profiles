<template>
  <div>
    <div class="animate__animated animate__fadeInDown">
      <h1 class="text text-2xl font-bold capitalize">Dashboard</h1>
    </div>
    <br />
    <div class="flex gap-1 animate__animated animate_fadeInDown">
      <h1 class="flex animate__animated animate__fadeInDown">
        Hello this is my Personal Dashboard
      </h1>
    </div>
    <hr
      class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700 animate__animated animate__fadeInDown"
    />
    <div class="mt-2 animate__animated animate__fadeInUp">
      <GitContribution />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Dashboard - Leonard",
});
</script>
