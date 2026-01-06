import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        primary: "#3b82f6",
        "primary-dark": "#2563eb",
        success: "#10b981",
        danger: "#ef4444",
        sidebar: "#0f172a",
      }
    },
  },
  plugins: [],
};
export default config;