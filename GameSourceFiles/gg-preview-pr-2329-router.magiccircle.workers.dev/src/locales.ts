// HEY YOU! Adding a new locale? Update i18n.json too, otherwise Lingo won't translate it.
export const locales = [
  {
    locale: 'en',
    name: 'English',
  },
  {
    locale: 'es',
    name: 'Español',
  },
  {
    locale: 'pt',
    name: 'Português',
  },
  {
    locale: 'de',
    name: 'Deutsch',
  },
  {
    locale: 'fr',
    name: 'Français',
  },
  {
    locale: 'ja',
    name: '日本語',
  },
  {
    locale: 'zh',
    name: '中文',
  },
  {
    locale: 'th',
    name: 'ไทย',
  },
  {
    locale: 'nl',
    name: 'Nederlands',
  },
  {
    locale: 'ru',
    name: 'Русский',
  },
  {
    locale: 'pl',
    name: 'Polski',
  },
  {
    locale: 'it',
    name: 'Italiano',
  },
  {
    locale: 'ko',
    name: '한국어',
  },
  {
    locale: 'vi',
    name: 'Tiếng Việt',
  },
  {
    locale: 'sv',
    name: 'Svenska',
  },
  {
    locale: 'tr',
    name: 'Türkçe',
  },
  {
    locale: 'ar',
    name: 'العربية',
  },
  {
    locale: 'fil',
    name: 'Filipino',
  },
  {
    locale: 'sr',
    name: 'Српски',
  },
] as const;

export type Locale = (typeof locales)[number]['locale'];
