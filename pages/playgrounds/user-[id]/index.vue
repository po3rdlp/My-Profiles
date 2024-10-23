<template>
  <div>
    <AtomsButtonComponent
      :label="'Logout'"
      variant="secondary"
      :disabled="false"
      @click="store.logOut()"
    />
    <div>
      <p>Hello World</p>
    </div>
    <div>id :{{ store.userData?.id }}</div>
  </div>
</template>

<script setup lang="ts">
const store = useMyStore();
</script>
