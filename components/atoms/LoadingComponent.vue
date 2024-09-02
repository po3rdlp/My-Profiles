<template>
  <div class="flex justify-center items-center">
    <Icon
      class="flex justify-center items-center animate-spin"
      name="material-symbols:directory-sync"
      :size="props.size"
    ></Icon>
    <slot>{{ props.label }}</slot>
  </div>
</template>

<script setup lang="tsx">
const props = defineProps<{
  label: string;
  size: string;
}>();
</script>
