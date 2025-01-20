/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                "t-main": "var(--t-main)",
                "t-gold": "var(--t-gold)",
                "t-gold-accent": "var(--t-gold-accent)",
                "t-main-accent": "var(--t-main-accent)",
                "t-main-accent-light": "var(--t-main-accent-light)",
                "t-dark": "var(--t-dark)",
                "bg-purp": "var(--bg-purp)",
                "bg-purp-light": "var(--bg-purp-light)",
                "bg-red": "var(--bg-red)",
                "bg-bright": "var(--bg-bright)"
            }
        },
    },
    plugins: [],
}
