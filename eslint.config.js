// https://ota-meshi.github.io/eslint-plugin-astro/user-guide/
import eslintPluginAstro from "eslint-plugin-astro";
export default [
  ...eslintPluginAstro.configs["flat/recommended"],
  ...eslintPluginAstro.configs["flat/jsx-a11y-strict"],
  {
    rules: {
      // override/add rules settings here, such as:
      "astro/no-set-html-directive": "error",
      "no-var": "error",
    },
  },
];
