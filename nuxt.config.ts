// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  routeRules: {
    '/': { ssr: false },
    '/monsters/generator': { ssr: false },
  },
  modules: [
    '@vue-macros/nuxt',
    // ...
  ],
  css: ["@/assets/css-reset.css"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import '@/assets/main.scss';"
        }
      }
    },
  }
}
