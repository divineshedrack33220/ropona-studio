import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Semantic tokens — the single source of truth for the redesign. */
        taupe: "rgb(var(--taupe) / <alpha-value>)",
        burgundy: "rgb(var(--burgundy) / <alpha-value>)",
        champagne: "rgb(var(--champagne) / <alpha-value>)",
        champagneLight: "rgb(var(--champagne-light) / <alpha-value>)",
        espresso: "rgb(var(--espresso) / <alpha-value>)",
        cocoa: "rgb(var(--cocoa) / <alpha-value>)",
        ivory: "rgb(var(--ivory) / <alpha-value>)",
        taupeDeep: "rgb(var(--taupe-deep) / <alpha-value>)",
        burgundySoft: "rgb(var(--burgundy-soft) / <alpha-value>)",
        brown: "rgb(var(--brown) / <alpha-value>)",
        dark: "rgb(var(--dark) / <alpha-value>)",

        /* Existing aliases retained so every component shares the palette. */
        ink: "rgb(var(--taupe) / <alpha-value>)",
        coal: "rgb(var(--champagne) / <alpha-value>)",
        carbon: "rgb(var(--champagne-light) / <alpha-value>)",
        smoke: "rgb(var(--taupe-deep) / <alpha-value>)",
        line: "rgb(var(--cocoa) / <alpha-value>)",
        bone: "rgb(var(--dark) / <alpha-value>)",
        mist: "rgb(var(--cocoa) / <alpha-value>)",
        muted: "rgb(var(--espresso) / <alpha-value>)",
        gold: "rgb(var(--burgundy) / <alpha-value>)",
        goldsoft: "rgb(var(--burgundy-soft) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1.2" }],
      },
      letterSpacing: {
        label: "0.22em",
        widest: "0.35em",
      },
      borderRadius: {
        card: "1.25rem",
        panel: "1.5rem",
        feature: "1.75rem",
      },
      aspectRatio: {
        "ig-post": "4 / 5",
        "ig-square": "1 / 1",
        "ig-reel": "9 / 16",
      },
      maxWidth: {
        shell: "1280px",
      },
      transitionTimingFunction: {
        cinema: "cubic-bezier(0.16, 1, 0.3, 1)",
        swift: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      animation: {
        marquee: "marquee 42s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        "fade-up": "fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) both",
        "line-grow": "lineGrow 1.1s cubic-bezier(0.16, 1, 0.3, 1) both",
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
          "50%": { opacity: "0.45", transform: "scale(0.8)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
