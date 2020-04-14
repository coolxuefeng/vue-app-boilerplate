import Vue from 'vue';
import VueI18n from 'vue-i18n';
import initMessage from './lang/en-US';

Vue.use(VueI18n);

export const savedLanguageKey = 'DEFAULT_LANGUAGE';
export const initLanguage = 'en-US';

const dateTimeFormats = {
  'en-US': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
  'zh-CN': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    },
  },
};

export const i18n = new VueI18n({
  locale: initLanguage,
  fallbackLocale: initLanguage,
  dateTimeFormats,
  messages: {
    [initLanguage]: initMessage,
  },
});

const loadedLanguages = [initLanguage];

function setI18nLanguage(lang) {
  i18n.locale = lang;
  document.querySelector('html').setAttribute('lang', lang);
  localStorage.setItem(savedLanguageKey, lang);
  return lang;
}

export function loadLanguageAsync(lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(
        /* webpackChunkName: "lang-[request]" */ `./lang/${lang}`
      ).then((msgs) => {
        i18n.setLocaleMessage(lang, msgs.default);
        loadedLanguages.push(lang);
        return setI18nLanguage(lang);
      });
    }
    return Promise.resolve(setI18nLanguage(lang));
  }
  return Promise.resolve(lang);
}

// restore default language
const savedLanguage = localStorage.getItem(savedLanguageKey) || initLanguage;
loadLanguageAsync(savedLanguage);

export default i18n;
