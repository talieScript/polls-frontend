const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  important: true,
  theme: {
    extend: {
      zIndex: {
        "-1": "-1",
      },
      transformOrigin: {
        "0": "0%",
      },
      left: {
        "1": "0.25rem"
      }
    },
    fontFamily: {
      ...defaultTheme.fontFamily,
      sans: ['Noto Sans TC', ...defaultTheme.fontFamily.sans],
      roboto: ['Roboto', 'sans-serif']
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
  },
  plugins: [],
  variants: {
    borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
  },
};