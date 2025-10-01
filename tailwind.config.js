/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}",
  ],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      colors: {
        brand: {
          blue: "#0018FF",
          orange: "#FF6A00",
          black: "#0B0B0C",
          white: "#FFFFFF",
        },
      },
      boxShadow: {
        glass: "0 10px 40px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};
