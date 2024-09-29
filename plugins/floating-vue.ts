import FloatingVue from "floating-vue";

/**
 * in order to fix the issue of the inner menu being hidden by the overflow of the parent element
 * tweak these settings: https://floating-vue.starpad.dev/guide/config
 */

export default defineNuxtPlugin(() => {
  /**
   * TOOLTIP
   */
  const tooltipDefault = FloatingVue.options.themes.tooltip;
  const tooltipCustom = {
    delay: {
      show: 1000,
      hide: 100,
    },
    $resetCss: true,
  };
  FloatingVue.options.themes.tooltip = { ...tooltipDefault, ...tooltipCustom };

  /**
   * MENU
   */
  const menuDefault = FloatingVue.options.themes.menu;
  const menuCustom = {
    $resetCss: true,
    delay: {
      show: 0,
      hide: 100,
    },
  };
  FloatingVue.options.themes.menu = { ...menuDefault, ...menuCustom };
});
