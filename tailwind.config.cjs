/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        arabic: ["Tajawal", "sans-serif"],
        "arabic-text": ["Amiri", "serif"],
      },
    },
  },
  plugins: [],
};
