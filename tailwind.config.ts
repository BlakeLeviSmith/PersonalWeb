import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // bg.canvas — page background, the dominant cream
        canvas: "#F4EFE7",
        // bg.surface — cards, elevated sections
        surface: "#FBF9F4",
        // bg.contrast — inverse sections (footer, accent blocks)
        contrast: "#1F1B16",
        // text.primary — body copy, headlines
        ink: "#1F1B16",
        // text.secondary — captions, metadata, eyebrow labels
        stone: "#6B6359",
        // text.muted — timestamps, low-priority labels
        muted: "#A39A8C",
        // accent.tan — single accent color, used sparingly
        tan: "#B89B7A",
        // border.sand — hairline dividers, card borders
        sand: "#E4DCCF",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // mobile-first; -lg variants applied via md: in components
        stat: ["96px", { lineHeight: "1.0", letterSpacing: "-0.04em" }],
        "stat-lg": ["180px", { lineHeight: "1.0", letterSpacing: "-0.04em" }],
        display: ["56px", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-lg": ["96px", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        h2: ["32px", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "h2-lg": ["48px", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        h3: ["22px", { lineHeight: "1.3" }],
        "h3-lg": ["28px", { lineHeight: "1.3" }],
        body: ["17px", { lineHeight: "1.55" }],
        caption: ["13px", { lineHeight: "1.4", letterSpacing: "0.12em" }],
      },
      maxWidth: {
        content: "1280px",
        measure: "60ch",
      },
      letterSpacing: {
        caption: "0.12em",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
