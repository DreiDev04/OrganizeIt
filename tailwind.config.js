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
                card_dark: {
                    DEFAULT: "var(--card_dark)",
                    foreground: "var(--card_dark-foreground)",
                },
                card_light: {
                    DEFAULT: "var(--card_light)",
                    foreground: "var(--card_light-foreground)",
                },
                danger: {
                    DEFAULT: "var(--danger)",
                    foreground: "var(--card_light-foreground)",
                },
            },
            // container: {
            //     padding: "5.5rem",
            // },
        },
    },

    plugins: [
        forms,
        // require("tailwindcss-animate")
    ],
};