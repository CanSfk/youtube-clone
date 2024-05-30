/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-theme-black": "#0f0f0f",
        "dark-theme-soft-black": "#212121",
        "dark-theme-extra-soft-black": "#343434",
        "dark-theme-primary-black": "#666666",
        "dark-theme-white": "#f1f1f1",
        "dark-theme-gray": "#aaa",
        "dark-theme-blue": "#3EA6FF",
        "youtube-red": "#CC0000",
      },
    },
  },
  plugins: [],
};
