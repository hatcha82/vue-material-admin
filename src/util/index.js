import axios from "axios";
import Vue from "vue";
export default {
  randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
  },
  randomString(length = 5) {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  },
  getFlagByMultiLang() {
    return "kr";
  },
  getBrowserLang() {
    var lang = window.navigator.languages
      ? window.navigator.languages[0]
      : null;
    lang =
      lang ||
      window.navigator.language ||
      window.navigator.browserLanguage ||
      window.navigator.userLanguage;
    if (lang.indexOf("-") !== -1) lang = lang.split("-")[0];

    if (lang.indexOf("_") !== -1) lang = lang.split("_")[0];
    return lang ? lang.toUpperCase() : "EN";
  },
  randomElement(arr = []) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  kebab(str) {
    return (str || "").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  },
  setCookie(name, value, min) {
    min = 30;
    var date = new Date();
    date.setTime(date.getTime() + min * 60 * 1000);
    document.cookie =
      name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
  },
  getCookie(name) {
    var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return value ? value[2] : null;
  },

  async getGroupCode(param) {
    param.QID = "code.selectMultiCodeList";
    var result = await axios.post(`/BmCommon/selectListByQid.json`, param);
    return Vue._.groupBy(result.data.O_RESULT, "CODE_GROUP_CD");
  },
  async getAutoCompleteResult(param) {
    var result = await axios.post(`/BmCommon/selectListByQid.json`, param);
    if (result.data.O_ERROR_FLAG === "N") {
      return result.data.O_RESULT;
    } else {
      return [];
    }
  },
  async getPostData(param) {
    var result = await axios.post(`/BmCommon/selectListByQid.json`, param);
    if (result.data.O_ERROR_FLAG === "N") {
      return result.data.O_RESULT;
    } else {
      return [];
    }
  },
  toggleFullScreen() {
    let doc = window.document;
    let docEl = doc.documentElement;

    let requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullScreen ||
      docEl.msRequestFullscreen;
    let cancelFullScreen =
      doc.exitFullscreen ||
      doc.mozCancelFullScreen ||
      doc.webkitExitFullscreen ||
      doc.msExitFullscreen;

    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      requestFullScreen.call(docEl);
    } else {
      cancelFullScreen.call(doc);
    }
  }
};

// export function camel (str) {
//   const camel = (str || '').replace(/-([^-])/g, g => g[1].toUpperCase());

//   return capitalize(camel);
// }

// export function camelActual (str) {
//   return (str || '').replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
// }

// export function capitalize (str) {
//   str = str || '';

//   return `${str.substr(0, 1).toUpperCase()}${str.slice(1)}`;
// }

// export function findProduct (store, id) {
//   return store.state.store.products.find(p => p.id === id);
// }

// export function isOnSale (variants) {
//   return variants.some(variant => {
//     return parseFloat(variant.price) < parseFloat(variant.compareAtPrice);
//   });
// }
