/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        iPhone: "375px",
        Icons: "688px",
        Search: "940px",
        xs: "450px",
      },
      colors: {
        brandDark: "#587792",
        brandMedium: "#8db1ab",
        brandLight: "#cee397",
        surface: "#212529",
        surface2: "var(--surface-2)",
      },

      width: {
        120: "120%",
      },
      height: {
        120: "120%",
      },
      inset: {
        "-10": "-10%",
      },
      borderRadius: {
        100: "100%",
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
        glow1: "glow1 4s linear infinite",
        glow2: "glow2 4s linear infinite",
        glow3: "glow3 4s linear infinite",
        glow4: "glow4 4s linear infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        glow1: {
          "0%": { transform: "translate(10%, 10%) scale(1)" },
          "25%": { transform: "translate(-10%, 10%) scale(1)" },
          "50%": { transform: "translate(-10%, -10%) scale(1)" },
          "75%": { transform: "translate(10%, -10%) scale(1)" },
          "100%": { transform: "translate(10%, 10%) scale(1)" },
        },
        glow2: {
          "0%": { transform: "translate(-10%, -10%) scale(1)" },
          "25%": { transform: "translate(10%, -10%) scale(1)" },
          "50%": { transform: "translate(10%, 10%) scale(1)" },
          "75%": { transform: "translate(-10%, 10%) scale(1)" },
          "100%": { transform: "translate(-10%, -10%) scale(1)" },
        },
        glow3: {
          "0%": { transform: "translate(-10%, 10%) scale(1)" },
          "25%": { transform: "translate(-10%, -10%) scale(1)" },
          "50%": { transform: "translate(10%, -10%) scale(1)" },
          "75%": { transform: "translate(10%, 10%) scale(1)" },
          "100%": { transform: "translate(-10%, 10%) scale(1)" },
        },
        glow4: {
          "0%": { transform: "translate(10%, -10%) scale(1)" },
          "25%": { transform: "translate(10%, 10%) scale(1)" },
          "50%": { transform: "translate(-10%, 10%) scale(1)" },
          "75%": { transform: "translate(-10%, -10%) scale(1)" },
          "100%": { transform: "translate(10%, -10%) scale(1)" },
        },
      },
    },
  },
  variants: {},
  plugins: [],
}
