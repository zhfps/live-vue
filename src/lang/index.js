import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import zhLocale from './zh'
import enLocale from './en'
const messages = {
  en: {
    ...enLocale
  },
  zh: {
    ...zhLocale
  }
}
const i18n = new VueI18n({
  locale: 'zh',
  messages
})

export default i18n
