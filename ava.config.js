export default {
  require: ['@babel/register', './scripts/setup-browser-env.js'],
  babel: {
    testOptions: {
      presets: ['@babel/preset-react'],
    },
  },
};
