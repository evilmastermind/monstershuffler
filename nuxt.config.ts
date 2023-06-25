// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  routeRules: {
    "/": { ssr: false },
    "/monsters/generator": { ssr: false },
    "/login": { ssr: false },
    "/registration": { ssr: false },
    "/user-reactivation": { ssr: false },
    "/verify-email": { ssr: false },
    "/terms-of-service": { ssr: false },
    "/privacy-policy": { ssr: false },
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
  modules: [
    "@vue-macros/nuxt",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "nuxt-purgecss",
    "@nuxtjs/tailwindcss",
  ],
  i18n: {
    locales: ["en"], // used in URL path prefix
    defaultLocale: "en",
    vueI18n: "./plugins/i18n.config.ts",
    precompile: { strictMessage: false, escapeHtml: false },
  },
  pinia: {
    autoImports: ["defineStore"],
  },
  // css: ["@/assets/css-reset.css"],
  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         additionalData: "@import '@/assets/main.scss';",
  //       },
  //     },
  //   },
  // },
  imports: {
    // Auto-import pinia stores defined in `~/stores`
    dirs: ["stores"],
  },
  // Defaults options
  // tailwindcss: {
  //   cssPath: "~/assets/css/tailwind.css",
  //   configPath: "tailwind.config",
  //   exposeConfig: false,
  //   exposeLevel: 2,
  //   injectPosition: "first",
  //   viewer: true,
  // },
});
