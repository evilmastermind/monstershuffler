// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  devServer: { port: 3001 },
  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/seo",
    "@nuxt/ui",
    "@nuxt/content",
  ],
  css: ["~/assets/css/main.css"],
  icon: {
    customCollections: [
      {
        prefix: "xxx",
        dir: "./assets/icons",
      },
    ],
  },
  i18n: {
    locales: [
      {
        code: "en",
        file: "en.json",
      },
    ],
    defaultLocale: "en",
    compilation: {
      strictMessage: false,
    },
    bundle: {
      optimizeTranslationDirective: false,
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

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },

  routeRules: {
    "/": { swr: 600 },
    "/monsters/generator": { ssr: false },
    "/monsters/generator/**": { ssr: false },
    "/blog/**": { swr: 600 },
    // "/editors": { swr: 600 },
    // "/dm-screen": { swr: 600 },
    // "/community-creations": { swr: 600 },
    // "/login": { swr: 600 },
    // "/registration": { swr: 600 },
    // "/user-reactivation": { swr: 600 },
    // "/verify-email": { swr: 600 },
    // "/terms-of-service": { swr: 600 },
    // "/privacy-policy": { swr: 600 },
    // "/reset-password": { swr: 600 },
    // "/api/**": { proxy:`${process.env.API_URL}/**` },
    // Don’t cache HTML—always revalidate
    "/**/*.html": {
      headers: {
        "cache-control": "no-cache, no-store, must-revalidate",
      },
    },
  },

  ui: {
    theme: {
      colors: [
        "primary",
        "secondary",
        "al-good",
        "al-neutral",
        "al-evil",
        "block",
        "info",
        "success",
        "warning",
        "error",
      ],
    },
  },

  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or "modern"
        },
      },
    },
  },

  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },

  spaLoadingTemplate: "public/spa-loading-template.html",
});
