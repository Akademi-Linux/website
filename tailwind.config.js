import { addDynamicIconSelectors } from "@iconify/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.ts"],
  theme: {
    extend: {
      colors: {
        al: {
          bg: "#0a0a0a",
          surface: "#0d1117",
          elevated: "#161b22",
          border: "#30363d",
          text: "#e6edf3",
          muted: "#8b949e",
          brand: "#1cb900",
          term: "#22c55e",
          glow: "#4ade80",
          warn: "#f59e0b",
          error: "#f85149",
          info: "#58a6ff",
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', '"Source Code Pro"', "ui-monospace", "monospace"],
      },
      textShadow: {
        sm: "0 0 4px rgb(74 222 128 / .5)",
        md: "0 0 6px rgb(74 222 128 / .6), 0 0 18px rgb(28 185 0 / .35)",
      },
      keyframes: {
        blink: { "50%": { opacity: "0" } },
        offline: {
          "0%,100%": { opacity: "1", boxShadow: "0 0 0 0 rgb(245 158 11 / .45)" },
          "50%": { opacity: ".6", boxShadow: "0 0 0 10px rgb(245 158 11 / 0)" },
        },
        load: { "0%": { width: "8%" }, "60%": { width: "62%" }, "100%": { width: "38%" } },
        rise: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        caret: "blink 1.06s steps(1) infinite",
        offline: "offline 2s ease-in-out infinite",
        load: "load 6s ease-in-out infinite alternate",
        rise: "rise 240ms cubic-bezier(.2,.8,.2,1)",
      },
      transitionTimingFunction: { term: "cubic-bezier(.2,.8,.2,1)" },
    },
  },
  plugins: [
    // Icons are written into the CSS at build time: no runtime script or CDN request.
    addDynamicIconSelectors(),
    ({ matchUtilities, theme }) =>
      matchUtilities({ "text-glow": (value) => ({ textShadow: value }) }, { values: theme("textShadow") }),
  ],
};
