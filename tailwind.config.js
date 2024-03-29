/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#FFD700",
        silver: "#COCOCO",
        bronze: "#CD7F32",
        tank: "#3e51b1",
        healer: "#3c672f",
        dps: "#743333",
        gatherer: "#a28838",
        crafter: "#6748ad",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#eec643",
          secondary: "#5c0099",
          accent: "#f39237",
          neutral: "#191D24",
          "base-100": "#2A303C",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
