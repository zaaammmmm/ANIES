/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "primary": "#8c2bee",
        "background-light": "#f7f6f8",
        "background-dark": "#191022",
        "card-light": "#ffffff",
        "card-dark": "#211c27",
        "secondary-dark": "#302839",
        "secondary-light": "#e0e0e0",
        "text-primary-light": "#191022",
        "text-primary-dark": "#ffffff",
        "text-secondary-light": "#6b7280",
        "text-secondary-dark": "#ab9db9"
      },
      fontFamily: {
        "display": ["Be Vietnam Pro", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
