import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,mdx}",
  ],
  theme: {
    extend: {
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
