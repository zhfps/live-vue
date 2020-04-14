import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from '@/router'
import ElementUI from 'element-ui'
import i18n from '@/lang'
import SvgIcon from 'vue-svgicon'
import '@/router/permission'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(SvgIcon, {
  tagName: 'svg-icon'
})
Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
