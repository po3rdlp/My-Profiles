<template>
  <div>
    <div class="flex justify-between items-center mt-3">
      <h1 class="text text-2xl font-bold capitalize">PLAYGROUND {{ id }}</h1>
    </div>
    <div>
      <NuxtLayout>
        <NuxtPage :name="layout" />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="tsx">
const store = useMyStore();

const id = store.userData.id;

const layout = "playgrounds";
</script>
