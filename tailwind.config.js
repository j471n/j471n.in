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
      code: ["Source Code Pro", "monospace"],
    },
    extend: {
      // typography: (theme) => ({
      //   DEFAULT: {
      //     css: {
      //       color: theme("colors.gray.700"),
      //       a: {
      //         color: theme("colors.blue.500"),
      //         "&:hover": {
      //           color: theme("colors.blue.700"),
      //         },
      //         code: { color: theme("colors.blue.400") },
      //       },
      //       "h2,h3,h4": {
      //         "scroll-margin-top": spacing[32],
      //       },
      //       thead: {
      //         borderBottomColor: theme("colors.gray.200"),
      //       },
      //       code: { color: theme("colors.pink.500") },
      //       "blockquote p:first-of-type::before": false,
      //       "blockquote p:last-of-type::after": false,
      //     },
      //   },
      //   dark: {
      //     css: {
      //       color: theme("colors.gray.200"),
      //       a: {
      //         color: theme("colors.blue.400"),
      //         "&:hover": {
      //           color: theme("colors.blue.600"),
      //         },
      //         code: { color: theme("colors.blue.400") },
      //       },
      //       blockquote: {
      //         borderLeftColor: theme("colors.gray.700"),
      //         color: theme("colors.gray.300"),
      //       },
      //       "h2,h3,h4": {
      //         color: theme("colors.gray.100"),
      //         "scroll-margin-top": spacing[32],
      //       },
      //       hr: { borderColor: theme("colors.gray.700") },
      //       ol: {
      //         li: {
      //           "&:before": { color: theme("colors.gray.500") },
      //         },
      //       },
      //       ul: {
      //         li: {
      //           "&:before": { backgroundColor: theme("colors.gray.500") },
      //         },
      //       },
      //       strong: { color: theme("colors.gray.100") },
      //       thead: {
      //         th: {
      //           color: theme("colors.gray.100"),
      //         },
      //         borderBottomColor: theme("colors.gray.600"),
      //       },
      //       tbody: {
      //         tr: {
      //           borderBottomColor: theme("colors.gray.700"),
      //         },
      //       },
      //     },
      //   },
      // }),
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
      // typography: ["dark"],
      extend: {},
    },
    plugins: [
      require("@tailwindcss/line-clamp"),
      require("@tailwindcss/typography"),
      require("tailwind-scrollbar-hide"),
    ],
  },
};
