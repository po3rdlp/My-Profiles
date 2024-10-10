export default defineNuxtRouteMiddleware((to) => {
  const store = useMyStore();
  console.log('Checking authentication:', store.isLoggedIn);

  // if (store.isLoggedIn && to.path === '/playgrounds') {
  //   return navigateTo('/playgrounds/[id]'); // redirect to the appropriate playground
  // }
  
  // if (!store.isLoggedIn && to.path.startsWith('/playgrounds/')) {
  //   return navigateTo('/playgrounds'); // redirect to the playgrounds listing
  // }

});
