/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      lineClamp: {
        999: "999"
      }
    },
  },
  plugins: [],
}

