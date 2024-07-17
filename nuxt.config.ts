// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      GH_TOKEN: process.env.VERCEL_ENV_NUXT_PUBLIC_GH_TOKEN,
      FIREBASE_API_KEY: process.env.VERCEL_ENV_NUXT_PUBLIC_API_KEY,
      FIREBASE_PUBLIC_AUTH_DOMAIN: process.env.VERCEL_ENV_NUXT_PUBLIC_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.VERCEL_ENV_NUXT_PUBLIC_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.VERCEL_ENV_NUXT_PUBLIC_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.VERCEL_ENV_NUXT_PUBLIC_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.VERCEL_ENV_NUXT_PUBLIC_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.VERCEL_ENV_NUXT_PUBLIC_MEASUREMENT_ID,
      FIREBASE_DATABASE_URL : process.env.VERCEL_ENV_NUXT_PUBLIC_DATABASE_URL
    },
  },
  css: [
    '@/assets/css/main.css',
  ],
  plugins: [
    { src: '~/plugins/firebase.ts', mode: 'client' },
  ],
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@pinia/nuxt', 'nuxt-marquee'],
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