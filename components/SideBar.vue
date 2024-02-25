<template>
  <div class="w-full">
    <div class="font-sora">
      <div class="max-h-full w-auto">
        <div>
          <div class="drawer-content">
            <ul class="p-4 w-full min-h-full py-10">
              <div>
                <div class="p-2">
                  <img
                    src="../img/IMG_20230824_204918_330.jpg"
                    class="w-28 h-28 rounded-full"
                  />
                </div>
                <div>
                  <label class="label grid text-sm"
                    ><span class="text-sm text-white font-bold"
                      >Leonard Polandos</span
                    ><span class="text-xs">@Lpolandos</span></label
                  >
                  <div class="flex items-center gap-3">
                    <div class="flex items-center gap-1">
                      <p class="text text-xs">Open For Collabs!</p>
                      <Icon
                        class="animate-pulse"
                        name="material-symbols-light:circle"
                        style="color: #2caf35"
                        size="10px"
                      />
                    </div>
                    <div>
                      <button
                        @click="store.toggleWeatherCondition"
                        :class="{
                          'animate__animated animate__fadeIn':
                            store.weatherCondition,
                        }"
                      >
                        <span v-if="store.isClearNight">
                          <Icon
                            name="material-symbols-light:shield-moon-outline"
                            size="34px"
                          />
                        </span>
                        <span v-else-if="store.isClearDay">
                          <Icon
                            name="material-symbols-light:sunny"
                            size="34px"
                          />
                        </span>
                      </button>
                    </div>
                  </div>
                  <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
                  <div>
                    <ul class="grid gap-5 p-3 w-full min-h-full">
                      <li v-for="link in links" :key="link.name">
                        <span
                          @click="store.isDrawerOpen = false"
                          class="hover:bg-slate-400 rounded-2xl p-2"
                        >
                          <NuxtLink :to="link.path">{{ link.name }}</NuxtLink>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
                  <p class="text-sm text-center font-thin text-gray-400">
                    © 2023 By Leonard
                  </p>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useMyStore();

import { ref } from "vue";

const links = ref([
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Projects", path: "/projects" },
]);
</script>
