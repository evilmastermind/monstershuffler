import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import it from "@/locales/it.json";
import router from "@/router";
import "@/assets/css-reset.css";
// import "@/assets/tailwind.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faDiceD20,faUserEdit,faUser,faUsers,faCog } from "@fortawesome/free-solid-svg-icons";
//import "bulma/css/bulma.css";
//import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

library.add(faDiceD20,faUserEdit,faUser,faUsers,faCog);

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
  .component("FontAwesomeIcon", FontAwesomeIcon)
  .use(router)
  .use(pinia)
  .use(i18n)
  .mount("#app")
;