import type { Shell } from "./wasm/pkg/shell";

let shell: Shell | null = null;
let loading: Promise<Shell> | null = null;

/** The shell if it has loaded. Lets callers stay synchronous inside a user gesture. */
export const currentShell = (): Shell | null => shell;

export function loadShell(): Promise<Shell> {
  loading ??= import("./wasm/pkg/shell.js")
    .then((module) => {
      // vite-plugin-wasm initializes the binary when this chunk is imported.
      shell = new module.Shell();
      return shell;
    })
    .catch((error) => {
      loading = null; // Allows a retry the next time the prompt opens.
      throw error;
    });
  return loading;
}
