import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
      },
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "prefix.stripe.com",
          },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
