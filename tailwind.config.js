const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  theme: {
    fontFamily: {
      sans: ["Nunito Sans", ...defaultTheme.fontFamily.sans],
    },
    colors: {
      primary: '#7D83FF',
      secondary: '#D4DCFF',
      blue: '#007FFF',
      green: '#9EE493',
      red: '#D7263D'
    },
    variants: {},
    plugins: []
  }
};