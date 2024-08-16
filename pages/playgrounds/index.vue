<template>
  <div>
    <div>
      <h1 class="text text-2xl font-bold capitalize">Contact</h1>
      <br />
      <div class="animate__animated animate__fadeInDown">
        <h1 class="flex">
          Feel free to get in touch and let's have a discussion about how we can
          work together.
        </h1>
      </div>
      <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
    <div class="grid mt-2">
      <label class="text text-lg font-bold capitalize"
        >Find Me on Social Media</label
      >
      <AtomsButtonComponent
        label="Test Click"
        variant="primary"
        :disabled="false"
        @click="testClick"
      />
    </div>
    <br />
    <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />
  </div>
</template>

<script setup lang="ts">
const testClick = () => {
  console.warn("Ini Berfungsi");
};
</script>
