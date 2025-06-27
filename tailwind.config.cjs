/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,astro}",
    "./components/**/*.{js,ts,jsx,tsx,astro}",
  ],
  theme: {
    extend: {
      colors: {
        orangekraze: "#ffaa4d",
      },
    },
  },
  plugins: [],
};
