<template>
  <button
    :class="[
      'px-4 py-2 font-semibold rounded-lg',
      variantClasses,
      { 'cursor-not-allowed opacity-50': disabled },
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  variant: "primary" | "secondary";
  disabled: boolean;
}>();

const emit = defineEmits<{
  (e: "click"): void;
}>();

const variantClasses = computed(() => {
  return props.variant === "primary"
    ? "bg-blue-600 text-white hover:bg-blue-700"
    : "bg-gray-500 text-white hover:bg-gray-600";
});

const handleClick = () => {
  if (!props.disabled) {
    emit("click");
  }
};
</script>
