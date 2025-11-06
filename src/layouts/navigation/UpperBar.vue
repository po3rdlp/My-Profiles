<template>
  <div
    class="flex gap-2 items-center p-4 cursor-pointer hover:bg-base-200 rounded-md transition"
    @click="goToGit"
  >
    <span class="hover:opacity-80 transition">
      <Icon name="mdi:github" size="30" />
    </span>
    <span
      class="underline underline-offset-4 hover:opacity-80 hover:text-blue-200"
      >See GitHub Contribution</span
    >
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToGit = () => {
  router.push("/git");
};
</script>
