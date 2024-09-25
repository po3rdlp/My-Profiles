import { defineStore } from "pinia";
import { apiSC, apiSCAuth } from "~/services/api/api.config";

interface MyState {
  weatherCondition: boolean;
  isDrawerOpen: boolean;
  theme: string[];
  selectedTheme: string;

  // auth
  isLoggedIn: boolean;
  authError: string;
  IsLoading: boolean;
  authToken: string;
}


export const useMyStore = defineStore({
  id: "myStore",
  state: (): MyState => ({
    isDrawerOpen: false,
    weatherCondition: false,
    theme: ["acid", "night"],
    selectedTheme: "night",
    isLoggedIn: false,
    authError: "",
    IsLoading: false,
    authToken: "",
  }),
  getters: {
    isClearDay: (state) => state.weatherCondition === true,
    isClearNight: (state) => state.weatherCondition === false,
    setLoggedIn: (state) => state.isLoggedIn === true
  },
  actions: {
    initialize() {
      if (process.client) {
        const savedTheme = localStorage.getItem("selectedTheme");
        const token = localStorage.getItem("access_token");
        if (savedTheme) {
          this.selectedTheme = savedTheme;
        }
        if(token) {
          this.authToken = token;
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
    async loginUser(username: string, password: string) {
      this.IsLoading = true
      try {
        const response = await apiSCAuth.post('/dev/v1/auth/login', {
          userName: username,
          password: password
        });
        const token = response.data.access_token
        if(process.client) {
          localStorage.setItem('access_token', token);
        }
        this.isLoggedIn = true
        this.IsLoading = false;

        return response.data
      } catch (err: any) {
        console.log('Login Gagal: ', err.response.data.message);
        this.authError = `Error: ${err.response.data.message}`
        this.IsLoading = false;
      }
    },
    async checkToken() {
        if(this.authToken === "" || this.authToken === null) {
          this.isLoggedIn = false;
          console.log('Belum ada token')
        } else {
          try {
            const response = await apiSC.get('/dev/v1/auth/validate-token', {
              headers: {
                Authorization: `Bearer ${this.authToken}`
              }
            })
            console.log(response.data.message);
            this.isLoggedIn = true
          } catch (err: any) {
            console.log("terjadi kesalahan", err.response.data)
            this.isLoggedIn = false;
          }
        }
    },
    async logOut() {
      if(process.client) {
        localStorage.removeItem("access_token")
      }
      this.isLoggedIn = false;
      window.location.reload();
    }
  },
});
