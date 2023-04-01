/* eslint-disable @typescript-eslint/no-var-requires,no-undef */
/** @type {import('tailwindcss').Config} */

const { scale } = require('./tw-utils');

module.exports = {
  content: [
    "./app.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./views/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: scale('#0474e4', -.3),
      },
    },
  },
  plugins: [],
};
