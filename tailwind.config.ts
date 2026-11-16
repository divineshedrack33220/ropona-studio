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
        ink: "#211a15",
        coal: "#262019",
        carbon: "#2c251d",
        smoke: "#332b22",
        line: "#43392e",
        bone: "#f6efe3",
        mist: "#bfb3a3",
        muted: "#9c8f7e",
        gold: "#c98f5a",
        goldsoft: "#e2b184",
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
