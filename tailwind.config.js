const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  theme: {
    fontFamily: {
      sans: ["Nunito Sans", ...defaultTheme.fontFamily.sans],
    },
    colors: {
      ...defaultTheme.colors,
      primary: '#7D83FF',
      secondary: '#F3F5FF',
      blue: '#007FFF',
      green: {
        ...defaultTheme.colors.green
      },
      blue: {
        ...defaultTheme.colors.blue
      },
      red: '#D7263D',
      white: '#FFFFFF',
    },
    variants: {},
    plugins: []
  }
};