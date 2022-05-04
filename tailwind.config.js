module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      exo: ['"Exo 2"', "sans-serif"],
      merriweather: ["Merriweather", "sans-serif"],
      "bungee-shade": ["Bungee Shade", "cursive"],
      inter: ["Inter", "sans-serif"],
      sarina: ["Sarina", "cursive"],
      "open-sans": ["Open Sans", "sans-serif"],
      barlow: ["Barlow", "sans-serif"],
    },
    extend: {
      colors: {
        darkPrimary: "#181A1B",
        darkSecondary: "#25282A",
      },
      listStyleType: {
        square: "square",
        roman: "upper-roman",
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      screens: {
        "3xl": "2000px",
        xs: "480px",
      },
    },
    variants: {
      extend: {},
    },
    plugins: [
      // require("@tailwindcss/typography"),
      require("tailwind-scrollbar-hide"),
      require("@tailwindcss/line-clamp"),
      require("@tailwindcss/typography"),
    ],
  },
};
