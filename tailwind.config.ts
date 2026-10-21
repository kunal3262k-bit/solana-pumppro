import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#090a0f",
        surface: "#12141c",
        "surface-card": "#181a24",
        "surface-border": "#232634",
        brand: {
          green: "#10b981",
          emerald: "#059669",
          neon: "#00ff88",
          purple: "#8b5cf6",
          cyan: "#06b6d4",
          red: "#f43f5e",
        },
      },
    },
  },
  plugins: [],
};
export default config;
