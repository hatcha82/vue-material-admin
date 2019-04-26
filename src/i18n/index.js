/**
 * Vue i18n
 *
 * @library
 *
 * http://kazupon.github.io/vue-i18n/en/
 */

// Lib imports
import Vue from "vue";
import VueI18n from "vue-i18n";
//import axios from "axios";
import messages from "@/lang";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages
});

// const loadedLanguages = ["en"]; // our default language that is preloaded

// function setI18nLanguage(lang) {
//   i18n.locale = lang;
//   axios.defaults.headers.common["Accept-Language"] = lang;
//   document.querySelector("html").setAttribute("lang", lang);
//   return lang;
// }

// export function loadLanguageAsync(lang) {
//   if (i18n.locale !== lang) {
//     if (!loadedLanguages.includes(lang)) {
//       return import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}`).then(
//         msgs => {
//           i18n.setLocaleMessage(lang, msgs.default);
//           loadedLanguages.push(lang);
//           return setI18nLanguage(lang);
//         }
//       );
//     }
//     return Promise.resolve(setI18nLanguage(lang));
//   }
//   return Promise.resolve(lang);
// }

export default i18n;
