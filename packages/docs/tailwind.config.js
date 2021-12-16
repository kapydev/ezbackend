module.exports = {
  corePlugins: { preflight: false },
  important: '#tailwind',
  purge: [
    // './src/**/*.html',
    // './src/**/*.js',
  ],
  theme: {
    fontFamily: {
      monts: ['Montserrat'],
      mono: ['Roboto Mono'],
    },
    extend: {
      width: {
        '700px': '700px',
        '400px': '400px',
        '500px': '500px',
      },
      height: {
        '320px': '320px',
        '750px': '750px',
      },
      colors: {
        dracula: '#282A36',
        purple: '#BD93F9',
        darkness: '#18191A',
      },
    },
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'rotate(-5deg)' },
        '50%': { transform: 'rotate(5deg)' },
      },
    },
    animation: {
      wiggle: 'wiggle 1s ease-in-out infinite',
    },
  },
  variants: {},
  plugins: [],
};
