<script setup lang="ts">
import Git from "~/pages/git/git.vue";
import SideBar from "./navigation/SideBar.vue";

const route = useRoute();

const noSidebarPages = ["/git", "/about", "/contact"];

const hideSidebar = computed(() => noSidebarPages.includes(route.path));
</script>

<template>
  <div>
    <!-- Header -->
    <!-- <div
      class="fixed top-0 left-0 w-full z-50 bg-base-200 text-md text-white text-center"
    >
      <div
        class="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300"
      >
        <div class="grid items-center">
          <span class="font-bold">V2 Portfolio in progress</span>
          <span>Thank you for stopping by!</span>
        </div>
      </div>
    </div> -->

    <div
      v-if="!hideSidebar"
      class="pt-[52px] flex justify-between items-start p-4"
      data-theme="night"
    >
      <AtomsLightCursor />

      <!-- Sidebar muncul hanya di halaman tertentu -->
      <div v-if="!hideSidebar" class="hidden lg:block">
        <SideBar />
      </div>

      <div
        :class="[
          hideSidebar ? 'w-full' : 'lg:ml-[33.333%] w-full mt-16 lg:mt-15',
        ]"
      >
        <slot />
      </div>
    </div>
    <div v-else class="pt-[52px] p-4" data-theme="night">
      <AtomsLightCursor />

      <!-- Sidebar muncul hanya di halaman tertentu -->
      <div v-if="!hideSidebar" class="hidden lg:block">
        <SideBar />
      </div>

      <div
        :class="[
          hideSidebar ? 'w-full' : 'lg:ml-[33.333%] w-full mt-16 lg:mt-15',
        ]"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
