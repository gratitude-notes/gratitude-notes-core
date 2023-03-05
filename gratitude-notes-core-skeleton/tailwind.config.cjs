/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'opensans' : ['Open Sans']
      },
      borderBottomWidth: {
        'b-1': '1px',
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}
