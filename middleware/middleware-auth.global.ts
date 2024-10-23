export default defineNuxtRouteMiddleware(async (to) => {
  const store = useMyStore();
  await store.fetchUserFromLocalStorage();
  
  let isLoggedIn = store.IsLoggedIn;
  let userId = store.userData?.id;

  if (!isLoggedIn && to.path.startsWith('/playgrounds/user-')) {
    return await navigateTo('/playgrounds');
  }

  if (isLoggedIn) {
    if (to.path.startsWith('/playgrounds/user-')) {
      const targetUserId = to.params.id;

      if (targetUserId && targetUserId !== String(userId)) {
        await store.logOut();
        return await navigateTo('/playgrounds');
      }
    }

    if (to.path === '/playgrounds') {
      return await navigateTo(`/playgrounds/user-${userId}`);
    }
    
    if (!to.path.startsWith('/playgrounds')) {
      await store.logOut();
      return await navigateTo('/playgrounds');
    }
  }
});

