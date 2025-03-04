// webpack.config.js
const Dotenv = require('dotenv-webpack');

module.exports = {
  // ... другие настройки
  plugins: [
    new Dotenv()
  ]
};