module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "#e5e7eb",      // light gray, change as needed
        background: "#5688b7",  // light background, change as needed
        foreground: "#0f172a",  // dark text color, change as needed
      },
    },
  },
  plugins: [],
}