import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Indian Heritage Palette
        // Deepam dark ground
        ground: {
          DEFAULT: "#0D0A07",
          50: "#1A1410",
          100: "#241D16",
          200: "#2E261C",
        },
        // Saffron - primary sacred color
        saffron: {
          DEFAULT: "#F97316",
          light: "#FB923C",
          dark: "#EA580C",
          glow: "#FED7AA",
        },
        // Marigold gold - festival color
        marigold: {
          DEFAULT: "#F59E0B",
          light: "#FCD34D",
          dark: "#D97706",
          pale: "#FEF3C7",
        },
        // Crimson - kumkum / sindoor
        crimson: {
          DEFAULT: "#DC2626",
          light: "#EF4444",
          dark: "#B91C1C",
          pale: "#FEE2E2",
        },
        // Temple stone warm neutral
        stone: {
          warm: "#78716C",
          mid: "#44403C",
          deep: "#1C1917",
        },
        // Text colors
        ink: {
          DEFAULT: "#FAFAF9",
          muted: "#A8A29E",
          soft: "#D6D3D1",
        },
        // State colors for temple indicators
        state: {
          sustaining: "#F59E0B",
          lightly: "#F97316",
          seriously: "#EF4444",
          stripped: "#7F1D1D",
          unknown: "#57534E",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "radial-saffron":
          "radial-gradient(ellipse at center, rgba(249,115,22,0.15) 0%, transparent 70%)",
        "radial-gold":
          "radial-gradient(ellipse at center, rgba(245,158,11,0.12) 0%, transparent 60%)",
        "temple-texture":
          "linear-gradient(135deg, #0D0A07 0%, #1A1410 50%, #0D0A07 100%)",
      },
      boxShadow: {
        saffron: "0 0 20px rgba(249,115,22,0.4), 0 0 60px rgba(249,115,22,0.15)",
        gold: "0 0 16px rgba(245,158,11,0.5), 0 0 40px rgba(245,158,11,0.2)",
        crimson: "0 0 16px rgba(220,38,38,0.4), 0 0 40px rgba(220,38,38,0.1)",
        "card-warm": "0 4px 24px rgba(0,0,0,0.6), 0 1px 0 rgba(249,115,22,0.08) inset",
        "glow-sm": "0 0 8px rgba(249,115,22,0.6)",
        "glow-md": "0 0 20px rgba(249,115,22,0.5), 0 0 40px rgba(249,115,22,0.2)",
        "glow-lg": "0 0 30px rgba(245,158,11,0.6), 0 0 80px rgba(245,158,11,0.25)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "flicker": "flicker 2.5s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "25%": { opacity: "0.85", transform: "scale(0.97)" },
          "50%": { opacity: "0.92", transform: "scale(1.02)" },
          "75%": { opacity: "0.88", transform: "scale(0.99)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
