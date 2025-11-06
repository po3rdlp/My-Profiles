<script setup lang="ts">
import SideBar from "./navigation/SideBar.vue";
import UpperBar from "./navigation/UpperBar.vue";

const route = useRoute();

const noSidebarPages = ["/git"];

const hideSidebar = computed(() => noSidebarPages.includes(route.path));
</script>

<template>
  <div data-theme="night">
    <div
      v-if="!hideSidebar"
      class="block lg:hidden absolute top-0 left-0 right-0 z-50"
    >
      <UpperBar />
    </div>

    <div
      v-if="!hideSidebar"
      class="pt-[52px] flex justify-between items-start p-4"
    >
      <AtomsLightCursor />

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

    <div v-else class="pt-[52px] p-4">
      <AtomsLightCursor />

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
