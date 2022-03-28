const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      ...colors
    },
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontSize: {
        'md-header': '2.5rem',
        'sm-header': '2rem',
        'xs-header': '1.5rem',
        'xs': '.75rem',
        'sm': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem'
      },
      blue: {
        '50':  '#f4f8fa',
        '100': '#dbf1fb',
        '200': '#b2e0f6',
        '300': '#80c0e9',
        '400': '#4c9cd7',
        '500': '#397ac6',
        '600': '#305fb0',
        '700': '#2A91E0',
        '800': '#1c3065',
        '900': '#111e42',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
