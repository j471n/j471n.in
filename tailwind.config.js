module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      exo: ['"Exo 2"', "sans-serif"],
      merriweather: ["Merriweather", "sans-serif"],
    },
    extend: {
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
      },
    },
    variants: {
      extend: {},
    },
    plugins: [require("tailwind-scrollbar-hide")],
  },
};
