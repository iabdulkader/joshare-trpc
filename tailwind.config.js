/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    './src/public/index.html',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bg: {
          light: "#fafaf9",
          dark: "#212f4d",
        },
        secondaryBg: {
          light: "#ececec",
          dark: "#1b2640",
        },
        fontFamily: {
          'poppins': ['Poppins', 'sans-serif'] 
        },
        cardBg:{
          light: "#e6e6e4",
          dark: "#182238",
        }

        
      }
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true }), ],
}