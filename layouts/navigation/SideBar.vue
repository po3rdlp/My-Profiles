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
                    src="../../assets/img/img_profile.jpg"
                    class="w-36 h-36 rounded-full"
                  />
                </div>
                <div>
                  <label class="label grid text-sm">
                    <span class="text-sm text-white font-bold"
                      >Leonard Polandos</span
                    >
                  </label>
                  <div class="flex items-center gap-3">
                    <div class="flex items-center gap-1">
                      <p class="text text-xs font-sora cursor-default">
                        OPEN FOR COLLABS
                      </p>
                    </div>
                    <!-- <div>
                      <button
                        @click="store.toggleWeatherCondition"
                        :class="{
                          'animate__animated animate__fadeIn':
                            store.weatherCondition,
                        }"
                      >
                        <span v-if="store.selectedTheme === 'sunset'">
                          <Icon
                            name="material-symbols-light:shield-moon-outline"
                            size="34px"
                          />
                        </span>
                        <span v-else-if="store.selectedTheme === 'nord'">
                          <Icon
                            name="material-symbols-light:sunny"
                            size="34px"
                          />
                        </span>
                      </button>
                    </div> -->
                  </div>
                  <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
                  <div class="w-full">
                    <ul class="grid gap-3">
                      <li
                        v-for="link in filteredRoutes"
                        :key="link.name"
                        class="w-full"
                      >
                        <span
                          class="grid rounded-2xl p-2"
                          :class="[
                            store.selectedTheme === `${store.theme[0]}`
                              ? 'hover:bg-transparent'
                              : 'hover:bg-none',
                            'hover:scale-110 duration-200',
                            isActive(link.path)
                              ? `text-center scale-125 duration-300 font-extrabold ${
                                  store.selectedTheme !== `${store.theme[0]}`
                                    ? 'text-blue-300 hover:text-blue-300'
                                    : 'text-blue-500 hover:text-blue-500'
                                }`
                              : '',
                          ]"
                        >
                          <NuxtLink
                            :to="link.path"
                            :class="[
                              store.selectedTheme === `${store.theme[0]}`
                                ? 'hover:text-black'
                                : 'hover:text-white',
                              isActive(link.path) ? 'font-bold' : '',
                            ]"
                          >
                            {{ link.name }}
                          </NuxtLink>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
                  <div class="flex justify-between items-center">
                    <NuxtLink to="/">
                      <Icon
                        name="material-symbols-light:arrow-back"
                        size="30px"
                      />
                    </NuxtLink>
                    <p class="text-sm text-center font-thin text-gray-400">
                      © 2024 By Leonard
                    </p>
                  </div>
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
import routes from "../../utils/routes/route";

const route = useRoute();

const filteredRoutes = routes.filter((route) => route.path !== "/");

const store = useMyStore();

const isActive = (path: string) => {
  return route.path === path;
};

onMounted(() => {
  store.initialize();
});
</script>
