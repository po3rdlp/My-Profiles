// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      GH_TOKEN: process.env.VERCEL_ENV_NUXT_PUBLIC_GH_TOKEN,
    },
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@pinia/nuxt',],
  pinia: {
    storesDirs: ['./stores/**', './utils/stores/**'],
  },
  devServer: {
    port: 5173,
    host: '0.0.0.0'
  },
  //head management
  app : {
    head : {
      title: 'Profiles',
      link: [
        { rel: 'icon', type: 'image/png', href:"/astronaut.png"},
        {rel:'preconnect', href:'https://fonts.googleapis.com'},
        {rel:'preconnect', href:'https://fonts.gstatic.com', crossorigin:'anonymous'},
        {href:'https://fonts.googleapis.com/css2?family=Sora:wght@100&display=swap', rel:'stylesheet'},
        {rel:'stylesheet', href:'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'}
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  }
})