/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bungee: "var(--font-bungee)",
        montserrat: "var(--font-montserrat)",
        inria: "var(--font-inria)",
      },
    },
  },
  plugins: [],
};
