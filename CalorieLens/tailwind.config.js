/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        secondary: {
          DEFAULT: "#10D29A",
          100: "#FF9001",
          200: "#FF8E01",
        }
      },
      fontFamily: {
        sfregular: ['SFProText-Regular'],
      }
    },
  },
  plugins: [],
}

