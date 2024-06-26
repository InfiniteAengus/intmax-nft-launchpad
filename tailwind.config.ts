import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "2xl": { max: "1800px" },
      xl: { max: "1535px" },
      lg: { max: "1279px" },
      md: { max: "1023px" },
      sm: { max: "767px" },
      xs: { max: "575px" },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-linear": "linear-gradient(0deg, #131313, transparent)",
      },
      colors: {
        background: "#131313",
        border: "#ffffff1f",
        componentBackground: "#1b1b1b",
        textDescription: "#9b9b9b",
        white: "#fff",
        primary: "#beff58",
        error: "#fa4510",
      },
    },
  },
  plugins: [],
};
export default config;
