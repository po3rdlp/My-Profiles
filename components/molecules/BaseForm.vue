<template>
  <form @submit.prevent="handleSubmit">
    <slot></slot>

    <div v-if="setErr">
      <p>{{ errMessage }}</p>
    </div>

    <AtomsButtonComponent
      label="Create"
      variant="primary"
      :disabled="false"
      @click="undefined"
    />
  </form>
</template>

<script setup lang="ts">
const props = defineProps({
  submitButtonText: {
    type: String,
    default: "Submit",
  },
  intialValues: {
    type: Object,
    required: true,
  },
  onSubmit: {
    type: Function,
    required: true,
  },
});

const isSubmitting = ref<boolean>();
const errMessage = ref<string>();
const setErr = ref<boolean>(false);
const formState = reactive({ ...props.intialValues });

watch(
  () => props.intialValues,
  (newValues) => {
    Object.assign(formState, newValues);
  },
  { deep: true }
);

const handleSubmit = async () => {
  isSubmitting.value = true;
  errMessage.value = "";
  try {
    await props.onSubmit({ ...formState });
  } catch (err) {
    setErr.value = true;
    errMessage.value = `${err}` || "An Error Occured";
  } finally {
    isSubmitting.value = false;
  }
};
</script>
