import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E8311A",
          dark: "#1A1A1A",
          white: "#FFFFFF",
        },
        surface: {
          0: "#FFFFFF",
          1: "#F5F5F5",
          2: "#EBEBEB",
        },
        text: {
          primary: "#1A1A1A",
          secondary: "#555555",
          tertiary: "#888888",
        },
        ballot: "#FF6B35",
        peak: "#FFF3EE",
        offpeak: "#EDFAEE",
        success: "#1DB954",
        warning: "#FF9500",
        error: "#E8311A",
        "dark-surface-0": "#121212",
        "dark-surface-1": "#1E1E1E",
        "dark-surface-2": "#2A2A2A",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      fontSize: {
        display: ["32px", { fontWeight: "700", letterSpacing: "-0.5px" }],
        h1: ["24px", { fontWeight: "700" }],
        h2: ["20px", { fontWeight: "600" }],
        "body-lg": ["17px", { lineHeight: "1.5", fontWeight: "400" }],
        body: ["15px", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["13px", { fontWeight: "400" }],
        label: ["12px", { fontWeight: "500", letterSpacing: "0.4px" }],
      },
      spacing: {
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-top": "env(safe-area-inset-top)",
      },
      minHeight: {
        touch: "48px",
      },
      minWidth: {
        touch: "48px",
      },
    },
  },
  plugins: [],
};

export default config;
