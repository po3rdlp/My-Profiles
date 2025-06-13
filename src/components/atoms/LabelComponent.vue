<template>
  <label :class="labelClasses">{{ text }}</label>
</template>

<script setup lang="tsx">
import { computed } from "vue";

const props = defineProps<{
  text: string;
  textSize?: string;
  customClass?: string;
}>();

const labelClasses = computed(() => {
  return [
    "label",
    props.textSize ? `text-${props.textSize}` : "",
    props.customClass,
  ]
    .filter(Boolean)
    .join(" ");
});
</script>

<style scoped>
.label {
  font-weight: normal;
}

.text-small {
  font-size: 0.75rem;
}

.text-medium {
  font-size: 1rem;
}

.text-large {
  font-size: 1.25rem;
}

.text-bold {
  font-weight: bold;
}
</style>
