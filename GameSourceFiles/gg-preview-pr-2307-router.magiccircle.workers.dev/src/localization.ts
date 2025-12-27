import { i18n, type Messages } from '@lingui/core';
import { getDefaultStore, useAtom } from 'jotai';
import { useEffect } from 'react';
import { type Locale, locales } from '@/locales';
import { persistedAtom } from './store/utils';

export function isSupportedLocale(value: unknown): value is Locale {
  if (typeof value !== 'string') {
    return false;
  }
  if (locales.some((locale) => locale.locale === value)) {
    return true;
  }
  return false;
}

const localeAtom = persistedAtom<Locale>('locale', 'en', {
  validateValueFromStorage: isSupportedLocale,
});

/**
 * Dynamically loads and activates a locale for internationalization.
 *
 * @param locale - The locale identifier (e.g. 'en', 'de', 'fr') to activate
 * @returns A promise that resolves when the locale messages are loaded and activated
 * @example
 * ```ts
 * await dynamicActivate('de'); // Loads and activates German translations
 * ```
 */
export function activateLocale(locale: string) {
  if (!isSupportedLocale(locale)) {
    console.error('Unsupported locale', locale);
    return;
  }
  import(`./locales/${locale}.po`)
    .then(({ messages }) => {
      i18n.load(locale, messages as Messages);
      i18n.activate(locale);
    })
    .catch((error) => {
      console.error('Error activating locale', error);
    });
}

export function setLocaleFromOutsideReact(locale: Locale) {
  const { set } = getDefaultStore();
  set(localeAtom, locale);
}

export function useLocale() {
  const [locale, setLocale] = useAtom(localeAtom);
  return { locale, setLocale };
}

export function useLocaleEffects() {
  const { locale, setLocale } = useLocale();

  useEffect(() => {
    setLocale(locale);
    activateLocale(locale);
  }, [locale]);
}
