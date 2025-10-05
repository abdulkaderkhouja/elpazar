// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar', 'fr', 'tr', 'zh', 'es', 'de', 'pt', 'ru', 'ja', 'ko', 'hi', 'it', 'nl', 'th'],
    localeDetection: false,
  },
  localePath: './public/locales', // JSON files location
    flags: {
    en: 'GB',
    ar: 'SA',
    fr: 'FR',
    tr: 'TR',
    zh: 'CN',
    es: 'ES',
    de: 'DE',
    pt: 'PT',
    ru: 'RU',
    ja: 'JP',
    ko: 'KR',
    hi: 'IN',
    it: 'IT',
    nl: 'NL',
    th: 'TH',
  },
};
