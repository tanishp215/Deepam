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
        paper:          "var(--paper)",
        "paper-warm":   "var(--paper-warm)",
        "paper-deep":   "var(--paper-deep)",
        ink:            "var(--ink)",
        "ink-soft":     "var(--ink-soft)",
        "ink-muted":    "var(--ink-muted)",
        "ink-faint":    "var(--ink-faint)",
        oxblood:        "var(--oxblood)",
        "oxblood-deep": "var(--oxblood-deep)",
        brass:          "var(--brass)",
        "brass-light":  "var(--brass-light)",
        state: {
          sustaining: "var(--state-sustaining)",
          tightening: "var(--state-tightening)",
          cutting:    "var(--state-cutting)",
          minimum:    "var(--state-minimum)",
          unknown:    "var(--state-unknown)",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans:  ["var(--font-sans)", "system-ui", "sans-serif"],
        mono:  ["var(--font-mono)", "ui-monospace", "monospace"],
        deva:  ["var(--font-deva)", "var(--font-serif)"],
      },
      borderRadius: {
        sm:   "2px",
        md:   "3px",
        pill: "1000px",
      },
      spacing: {
        "11px":  "11px",
        "13px":  "13px",
        "15px":  "15px",
        "16px":  "16px",
        "17px":  "17px",
        "21px":  "21px",
        "22px":  "22px",
        "23px":  "23px",
        "31px":  "31px",
        "34px":  "34px",
        "38px":  "38px",
        "53px":  "53px",
        "59px":  "59px",
        "60px":  "60px",
        "68px":  "68px",
        "119px": "119px",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        spotlight:    "spotlight 2s ease 0.75s 1 forwards",
      },
      keyframes: {
        spotlight: {
          "0%":   { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%, -40%) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
