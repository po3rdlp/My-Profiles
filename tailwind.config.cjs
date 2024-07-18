/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {},
    fontFamily: {
      sora: ["Sora", "sans-serif"],
    },
  },
  daisyui: {
    themes: ["acid", "night"],
  },
  plugins: [require("daisyui")],
};
