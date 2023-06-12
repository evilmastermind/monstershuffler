// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  routeRules: {
    "/": { ssr: false },
    "/monsters/generator": { ssr: false },
    // "/api/**": { proxy:`${process.env.API_URL}/**` },
  },
  // nitro: {
  //   devProxy: {
  //     "/api": {
  //       target: process.env.API_URL,
  //       changeOrigin: true,
  //       prependPath: true,
  //     }
  //   }
  // },
  runtimeConfig: {
    someServerSideVariable: "some value",
    public: {
      apiUrl: process.env.API_URL,
    },
  },
  modules: ["@vue-macros/nuxt", "@nuxtjs/i18n", "@pinia/nuxt", "nuxt-purgecss"],
  i18n: {
    locales: ["en"], // used in URL path prefix
    defaultLocale: "en",
    vueI18n: "./plugins/i18n.config.ts",
    precompile: { strictMessage: false, escapeHtml: false },
  },
  pinia: {
    autoImports: ["defineStore"],
  },
  css: ["@/assets/css-reset.css"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import '@/assets/main.scss';",
        },
      },
    },
  },
});
