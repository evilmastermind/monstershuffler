import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import it from "@/locales/it.json";

type MessageSchema = typeof en; 
const i18n = createI18n<[MessageSchema], "en" | "it">({
  locale: "en",
  messages: {
    en: en,
    it: it,
  }
});

const app = createApp(App);
const pinia = createPinia();
app
  .use(pinia)
  .use(i18n)
  .mount("#app")
;