import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "target", "src/wasm/pkg", "akademi-linux-logo"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { files: ["src/**/*.ts"], languageOptions: { globals: globals.browser } },
  { files: ["scripts/**/*.js", "*.config.js"], languageOptions: { globals: globals.node } },
);
