/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["src/**/*.{js,jsx}", "components/**/*.{js,jsx}"],
  theme: {
    extend: {
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms'),require("tailwindcss-animate")],
}
