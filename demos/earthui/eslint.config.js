// eslint.config.js
import js from "@eslint/js";
import vuePlugin from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  // 忽略文件
  {
    ignores: ["dist", "node_modules"],
  },

  // JS 基础规则
  js.configs.recommended,

  // Vue 文件
  {
    files: ["src/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      vue: vuePlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // Vue 核心推荐（手动挑选，稳定）
      "vue/no-unused-vars": "warn",
      "vue/no-mutating-props": "error",
      "vue/no-multiple-template-root": "off",
      "vue/multi-word-component-names": "off",

      // Prettier
      "prettier/prettier": "warn",
    },
  },

  // TS / JS 文件
  {
    files: ["src/*.ts", "src/*.tsx", "src/*.js"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn"],
      "prettier/prettier": "warn",
    },
  },

  // 关闭与 Prettier 冲突的规则
  prettierConfig,
];
