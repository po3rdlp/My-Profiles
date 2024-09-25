<template>
  <div>
    <div>
      <div class="flex justify-between items-center">
        <h1 class="text text-2xl font-bold capitalize">PLAYGROUND</h1>
        <AtomsButtonComponent
          :label="'Logout'"
          variant="secondary"
          :disabled="false"
          @click="store.logOut()"
          v-if="store.isLoggedIn"
        />
      </div>
      <br />
      <div class="animate__animated animate__fadeInDown">
        <h1 class="flex">
          This Page Is for Testing and Learning New Concepts
          <br />
          Designed for My Own Use as a Web Developer...
        </h1>
      </div>
      <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
    <div>
      <LayoutsPlaygrounds />
    </div>
  </div>
</template>

<script setup lang="tsx">
const store = useMyStore();
</script>
