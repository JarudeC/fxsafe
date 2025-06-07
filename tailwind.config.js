/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#006C6F',
        },
      },
    },
  },
  plugins: [],
}; 