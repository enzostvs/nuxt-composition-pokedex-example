module.exports = {
  purge: {
    enabled: false,
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
  },
  variants: {
    extend: {
      borderWidth: ['hover'],
      grayscale: ['hover'],
      width: ['hover', 'group-hover'],
    },
  },
  plugins: [],
}
