/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: '#849b87',
        terracotta: '#c07a60',
        cream: '#f3e9d2',
        gold: '#d4af37',
        stone: {
          50: '#faf9f6',
        }
      }
    },
  },
  plugins: [],
}
