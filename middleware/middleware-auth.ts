export default defineNuxtRouteMiddleware( async (to) => {
  const store = useMyStore()
  let IsLoggedIn = null;
  let userId = null;
    
  if (process.client) {
    IsLoggedIn = localStorage.getItem("IsLoggedIn");
    userId = localStorage.getItem("userId");
  }

  if (IsLoggedIn === "false" && to.path.startsWith("/playgrounds/")) {
    return navigateTo("/playgrounds");
  }

  if (IsLoggedIn === "true" && to.params.id !== userId && to.path.startsWith("/playgrounds/user-")) {
    if (to.params.id !== userId) {
      return await store.logOut();
    }
  }

  if (IsLoggedIn === "true" && to.path === "/playgrounds") {
    return navigateTo(`/playgrounds/user-${userId}`);
  }
});
