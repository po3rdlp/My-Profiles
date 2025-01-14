<template>
  <div class="mt-3 animate__animated animate__fadeInDown">
    <label class="label"> Or Send Me A Message !!</label>
    <div class="grid gap-3 grid-cols-1">
      <div class="grid grid-cols-2 gap-5">
        <input
          type="text"
          class="input input-primary rounded-xl border-gray-800"
          placeholder="Name*"
        />
        <input
          type="email"
          class="input input-primary rounded-xl border-gray-800"
          placeholder="Email*"
        />
      </div>
      <div>
        <textarea
          class="input rounded-xl border-slate-800 w-full h-40"
          placeholder="Message*"
        ></textarea>
      </div>
    </div>
    <div class="flex justify-end">
      <AtomsButtonComponent
        label="Send"
        variant="primary"
        :disabled="false"
        @click="SendChat"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const SendChat = () => {
  window.alert("FITUR INI MASIH DALAM TAHAP PENGEMBANGAN :)");
};
</script>
