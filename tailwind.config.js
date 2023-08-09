/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/react-tailwindcss-select/dist/index.esm.js'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        secondary: '#C4C4C4',
        secondaryLink: '#0BF0ED'
      },
      screens: {
        xs: { min: '0px', max: '639px' },
        sm: { min: '640px', max: '768px' }
      },
      borderWidth: {
        1: '1px'
      },
      container: {
        center: true,
        screen: {
          '2xl': '1216px'
        }
      }
    }
  },
  plugins: []
}
