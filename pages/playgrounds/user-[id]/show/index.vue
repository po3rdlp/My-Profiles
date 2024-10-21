<template>
  <div>
    <NuxtLayout name="playgrounds">
      <div>
        <p>show pages</p>
        {{ store.userData?.id }}
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const store = useMyStore();
</script>
