import en from "@/locales/en.json";

export default defineI18nConfig(() => ({
  legacy: false,
  defaultLocale: "en",
  locale: "en",
  messages: {
    en,
  },
  warnHtmlInMessage: false,
}));
