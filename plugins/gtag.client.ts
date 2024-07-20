// plugins/gtag.client.ts
export default defineNuxtPlugin((nuxtApp) => {
    const { GTAG_ID } = useRuntimeConfig().public;
  

    window.dataLayer = window.dataLayer || [];

    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
  
    gtag("js", new Date());
    gtag("config", GTAG_ID);
  
    // Inject the gtag script
    useHead({
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`,
          async: true,
        },
      ],
    });
  });
  