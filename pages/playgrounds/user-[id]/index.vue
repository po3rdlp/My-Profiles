<template>
  <div>
    <NuxtLayout name="playgrounds">
      <AtomsButtonComponent
        :label="'Logout'"
        variant="secondary"
        :disabled="false"
        @click="store.logOut()"
      />
      <div>
        <p>Hello World</p>
      </div>
      id :{{ store.userData?.id }}
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const store = useMyStore();

definePageMeta({
  middleware: "middleware-auth",
});
</script>
