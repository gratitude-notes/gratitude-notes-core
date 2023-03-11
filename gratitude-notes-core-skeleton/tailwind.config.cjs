/** @type {import('tailwindcss').Config} */

const positionPercentSafelist = [];

for (let i = 1; i < 101; i++) {
  positionPercentSafelist.push(`left-${i}%`);
  positionPercentSafelist.push(`top-${i}%`);
}

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: 
    positionPercentSafelist,
    pattern: /bg-(red|yellow|green)-(400)/,
  theme: {
    extend: {
      fontFamily: {
        myRoboto: ["Roboto", "sans-serif"],
        myClimateCrisis: ["Climate Crisis", "cursive"]
      }
    },
  },
  plugins: [
    require('./tailwind/percentageProperty.cjs')
  ],
  darkMode: 'class'
}
