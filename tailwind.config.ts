import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          900: "#0B0F1A",
          800: "#10142A",
          700: "#11162B",
        },
        violet: {
          500: "#8B5CF6",
          600: "#6366F1",
        },
        cyan: {
          400: "#22D3EE",
          500: "#06B6D4",
        },
        text: {
          heading: "#F5F6FA",
          body: "#A1A8C3",
        },
        card: {
          bg: "rgba(255, 255, 255, 0.04)",
          border: "rgba(255, 255, 255, 0.08)",
        }
      },
      backgroundImage: {
        'navy-gradient': 'linear-gradient(180deg, #0B0F1A 0%, #10142A 50%, #0B0F1A 100%)',
        'accent-gradient': 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 50%, #06B6D4 100%)',
      }
    },
  },
  plugins: [],
};
export default config;
