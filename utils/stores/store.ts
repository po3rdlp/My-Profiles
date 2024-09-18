import { defineStore } from "pinia";

interface MyState {
  weatherCondition: boolean;
  isDrawerOpen: boolean;
  theme: string[];
  selectedTheme: string;
}

export const useMyStore = defineStore({
  id: "myStore",
  state: (): MyState => ({
    isDrawerOpen: false,
    weatherCondition: false,
    theme: ["acid", "night"],
    selectedTheme: "night", // Default
  }),
  getters: {
    isClearDay: (state) => state.weatherCondition === true,
    isClearNight: (state) => state.weatherCondition === false,
  },
  actions: {
    initialize() {
      if (process.client) {
        const savedTheme = localStorage.getItem("selectedTheme");
        if (savedTheme) {
          this.selectedTheme = savedTheme;
        }
      }
    },
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
    },
    toggleWeatherCondition() {
      this.weatherCondition = !this.weatherCondition;
      this.selectedTheme = this.weatherCondition
        ? this.theme[0]
        : this.theme[1];

      if (process.client) {
        localStorage.setItem("selectedTheme", this.selectedTheme);
      }
    },
  },
});
