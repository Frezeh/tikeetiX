/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          emphasis: "var(--accent-emphasis)",
          emphasis2: "var(--accent-emphasis2)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        success: {
          DEFAULT: "var(--success)",
          emphasis: "var(--success-emphasis)",
          emphasis2: "var(--success-emphasis2)",
          emphasis3: "var(--success-emphasis3)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          emphasis: "var(--warning-emphasis)",
          emphasis2: "var(--warning-emphasis2)",
        },
        danger: {
          DEFAULT: "var(--danger)",
          emphasis: "var(--danger-emphasis)",
          emphasis2: "var(--danger-emphasis2)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        slideDown: {
          from: { height: "0px", opacity: "0" },
          to: { height: "102px", opacity: "1" },
        },
        slideUp: {
          from: { height: "102px" },
          to: { height: "0px" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        marquee2: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
        marquee: "marquee 12s linear infinite",
        "marquee-fast": "marquee 7s linear infinite",
        "marquee-slow": "marquee 32s linear infinite",
        "marquee-2": "marquee2 12s linear infinite",
        "marquee-fast-2": "marquee2 7s linear infinite",
        "marquee-slow-2": "marquee 32s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
