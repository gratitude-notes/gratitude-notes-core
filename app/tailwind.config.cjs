/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    {
      pattern: /(top|left)-(0|[1-9][0-9]?|100)%/ //,
      // variants: ['lg', 'sm', 'hover']
    }
  ],
  theme: {
    extend: {
      fontFamily: {
        myRoboto: ["Roboto", "sans-serif"],
        myClimateCrisis: ["Climate Crisis", "cursive"]
      },
      colors: {
        'turquoise-surf': '#00BCD4'
      }
    },
  },
  plugins: [
    require('./tailwind/percentageProperty.cjs'),
    require('tailwind-scrollbar')
  ],
  darkMode: 'class'
}
