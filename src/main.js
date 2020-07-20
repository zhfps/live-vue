import Vue from 'vue'
import App from './App.vue'
import store from './state/index'
import router from './router'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'
import VueI18n from 'vue-i18n'
import iconPicker from 'vue-fontawesome-elementui-icon-picker'
import { messages } from '@/plugin/i18n'
import '@/router/permission'
import '@/icons/svg/index'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css'
import '@/directive/directives'
import 'babel-polyfill'

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(ElementUI)
Vue.use(SvgIcon, {
  tagName: 'svg-icon'
})
Vue.use(iconPicker)
const i18n = new VueI18n({
  locale: 'zh',
  messages
})
new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
