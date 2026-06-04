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
        dark:      "#0D0A07",
        white:     "#ffffff",
        muted:     "#78716C",
        saffron:   "#F97316",
        marigold:  "#F59E0B",
        gold:      "#FCD34D",
        // Data-viz state colors — kept for map markers and indicators
        state: {
          sustaining: "#F59E0B",
          lightly:    "#F97316",
          seriously:  "#EF4444",
          stripped:   "#7F1D1D",
          unknown:    "#78716C",
        },
      },
      fontFamily: {
        display: ["var(--font-outfit)", "system-ui", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "sans-serif"],
        body:    ["var(--font-outfit)", "system-ui", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "sans-serif"],
      },
      fontSize: {
        "body-sm":    ["17px", { lineHeight: "1.61", letterSpacing: "0.01px" }],
        subheading:   ["20px", { lineHeight: "1.2",  letterSpacing: "0.2px"  }],
        "heading-sm": ["30px", { lineHeight: "1.1",  letterSpacing: "-0.3px" }],
        heading:      ["52px", { lineHeight: "1.09", letterSpacing: "-0.52px"}],
        "heading-lg": ["63px", { lineHeight: "0.91", letterSpacing: "-0.63px"}],
        display:      ["clamp(80px,12vw,187px)", { lineHeight: "0.8", letterSpacing: "-3.74px" }],
      },
      borderRadius: {
        "4xl":  "14px",
        "full": "1000px",
      },
      spacing: {
        "11px": "11px",
        "13px": "13px",
        "15px": "15px",
        "16px": "16px",
        "17px": "17px",
        "21px": "21px",
        "22px": "22px",
        "23px": "23px",
        "31px": "31px",
        "34px": "34px",
        "38px": "38px",
        "53px": "53px",
        "59px": "59px",
        "60px": "60px",
        "68px": "68px",
        "119px": "119px",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        spotlight: "spotlight 2s ease 0.75s 1 forwards",
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
