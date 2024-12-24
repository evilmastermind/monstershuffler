// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    pageTransition: { name: "fade-quick", mode: "out-in" },
    layoutTransition: { name: "fade-quick", mode: "out-in" },
    head: {
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
  },
  // ssr: false,
  spaLoadingTemplate: "public/spa-loading-template.html",
  routeRules: {
    "/": { swr: 600 },
    "/monsters/generator": { ssr: false },
    "/monsters/generator/**": { ssr: false },
    "/login": { swr: 600 },
    "/registration": { swr: 600 },
    "/user-reactivation": { swr: 600 },
    "/verify-email": { swr: 600 },
    "/terms-of-service": { swr: 600 },
    "/privacy-policy": { swr: 600 },
    "/reset-password": { swr: 600 },
    // "/api/**": { proxy:`${process.env.API_URL}/**` },
  },
  devServer: {
    port: 3001,
  },
  devtools: {
    enabled: false,
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

  // devtools: {
  //   enabled: false,
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
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "floating-vue/nuxt",
    "@kgierke/nuxt-basic-auth",
  ],

  basicAuth: {
    enabled: true,
    users: [
      {
        username: "test",
        password: "me",
      },
    ],
    // Optional: Delimiter for users string
    // usersDelimiter: ",",
    // Optional: Whitelist routes
    // allowedRoutes: ["/api/.*"],
  },

  i18n: {
    locales: ["en"], // used in URL path prefix
    defaultLocale: "en",
    vueI18n: "./plugins-other/i18n.config.ts",
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  imports: {
    // Auto-import pinia stores defined in `~/stores`
    dirs: ["stores"],
  },
  compatibilityDate: "2024-07-16",
});
