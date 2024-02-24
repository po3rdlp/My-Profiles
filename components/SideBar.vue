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
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
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
                    <ul
                      class="grid gap-3 p-4 w-80 min-h-full text-base-content"
                    >
                      <NuxtLink to="/">Home</NuxtLink>
                      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
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
</script>
