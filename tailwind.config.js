/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        text: "1px 1px 1px black, 0 0 1px black, 0 0 2px black",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-shadow": {
          textShadow: "1px 1px 1px black, 0 0 1px black, 0 0 2px black",
        },
        ".text-shadow-white": {
          textShadow: "1px 1px 1px white, 0 0 1px white, 0 0 2px white",
        },
      });
    },
  ],
  darkMode: "class",
};
