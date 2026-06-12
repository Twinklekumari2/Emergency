/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Sora", "sans-serif"], // Custom High-impact headers
        sans: ["Plus Jakarta Sans", "sans-serif"], // Body Copy
        mono: ["JetBrains Mono", "monospace"], // Blueprint/System details
      },
    },
  },
  plugins: [],
};
