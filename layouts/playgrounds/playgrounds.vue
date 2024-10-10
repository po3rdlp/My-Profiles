<template>
  <div>
    <div class="flex justify-between items-center mt-3">
      <h1 class="text text-2xl font-bold capitalize">PLAYGROUND {{ id }}</h1>
      <AtomsButtonComponent
        :label="'Logout'"
        variant="secondary"
        :disabled="false"
        @click="store.logOut()"
        v-if="store.isLoggedIn"
      />
    </div>
    <div>
      <NuxtLayout>
        <NuxtPage :name="layout" />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="tsx">
const store = useMyStore();

const id = store.userId;

const layout = "playgrounds";
</script>
