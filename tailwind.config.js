/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: '#0F4C81',
        coral: '#FF6F61',
        zest: '#F4D03F',
      },
      fontFamily: {
        retro: ['"Press Start 2P"', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        retro: '4px 4px 0px 0px rgba(0,0,0,1)',
        'retro-active': '2px 2px 0px 0px rgba(0,0,0,1)',
      }
    },
  },
  plugins: [],
}