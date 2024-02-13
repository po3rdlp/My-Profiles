<template>
  <div>
    <div class="bg-base-100 shadow-lg">
      <div>
        <div class="flex justify-between w-full p-3">
          <div class="flex-1">
            <div class="flex w-10 h-10 rounded-full">
              <img
                class="rounded-3xl"
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
              <a class="btn btn-ghost text-xl">Polandos</a>
            </div>
          </div>
          <div class="flex items-center justify-end gap-3">
            <div>
              <button
                @click="weatherCondition = !weatherCondition"
                :class="{
                  'animate__animated animate__fadeIn': weatherCondition,
                }"
              >
                <span v-if="isClearNight">
                  <Icon name="meteocons:clear-night" size="34px" />
                </span>
                <span v-else-if="isClearDay">
                  <Icon name="meteocons:clear-day" size="34px" />
                </span>
              </button>
            </div>
            <div>
              <button @click="toggleDrawer">
                <span :class="{ hidden: isDrawerOpen === true }">
                  <Icon name="system-uicons:menu-hamburger" size="34px" />
                </span>
              </button>
              <button @click="toggleDrawer">
                <span :class="{ hidden: isDrawerOpen === false }">
                  <Icon name="tabler:playlist-x" size="34px" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="drawer">
      <input
        id="my-drawer"
        type="checkbox"
        class="drawer-toggle"
        v-model="isDrawerOpen"
      />
      <div class="drawer-content"></div>
      <div class="drawer-side">
        <label
          for="my-drawer"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li>
            <span @click="isDrawerOpen = false"
              ><NuxtLink to="/">/</NuxtLink></span
            >
          </li>
          <li>
            <span @click="isDrawerOpen = false"
              ><NuxtLink to="/home">home</NuxtLink></span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ref, computed } from "vue";

const isDrawerOpen = ref(false);
const weatherCondition = ref(false);

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const isClearDay = computed(() => weatherCondition.value === true);
const isClearNight = computed(() => weatherCondition.value === false);
</script>
