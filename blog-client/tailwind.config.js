/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      "pesto-one": ['"Poetsen One"', "sans-serif"],
    },
    extend: {
      boxShadow: {
        panelShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
      },
    },
  },
  plugins: [],
};
