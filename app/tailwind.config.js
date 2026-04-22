/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/generated/content/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Legacy shadcn-style (repointed to warm palette)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // ── Porhi warm-sand palette (use these directly in new components) ──
        sand: {
          DEFAULT: "hsl(var(--bg))",        // page bg
          2: "hsl(var(--bg-2))",            // subtle panels
          3: "hsl(var(--bg-3))",            // amber-tinted
        },
        surface: {
          DEFAULT: "hsl(var(--card))",      // card
          2: "hsl(var(--card-2))",          // pure white / elevated
        },
        ink: {
          DEFAULT: "hsl(var(--ink))",       // headings
          2: "hsl(var(--ink-2))",           // body
          3: "hsl(var(--ink-3))",           // secondary
          4: "hsl(var(--ink-4))",           // muted
          5: "hsl(var(--ink-5))",           // placeholder
        },
        line: {
          DEFAULT: "hsl(var(--line))",
          2: "hsl(var(--line-2))",
        },
        amber: {
          DEFAULT: "hsl(var(--amber))",
          50: "hsl(var(--amber-50))",
          100: "hsl(var(--amber-100))",
          500: "hsl(var(--amber))",
          600: "hsl(var(--amber-600))",
          700: "hsl(var(--amber-700))",
        },
        clay: "hsl(var(--clay))",
        sage: "hsl(var(--sage))",
        "ink-blue": "hsl(var(--ink-blue))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Geist", "Inter", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Fraunces", "Iowan Old Style", "Georgia", "serif"],
        mono: ["Geist Mono", "JetBrains Mono", "ui-monospace", "monospace"],
        bengali: ["Tiro Bangla", "Hind Siliguri", "Noto Serif Bengali", "serif"],
      },
      boxShadow: {
        // Porhi soft shadows
        "soft-1": "0 1px 0 rgba(92, 84, 75, 0.06)",
        "soft-2": "0 1px 2px rgba(92, 84, 75, 0.06), 0 2px 6px rgba(92, 84, 75, 0.04)",
        "soft-3": "0 4px 12px rgba(92, 84, 75, 0.08), 0 12px 24px rgba(92, 84, 75, 0.06)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
      },
    },
  },
  plugins: [],
};
