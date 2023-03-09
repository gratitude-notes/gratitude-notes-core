/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        myRoboto: ["Roboto", "sans-serif"],
        myClimateCrisis: ["Climate Crisis", "cursive"]
      },
    },
  },
  plugins: [],
  darkMode: 'class'
}
