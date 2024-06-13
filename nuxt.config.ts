// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    pageTransition: { name: "fade-quick", mode: "out-in" },
    layoutTransition: { name: "fade-quick", mode: "out-in" },
  },
  spaLoadingTemplate: "public/spa-loading-template.html",
  routeRules: {
    "/": { ssr: false },
    "/monsters/generator": { ssr: false },
    "/login": { ssr: false },
    "/registration": { ssr: false },
    "/user-reactivation": { ssr: false },
    "/verify-email": { ssr: false },
    "/terms-of-service": { ssr: false },
    "/privacy-policy": { ssr: false },
    "/reset-password": { ssr: false },
    // "/api/**": { proxy:`${process.env.API_URL}/**` },
  },
  devServer: {
    port: 3001,
  },
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
  },
  nitro: {
    compressPublicAssets: true,
    devProxy: {
      "/api": {
        target: process.env.API_URL,
        changeOrigin: true,
        prependPath: true,
      },
    },
  },
  devtools: {
    enabled: false,
  },
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
    "nuxt-icon",
  ],
  i18n: {
    locales: ["en"], // used in URL path prefix
    defaultLocale: "en",
    vueI18n: "./locales/i18n.config.ts",
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
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
