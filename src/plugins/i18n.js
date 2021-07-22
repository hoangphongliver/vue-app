import Vue from "vue"
import VueI18n from "vue-i18n"
import enMessage from "../language/en.json"
import jaMessage from "../language/ja.json"
import koMessage from "../language/ko.json"
import zhHansMessage from "../language/zh-Hans.json"
import zhHantMessage from "../language/zh-Hant.json"

Vue.use(VueI18n)

const messages = {
    en: enMessage,
    ja: jaMessage,
    ko: koMessage,
    'zh-Hans': zhHansMessage,
    'zh-Hant': zhHantMessage
}

const i18n = new VueI18n({
    locale: 'en', // set locale
    messages,
    fallbackLocale: 'en',
})

export default i18n