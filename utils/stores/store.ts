import { defineStore } from 'pinia';

interface MyState {
  weatherCondition: boolean;
  isDrawerOpen: boolean;
  theme: string[];
  selectedTheme: string;
}

export const useMyStore = defineStore({
  id: 'myStore',
  state: (): MyState => ({
    isDrawerOpen: false,
    weatherCondition: false,
    theme: ["lofi", "forest"],
    selectedTheme: 'forest',
  }),
  getters: {
    isClearDay: state => state.weatherCondition === true,
    isClearNight: state => state.weatherCondition === false
  },
  actions: {
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
      console.log('hello world', this.isDrawerOpen)
    },
    toggleWeatherCondition() {
      this.weatherCondition = !this.weatherCondition;
      this.selectedTheme = this.weatherCondition ? this.theme[0] : this.theme[1];
    }
  },
});
