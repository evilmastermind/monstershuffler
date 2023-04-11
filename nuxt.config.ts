// https://nuxt.com/docs/api/configuration/nuxt-config
import en from "./locales/en.json";
import eslintPlugin from "vite-plugin-eslint";

export default {
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
    }
  },
  modules: [
    "@vue-macros/nuxt",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "nuxt-purgecss",
  ],
  i18n: {
    locales: ["en"], 
    defaultLocale: "en",
    vueI18n: {
      legacy: false,
      locale: "en",
      messages: {
        en,
      }
    },
  },
  pinia: {
    autoImports: [
      "defineStore",
    ]
  },
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
};
