// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default withNuxt([
  // Your custom configs here
  // ...tseslint.configs.recommended,
  // ...pluginVue.configs["flat/essential"],
  {
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/script-setup-uses-vars": "warn",
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "vue/no-deprecated-slot-attribute": "off",
    },
    ignores: ["node_modules", "dist", "public", ".nuxt"],
  },
  eslintPluginPrettierRecommended,
]);
