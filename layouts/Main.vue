<template>
  <div>
    <slot />
    <p>fullPath: {{ route.fullPath }}</p>
    <p>Params: {{ route.params }}</p>
    <p>Page Name: {{ route.name }}</p>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
</script>
