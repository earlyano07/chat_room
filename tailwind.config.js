/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/frontend/**/*.{vue,js}',
    './app/views/**/*.erb',
    './app/helpers/**/*.rb'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}