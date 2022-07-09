/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    daisyui: {
    themes: [ "lofi"],
  },
    extend: {},
  },
  plugins: [require("daisyui")],
}
