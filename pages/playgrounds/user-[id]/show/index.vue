<template>
  <div>
    <div>
      <p>show pages</p>
      {{ store.userData?.id }}
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useMyStore();
</script>
