/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-primary': '#2E7D32',
        'green-light': '#E8F5E9',
        'green-hover': '#236B28',
        'orange-accent': '#FF9800',
        'gray-text': '#757575',
        'gray-border': '#E0E0E0',
        'blue-link': '#1976D2',
      },
      fontFamily: {
        'sans': ['Source Han Sans', 'Noto Sans SC', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0,0,0,0.08)',
        'card-light': '0 2px 8px rgba(0,0,0,0.05)',
      }
    },
  },
  plugins: [],
}
