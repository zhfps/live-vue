import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from '@/state'
import router from '@/router'
import '@/directive/drag'
import ElementUI from 'element-ui'
import i18n from '@/lang'
import SvgIcon from 'vue-svgicon'
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'

import '@/router/permission'
import '@/icons/svg/index'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(SvgIcon, {
  tagName: 'svg-icon'
})
Vue.use(contentmenu)
Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
