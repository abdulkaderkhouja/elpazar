// next.config.js
const path = require('path');

const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
};