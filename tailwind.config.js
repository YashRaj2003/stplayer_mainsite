module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        graphik: ["Graphik"],
        Manrope: ["Manrope"],
      },
      colors: {
        background: "#262626",
        theme: "#1DDECB",
        active: "#F9F9F9",
        hover: "#EFC7A3",
        success: "#23db8b",
        tab: "#f2f2f2",
        error: "#FF6460",
        warning: "#fcf8e3",
        border: "#545454",
        google: "#757575",
        blue: "#1877F2",
        nav_active: "#383838",
        input: "#f2f2f2"

      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1023px',
        // => @media (min-width: 1024px) { ... }


        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1600px',
        // => @media (min-width: 1440px) { ... }

        '3xl': '1940px',
        // => @media (min-width: 1440px) { ... }



      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),],
}
