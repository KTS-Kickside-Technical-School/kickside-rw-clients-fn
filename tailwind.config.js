/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3E60F4',
        secondary: '#4C94E7',
        accent: '#14D163',
        dark: "#000000",
        graytext: "#D8D8D8",
        yellow: "#FFFF00"
      },
    },
  },
  plugins: [],
};
