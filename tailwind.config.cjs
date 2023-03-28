/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        'dark-purple': '#af00ff',
        grey: '#d3d5de',
        'light-purple': 'rgba(175, 0, 255, 0.31)',
        
      },

    },

    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'] 
    },
  },

  plugins: [],
};
