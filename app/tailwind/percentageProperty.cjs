const plugin = require('tailwindcss/plugin')

const percentageProperty = plugin(({ e, addUtilities }) => {
  const percentList = [...Array(101).keys()]

  const newUtilities = percentList.map((x) => {
    return {
      [`.${e(`left-${x}%`)}`]: {
        'left': `${x}%`,
      },
      [`.${e(`top-${x}%`)}`]: {
        'top': `${x}%`,
      },
    }
  })

  addUtilities(newUtilities)
})

module.exports = percentageProperty