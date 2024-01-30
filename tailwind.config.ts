import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      flex: {
        "2": "0 1 250px",
      },
      screens: {
        desktopequeno: { max: "1250px" },
        tabletgrande: { max: "990px" },
        tablet: { max: "768px" },
        celulargrande: { max: "600px" },
        celularmedio: { max: "520px" },
        celularpequeno: { max: "410px" },
      },
    },
  },
  plugins: [nextui(), require("tailwind-scrollbar")],
};
export default config;
