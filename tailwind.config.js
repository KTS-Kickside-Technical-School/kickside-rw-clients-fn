/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',
        secondary: '#1E40AF',
        accent: '#10B981',
      },
    },
  },
  plugins: [],
};
