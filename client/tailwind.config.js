export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#22c55e", // Green
        background: "#f8f8f8", // Light minimal
        textPrimary: "#1f2937", // Dark Gray
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
