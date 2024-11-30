
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{jsx,js, ts, tsx}" ],
  theme: {
    extend: {
      maxWidth:{
        container: "1440px"
      },
      screens: {
        'xs': "320px",
        'sm': "375px",
        'sml': "500px",
        'md': "667px",
        'mdl': "768px",
        'lg': "960px",
        'lgl': "1024px",
        'xl': "1880px",
      },
      fontFamily: {
        titleFont: "roboto",
        bodyFont: "poppins",
      },
      colors: {
        amazon_blue: "#131921",
        amazon_light: "#232F3E",
        amazon_yellow: "#febd69",
        white_text: "#ffff",
        light_text: "#ccc",
        quantity_box: "#F0F2F2",
        footerBottom: "#131A22"
      },
      boxShadow: {
        testShadow: "0px 0px 32px 1px rgba(199,199,199,1)",
        amazonInput: "0 0 3px 2px rgb(228 121 17 / 50%)"
      }
    },
  },
  plugins: [],
}
