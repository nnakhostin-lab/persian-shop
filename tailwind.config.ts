import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B2E4A",
          light: "#123B5E",
          dark: "#071F33",
        },
        firuzeh: {
          DEFAULT: "#12A594",
          light: "#3FC7B6",
          dark: "#0B7A6D",
        },
        gold: {
          DEFAULT: "#C9962C",
          light: "#E0B45B",
        },
        rose: {
          DEFAULT: "#D95F6C",
          light: "#F3D9DB",
        },
        cream: "#F7F3EA",
        ink: "#12233B",
      },
      fontFamily: {
        vazir: ["var(--font-vazir)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
