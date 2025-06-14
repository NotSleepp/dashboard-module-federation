/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cmyk", "sunset"],
    darkTheme: "sunset",
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
}