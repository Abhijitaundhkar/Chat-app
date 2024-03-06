/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
      "primary-muted": "oklch(var(--primary-muted) / <alpha-value>)",
    },},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
}