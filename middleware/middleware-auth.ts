export default defineNuxtRouteMiddleware(async (to) => {
  const store = useMyStore();
  
  let isLoggedIn = false;
  let userId = null;

  if (process.client) {
    isLoggedIn = localStorage.getItem("IsLoggedIn") === "true";
    userId = store.userData?.id;
  }


  if (!isLoggedIn && to.path.startsWith("/playgrounds/")) {
    return navigateTo("/playgrounds");
  }


  if (isLoggedIn && to.path.startsWith("/playgrounds/user-")) {
    const targetUserId = to.params.id;


    // Ensure correct comparison of user IDs
    if (targetUserId && targetUserId !== String(userId)) {

      await store.logOut();
      return navigateTo("/playgrounds");
    }
  }

  // Redirect to user's playground if on /playgrounds
  if (isLoggedIn && to.path === "/playgrounds") {
    return navigateTo(`/playgrounds/user-${userId}`);
  }
});
