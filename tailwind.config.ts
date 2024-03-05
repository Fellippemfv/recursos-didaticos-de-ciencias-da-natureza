import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      colors: {
        'muted-foreground': 'hsl(215.4, 16.3%, 46.9%)',
        'hsl-ring': 'hsl(240, 5%, 64.9%)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      borderWidth: {
        DEFAULT: '1px', // Define a largura padrão da borda
      },
      ringWidth: {
        DEFAULT: '0px', // Define a largura padrão do anel de foco como 0px
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config