/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {},
      colors: {
        "al-primary": "#32CD32",
        "al-background": "#1E1E1E",
      },
    },
  },
  plugins: [],
};
