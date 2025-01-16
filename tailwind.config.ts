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
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      fill: {
        primary: "hsl(var(--primary))",
      },
      stroke: {
        primary: "hsl(var(--primary))",
      },
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
        width: "width",
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
        foreground: "hsl(var(--foreground))",
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
          DEFAULT: "hsl(var(--accent) / 0.24)",
          foreground: "hsl(var(--accent-foreground) / 0.92)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
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
        playfair: ["var(--font-playfair)"],
        raleway: ["var(--font-raleway)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "home-banner": "url('/images/home-banner.jpg')",
        "recipes-banner": "url('/images/recipes-banner.jpg')",
        "chefs-banner": "url('/images/chefs-banner.jpg')",
        footer:
          "url('https://res.cloudinary.com/dzl5ur69n/image/upload/v1728650985/fyvykb7kphju47xee51a.jpg')",
        "404": "url('/images/404.jpg')",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({
      addVariant,
    }: {
      addVariant: (name: string, definition: string) => void;
    }) {
      addVariant("has-button-checked", '&:has(button[aria-checked="true"])');
    },
  ],
};
export default config;
