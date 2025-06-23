import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        neue: ['"Neue Haas"', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.scrollbar-transparent::-webkit-scrollbar': {
          'background-color': 'transparent',
        },
      });
    }),
  ],
}
