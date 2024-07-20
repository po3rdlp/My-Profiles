// plugins/gtag.client.ts
export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const gtagId = config.public.GTAG_ID
  

    window.dataLayer = window.dataLayer || [];

    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
  
    gtag("js", new Date());
    gtag("config", gtagId);
  
    // Inject the gtag script
    useHead({
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`,
          async: true,
        },
      ],
    });
  });
  