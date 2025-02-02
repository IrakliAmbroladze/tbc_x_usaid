import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: {
        text: "1px 1px 1px black, 0 0 1px black, 0 0 2px black",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".text-shadow": {
          textShadow: "1px 1px 1px black, 0 0 1px black, 0 0 2px black",
        },
      });
    }),
  ],
  darkMode: "class",
};

export default config;
