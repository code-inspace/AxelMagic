/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        background: "#0E0F11",
        primary: {
          DEFAULT: "#2708a0",
          light: "#653ad2",
          mid: "#4520c8",
        },
      },
      animation: {
        "aurora": "aurora 8s ease infinite alternate",
        "marquee": "marquee var(--duration) linear infinite",
        "marquee-reverse": "marquee-reverse var(--duration) linear infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 12s linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        "fade-in": "fade-in 0.6s ease forwards",
        "slide-up": "slide-up 0.6s ease forwards",
      },
      keyframes: {
        aurora: {
          "0%": { backgroundPosition: "0% 50%", backgroundSize: "200% 200%" },
          "50%": { backgroundPosition: "100% 50%", backgroundSize: "200% 200%" },
          "100%": { backgroundPosition: "0% 50%", backgroundSize: "200% 200%" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(calc(-100% - var(--gap)))" },
          to: { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap, 1rem)))" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(30px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}
