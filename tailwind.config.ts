import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#08080a",
        coal: "#0c0c0f",
        carbon: "#111114",
        smoke: "#19191e",
        line: "#26262c",
        bone: "#f3efe6",
        mist: "#a7a39a",
        muted: "#8a867d",
        gold: "#c9a96b",
        goldsoft: "#e3c992",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1.2" }],
      },
      letterSpacing: {
        label: "0.26em",
        widest: "0.35em",
      },
      maxWidth: {
        shell: "1680px",
      },
      transitionTimingFunction: {
        cinema: "cubic-bezier(0.16, 1, 0.3, 1)",
        swift: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        "fade-up": "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fadeIn 1.2s cubic-bezier(0.16,1,0.3,1) both",
        "line-grow": "lineGrow 1.1s cubic-bezier(0.16,1,0.3,1) both",
        "pulse-dot": "pulseDot 2.8s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translate3d(0,26px,0)" },
          "100%": { opacity: "1", transform: "translate3d(0,0,0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        lineGrow: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.72)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
