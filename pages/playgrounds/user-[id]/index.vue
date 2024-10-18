<template>
  <AtomsButtonComponent
    :label="'Logout'"
    variant="secondary"
    :disabled="false"
    @click="store.logOut()"
    v-if="store.IsLoggedIn"
  />
  <NuxtLayout name="navigation-playground-nav-bar" />
  <p>Hello user {{ $route.params }}</p>
</template>

<script setup lang="ts">
const store = useMyStore();

definePageMeta({
  middleware: "middleware-auth",
});
</script>
