<template>
  <div class="grid">
    <input
      class="input input-bordered"
      :placeholder="placeholder"
      :class="{ 'border-red-500': err }"
      v-model="inputValue"
      :type="type"
      :disabled="disabled"
    />
    <p v-if="err" class="text-red-500 text-sm mt-1">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: string;
  placeholder: string;
  disabled: boolean;
  message: string;
  err: boolean;
  modelValue: string | number;
}>();

const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue);

watch(inputValue, (newValue) => {
  emit("update:modelValue", newValue);
});

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue; // Sync the internal value with the prop if it changes externally
  }
);
</script>
