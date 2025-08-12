/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Lexend",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Noto Sans",
          "Ubuntu",
          "Cantarell",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        // Brand
        primary: {
          DEFAULT: "#f58634",
          600: "#f58634",
          700: "#e37624",
          800: "#c9651a",
        },
        accent: {
          DEFAULT: "#004661",
          600: "#004661",
          700: "#003b52",
          800: "#002f41",
        },
        white: "#ffffff",

        // Semantic
        error: colors.red,
        success: colors.emerald,
        warning: colors.amber,
        info: colors.sky,
      },
    },
  },
  plugins: [],
};
