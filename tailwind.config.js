module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      sarina: ["Sarina", "cursive"],
      barlow: ["Barlow", "sans-serif"],
      mono: ["monospace"],
    },
    extend: {
      colors: {
        darkPrimary: "#181A1B",
        darkSecondary: "#25282A",
        darkWhite: "#f2f5fa",
        "dark-3": "#b8b8b8",
      },
      listStyleType: {
        square: "square",
        roman: "upper-roman",
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        "photo-spin": "photo-spin 2s 1 linear forwards",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "photo-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      screens: {
        "3xl": "2000px",
        xs: "480px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
