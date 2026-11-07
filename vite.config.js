import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

// base "/" assumes the site is served from the root of its custom domain.
export default defineConfig({
  base: "/",
  // The homepage uptime counts from this build, which CI runs on every deploy.
  define: { "import.meta.env.VITE_BUILT_AT": JSON.stringify(Date.now()) },
  plugins: [wasm(), topLevelAwait()],
});
