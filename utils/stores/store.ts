import { defineStore } from "pinia";
import { apiSC, apiSCAuth } from "~/services/api/api.config";

interface MyState {
  weatherCondition: boolean;
  isDrawerOpen: boolean;
  theme: string[];
  selectedTheme: string;

  // auth
  isLoggedIn: boolean;
  userId: number | null;
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
    userId: null,
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
        const LoggedIn = localStorage.getItem('LoggedIn');
        if (savedTheme) {
          this.selectedTheme = savedTheme;
        }
        if(token) {
          this.authToken = token;
        }
        if(LoggedIn !== null) {
          this.isLoggedIn = LoggedIn === 'true'
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
          localStorage.setItem('LoggedIn', this.isLoggedIn ? 'true' : 'false');

        }
        this.isLoggedIn = true
        this.IsLoading = false;
        this.userId = response.data.id;
        console.log('data login', response.data)
        window.location.reload();
        
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
            console.log('validate token',response.data);

            if (response.data.message === 'Token is valid') {
              this.isLoggedIn = true
              // navigateTo(`/playgrounds/${response.data.user.user.id}/home`)
            }
            console.log(this.isLoggedIn);
          } catch (err: any) {
            console.log("terjadi kesalahan", err.response.data)
            this.isLoggedIn = false;
            if(process.client) {
              localStorage.removeItem('access_token')
              window.location.reload();
            }
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
