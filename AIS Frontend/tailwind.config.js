/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        secondary: "#111827",
        background: "#FFFBF0",
        surface: "#FFFFFF",
        border: "#E5E7EB",
        text: "#111827",
        muted: "#6B7280",
        error: "#DC2626",
        success: "#16A34A",
        aashwin: "#eef2ff",
      },
    },
  },
  plugins: [],
};
