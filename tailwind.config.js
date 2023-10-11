/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      'xl-1440': '1440px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: '#D3352A',
        secondary: '#030616',
        grayText: '#808080',
      }
    },
  },
  plugins: [],
}

