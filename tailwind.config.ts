import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: {
        text: "1px 1px 1px black, 0 0 1px black, 0 0 2px black",
      },
      keyframes: {
        riseUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        rise: "riseUp 1s ease-out",
        rise0_25s: "riseUp 0.25s ease-out",
        rise0_5s: "riseUp 0.5s ease-out",
        rise2s: "riseUp 2s ease-out",
        rise3s: "riseUp 3s ease-out",
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
