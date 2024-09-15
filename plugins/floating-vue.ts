import FloatingVue from "floating-vue";

export default defineNuxtPlugin(() => {
  FloatingVue.options.themes.tooltip.delay.show = 1000;
  FloatingVue.options.themes.tooltip.delay.hide = 100;
});
