// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon'],
  devServer: {
    port: 5173,
  },
  //head management
  app : {
    head : {
      title: 'Profiles',
      link: [
        {rel:"preconnect", href:"https://fonts.googleapis.com"},
        {rel:'preconnect', href:'https://fonts.gstatic.com', crossorigin:'anonymous'},
        {href:"https://fonts.googleapis.com/css2?family=Sora:wght@100&display=swap", rel:"stylesheet"},
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  }
})