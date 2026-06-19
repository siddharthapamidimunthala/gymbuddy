import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gym: {
          red: "#ff0000",
          crimson: "#dc2626",
          black: "#000000",
          charcoal: "#111827"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 0, 0, 0.32)"
      },
      backgroundImage: {
        "red-radial": "radial-gradient(circle at 30% 20%, rgba(255,0,0,.36), transparent 32%), radial-gradient(circle at 80% 10%, rgba(220,38,38,.18), transparent 28%)"
      }
    }
  },
  plugins: []
};

export default config;
