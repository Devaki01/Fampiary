/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        honey: {
          100: '#FEF3C7',
          500: '#F59E0B',
          600: '#D97706',
          900: '#78350F',
        }
      }
    },
  },
  plugins: [],
}
