<template>
  <div>
    <div class="shadow-lg">
      <div>
        <div class="flex justify-between w-full p-3">
          <div class="flex-1">
            <div class="flex items-center rounded-full">
              <img
                class="w-12 h-12 rounded-3xl bg-blend-darken"
                alt="Tailwind CSS Navbar component"
                src="../assets/img/profile_image.jpg"
              />
              <a class="btn btn-ghost text-xl">Polandos</a>
            </div>
          </div>
          <div class="flex items-center justify-end gap-3">
            <div>
              <button
                @click="store.toggleWeatherCondition"
                :class="{
                  'animate__animated animate__fadeIn': store.weatherCondition,
                }"
              >
                <span v-if="store.isClearNight">
                  <Icon
                    name="material-symbols-light:shield-moon-outline"
                    size="34px"
                  />
                </span>
                <span v-else-if="store.isClearDay">
                  <Icon name="material-symbols-light:sunny" size="34px" />
                </span>
              </button>
            </div>
            <div>
              <button @click="store.toggleDrawer">
                <span :class="{ hidden: store.isDrawerOpen === true }">
                  <Icon name="system-uicons:menu-hamburger" size="34px" />
                </span>
              </button>
              <button @click="store.toggleDrawer">
                <span :class="{ hidden: store.isDrawerOpen === false }">
                  <Icon name="tabler:playlist-x" size="34px" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="drawer z-10">
      <input
        id="my-drawer"
        type="checkbox"
        class="drawer-toggle"
        v-model="store.isDrawerOpen"
      />
      <div class="drawer-content"></div>
      <div class="drawer-side">
        <label
          class="drawer-overlay"
          for="my-drawer"
          aria-label="close sidebar"
        ></label>
        <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li v-for="link in links" :key="link.name">
            <span
              @click="store.isDrawerOpen = false"
              class="w-full hover:bg-slate-400 rounded-2xl p-2"
            >
              <NuxtLink :to="link.path">{{ link.name }}</NuxtLink>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
const store = useMyStore();

const links = ref([
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  // { name: "Projects", path: "/projects" },
  { name: "Comments", path: "/comments" },
]);
</script>
