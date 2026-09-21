/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './constants/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E8590C',
        background: '#FFF8F2',
        surface: '#FFFFFF',
        muted: '#868E96',
      },
    },
  },
  plugins: [],
};

