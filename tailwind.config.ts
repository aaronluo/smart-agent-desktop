import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#F6F3F0",
          50: "#FDFCFB",
          100: "#F6F3F0",
          200: "#EDE9E5",
          300: "#E5E0DB",
        },
        midnight: {
          DEFAULT: "#0E1020",
          50: "#3D415E",
          100: "#2E3148",
          200: "#1F2236",
          300: "#151825",
          400: "#0E1020",
          500: "#0B0D1A",
          600: "#080A12",
          700: "#05060C",
          800: "#020306",
          900: "#000000",
        },
        "true-blue": "#4995FF",
        royal: "#004AAC",
        red: "#D14600",
        gold: "#FFAE41",
        sky: "#A1E6FF",
        peach: "#FFC982",
        melon: "#FF7E51",
      },
      fontFamily: {
        display: ["GT Standard", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
