const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "cabinet-grotesk": ["Cabinet Grotesk", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.5715" }],
        base: ["1rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        lg: ["1.125rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        xl: ["1.25rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        "2xl": ["1.5rem", { lineHeight: "1.415", letterSpacing: "-0.01em" }],
        "3xl": ["1.875rem", { lineHeight: "1.333", letterSpacing: "-0.01em" }],
        "4xl": ["2.25rem", { lineHeight: "1.277", letterSpacing: "-0.01em" }],
        "5xl": ["3rem", { lineHeight: "1", letterSpacing: "-0.01em" }],
        "6xl": ["3.75rem", { lineHeight: "1", letterSpacing: "-0.01em" }],
        "7xl": ["5.5rem", { lineHeight: "1", letterSpacing: "-0.01em" }],
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.01em",
        wider: "0.02em",
        widest: "0.4em",
      },
      colors: {
        'gsBlue': '#A2D2FF',
        'gsBlueTwo': '#BDE0FE',
        'gsPink': '#FFAFCC',
        'gsPinkTwo': '#FFC8DD',
        'gsBlueThree': '#CDB4DB',
      },
    },
   
  },
  plugins: [
    // eslint-disable-next-line global-require
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("@tailwindcss/forms"),
    // add custom variant for expanding sidebar
    plugin(({ addVariant, e }) => {
      addVariant("sidebar-expanded", ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) =>
            `.sidebar-expanded .${e(
              `sidebar-expanded${separator}${className}`
            )}`
        );
      });
    }),
  ],
};
