import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                heading: ["-apple-system", "BlinkMacSystemFont", "'avenir next'", "avenir", "'helvetica neue'", "helvetica", "Ubuntu", "roboto", "noto", "segoe ui", "arial", "sans-serif"],
                body: ["-apple-system", "BlinkMacSystemFont", "'avenir next'", "avenir", "'helvetica neue'", "helvetica", "Ubuntu", "roboto", "noto", "segoe ui", "arial", "sans-serif"],
                mono: ["SFMono-Regular", "Consolas", "Liberation Mono", "Menlo", "Courier", "monospace"],
            },
            colors: {
                border: "var(--border)",
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
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                },
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
                blues: {
                    DEFAULT: "var(--blues)",
                    foreground: "var(--blues-foreground)",
                },
                amber: {
                    DEFAULT: "var(--amber)",
                    foreground: "var(--amber-foreground)",
                },
                green: {
                    DEFAULT: "var(--green)",
                    foreground: "var(--green-foreground)",
                },
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
                card_light: {
                    DEFAULT: "var(--card_light)",
                    foreground: "var(--card_light-foreground)",
                },
                gray: {
                    0: "#000000",
                    1: "#171717",
                    2: "#2f2f2f",
                    3: "#464646",
                    4: "#5e5e5e",
                    5: "#757575",
                    6: "#8c8c8c",
                    7: "#a3a3a3",
                    8: "#bababa",
                    9: "#d1d1d1",
                    10: "#e8e8e8",
                    11: "#ffffff",
                },
                blue: {
                    0: "#030b18",
                    1: "#071e3f",
                    2: "#0c3166",
                    3: "#10448d",
                    4: "#1556b4",
                    5: "#1969db",
                    6: "#317fed",
                    7: "#5797f0",
                    8: "#7daef4",
                    9: "#a3c6f7",
                    10: "#c9ddfa",
                    11: "#eff5fe",
                },
            },
            borderRadius: {
                full: "9999px",
                sm: "4px",
                md: "6px",
                lg: "8px",
                xl: "16px",
                "2xl": "32px",
            },
            fontSize: {
                xs: "0.75rem",
                sm: "0.875rem",
                base: "1rem",
                lg: "1.125rem",
                xl: "1.25rem",
                "2xl": "1.5rem",
                "3xl": "2rem",
                "4xl": "3rem",
                "5xl": "4rem",
                "6xl": "6rem",
                "7xl": "8rem",
            },
            boxShadow: {
                0: "0px 1px 1px 0px hsla(0, 0%, 0%, 0.035), 0px 2px 2px 0px rgba(0, 0, 0, 0.125), 0px 4px 4px 0px rgba(0, 0, 0, 0.125), 0px 8px 8px 0px rgba(0, 0, 0, 0.125), 0px 16px 16px 0px rgba(0, 0, 0, 0.125)",
                1: "0px 1px 1px 0px rgba(0, 0, 0, 0.15), 0px 2px 2px 0px rgba(0, 0, 0, 0.15), 0px 4px 4px 0px rgba(0, 0, 0, 0.15), 0px 8px 8px 0px rgba(0, 0, 0, 0.15)",
                2: "0px 1px 1px 0px rgba(0, 0, 0, 0.11), 0px 2px 2px 0px rgba(0, 0, 0, 0.11), 0px 4px 4px 0px rgba(0, 0, 0, 0.11), 0px 8px 8px 0px rgba(0, 0, 0, 0.11), 0px 16px 16px 0px rgba(0, 0, 0, 0.11), 0px 32px 32px 0px rgba(0, 0, 0, 0.11)",
                3: "0px 1px 1px 0px rgba(0, 0, 0, 0.25), 0px 2px 2px 0px rgba(0, 0, 0, 0.20), 0px 4px 4px 0px rgba(0, 0, 0, 0.15), 0px 8px 8px 0px rgba(0, 0, 0, 0.10), 0px 16px 16px 0px rgba(0, 0, 0, 0.05)",
            },
            letterSpacing: {
                tracked: "0.1em",
                tight: "-0.05em",
                wide: "0.25em",
            },
            lineHeight: {
                solid: "1",
                heading: "1.25",
                body: "1.5",
            },
        },
    },

    plugins: [
        forms,
        // require("tailwindcss-animate")
    ],
};