import { defineStore } from "pinia";
import { apiSC, apiSCAuth } from "~/services/api/api.config";

interface MyState {
  weatherCondition: boolean;
  isDrawerOpen: boolean;
  theme: string[];
  selectedTheme: string;

  // auth
  authError: string;
  IsLoading: boolean;
  IsLoggedIn: boolean;
  authToken: string;
  userData: any
}

export const useMyStore = defineStore({
  id: "myStore",
  state: (): MyState => ({
    isDrawerOpen: false,
    weatherCondition: false,
    theme: ["acid", "night"],
    selectedTheme: "night",
    authError: "",
    IsLoggedIn: false,
    IsLoading: false,
    authToken: "",
    userData: null,
  }),
  getters: {
    isClearDay: (state) => state.weatherCondition === true,
    isClearNight: (state) => state.weatherCondition === false,
  },
  actions: {
    async initialize() {
      if (process.client) {
        const savedTheme = localStorage.getItem("selectedTheme");
        const token = localStorage.getItem("access_token");
        const loggedIn = localStorage.getItem("IsLoggedIn")
        const userData = localStorage.getItem("user");
        
        if (savedTheme) {
          this.selectedTheme = savedTheme;
        }
        if (token) {
          this.authToken = token;
          this.IsLoggedIn = true;
        }
        if (userData) {
          this.userData = JSON.parse(userData)
        }
        if(loggedIn) {
          this.IsLoggedIn = loggedIn === 'true'; 
        }
      }
    },
    async toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
    },
     async toggleWeatherCondition() {
      this.weatherCondition = !this.weatherCondition;
      this.selectedTheme = this.weatherCondition
        ? this.theme[0]
        : this.theme[1];

      if (process.client) {
        localStorage.setItem("selectedTheme", this.selectedTheme);
      }
    },
    async loginUser(username: string, password: string) {
      this.IsLoading = true;
      try {
        const response = await apiSCAuth.post("/dev/v1/auth/login", {
          userName: username,
          password: password,
        });
        const token = response.data.access_token;
        const userdata = response.data?.user
        this.userData = userdata

        if (process.client) {
          localStorage.setItem("access_token", token);
          localStorage.setItem("IsLoggedIn", 'true');
          localStorage.setItem("user", JSON.stringify(userdata));
        } 

        this.IsLoading = false;

        await navigateTo(`/playgrounds/user-${userdata?.id}/`);
        
        return response.data
      } catch (err: any) {
        console.log("Login Gagal: ", err.response.data.message);
        this.authError = `Error: ${err.response.data.message}`;
        this.IsLoading = false;
        this.IsLoggedIn = false
      }
    },
    async checkToken() {
      if (this.authToken === "" || this.authToken === null) {
        console.log("Belum Ada Token");
      } else {
        try {
          const response = await apiSC.get("/dev/v1/auth/validate-token", {
            headers: {
              Authorization: `Bearer ${this.authToken}`,
            },
          });
          console.log("validate token", response.data);

        } catch (err: any) {
          console.log("terjadi kesalahan", err.response.data);

          if (process.client) {
            localStorage.removeItem("access_token");
            localStorage.setItem("IsLoggedIn", 'false');
            this.IsLoggedIn = false;
            
            await useRouter().push('/playgrounds').then(() => {
              window.location.reload();
            })
          }
        }
      }
    },
    async logOut() {
      if (process.client) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        localStorage.setItem("IsLoggedIn", 'false');
      }
      await useRouter().push('/playgrounds').then(() => {
        window.location.reload()
      })
    },
  },
});
