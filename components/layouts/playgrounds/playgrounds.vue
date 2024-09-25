<template>
  <div>
    <div v-if="store.isLoggedIn === false">
      <div>
        <label class="label font-bold">Login First</label>
        <div><LayoutsPlaygroundsPlaygroundLoginForm /></div>
      </div>
    </div>
    <div v-else>
      <LayoutsPlaygroundsPlaygroundInputUser />
    </div>
  </div>
</template>

<script setup lang="tsx">
const store = useMyStore();
</script>
