module.exports = {
  corePlugins: { preflight: false },
  important: '#tailwind',
  purge: [
    // './src/**/*.html',
    // './src/**/*.js',
  ],
  theme: {
    fontFamily: {
      'monts': ['Montserrat'],
      'mono': ['Roboto Mono']
    },
    extend: {
      width: {
        '700px': '700px',
        '400px': '400px',
        '500px': '500px',
      },
      height: {
        '320px': '320px',
      },
      colors: {
        dracula: '#282A36',
      }
    },

  },
  variants: {},
  plugins: [],
}