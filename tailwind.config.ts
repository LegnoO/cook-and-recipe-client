import type { Config } from "tailwindcss";
// const colors = require("tailwindcss/colors");

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
    },
    extend: {
      borderWidth: {
        "3": "3px", 
      },
      backgroundPosition: {
        "center-top": "center top",
      },
      spacing: {
        "4.5": "1.125rem",
      },
      transitionProperty: {
        height: "height",
        outline: "outline",
      },
      transitionDuration: {
        350: "350ms",
        400: "400ms",
      },
      rotate: {
        "4": "4deg",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      zIndex: {
        modal: "60",
        navbar: "50",
      },
      height: {
        18: "4.5rem",
        22: "5.5rem",
      },
      boxShadow: {
        "light-circle": "0px 0px 10px 0px rgba(0, 0, 0, 0.11)",
      },
      colors: {
        background: {
          DEFAULT: "hsl(var(--background))",
          body: "hsl(var(--background-body))",
        },
        divider: "hsl(var(--divider))",
        foreground: "hsl(var(--fg-primary))",
        placeholder: "hsl(var(--placeholder))",
        disabled: "hsl(var(--disabled))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          hover: "hsl(var(--secondary-hover))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
          hover: "hsl(var(--tertiary-hover))",
        },
        muted: {
          DEFAULT: "hsl(var(--disabled))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        border: "hsl(var(--border) / 0.12)",
        input: "hsl(var(--input) / 0.22)",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        playFair: ["var(--font-playfair)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "first-slider":
          "url('https://res.cloudinary.com/dzl5ur69n/image/upload/v1728650985/fyvykb7kphju47xee51a.jpg')",

        footer:
          "url('https://res.cloudinary.com/dzl5ur69n/image/upload/v1728650985/fyvykb7kphju47xee51a.jpg')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
