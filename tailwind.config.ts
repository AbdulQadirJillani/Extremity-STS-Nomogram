import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#0f1117",
          mid: "#3d3d45",
          muted: "#72727e",
          faint: "#b0b0ba",
          ghost: "#e8e8f0",
        },
        parchment: {
          DEFAULT: "#f5f3ef",
          dark: "#ede9e3",
          border: "#ddd8d0",
          strong: "#c8c2b8",
        },
        accent: {
          DEFAULT: "#1a3a5c",
          light: "#2d5f96",
          faint: "#e8f0f9",
          border: "#c0d0e8",
        },
        tier: {
          low: "#16875c",
          "low-bg": "#e6f5ef",
          mod: "#b85c00",
          "mod-bg": "#fef3e6",
          high: "#c0341c",
          "high-bg": "#fdecea",
          vhigh: "#8b1414",
          "vhigh-bg": "#fce4e4",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 20px rgba(0,0,0,0.10)",
        glow: "0 0 0 3px rgba(26,58,92,0.12)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "bar-grow": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease both",
        "bar-grow": "bar-grow 0.6s cubic-bezier(0.4,0,0.2,1) both",
        "pulse-dot": "pulse-dot 2s ease infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
