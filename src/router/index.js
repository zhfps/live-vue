import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: () => import(/* webpackChunkName: "home" */ '../layout/Layout.vue'),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/dashboard',
          component: () => import(/* webpackChunkName: "dashboard" */ '../pages/page/Dashboard.vue'),
          meta: { title: '系统首页' }
        },
        {
          path: '/menus',
          component: () => import('@/pages/Menus/Menus'),
          meta: { title: '菜单管理' }
        }, {
          path: '/users',
          component: () => import('@/pages/Users/Users'),
          meta: { title: '用户管理' }
        }, {
          path: '/permissions',
          component: () => import('@/pages/Permission/Permission'),
          meta: { title: '权限管理' }
        },
        {
          path: '/icon',
          component: () => import(/* webpackChunkName: "icon" */ '../pages/page/Icon.vue'),
          meta: { title: '自定义图标' }
        },
        {
          path: '/table',
          component: () => import(/* webpackChunkName: "table" */ '../pages/page/BaseTable.vue'),
          meta: { title: '基础表格' }
        },
        {
          path: '/tabs',
          component: () => import(/* webpackChunkName: "tabs" */ '../pages/page/Tabs.vue'),
          meta: { title: 'tab选项卡' }
        },
        {
          path: '/form',
          component: () => import(/* webpackChunkName: "form" */ '../pages/page/BaseForm.vue'),
          meta: { title: '基本表单' }
        },
        {
          // 富文本编辑器组件
          path: '/editor',
          component: () => import(/* webpackChunkName: "editor" */ '../pages/page/VueEditor.vue'),
          meta: { title: '富文本编辑器' }
        },
        {
          // markdown组件
          path: '/markdown',
          component: () => import(/* webpackChunkName: "markdown" */ '../pages/page/Markdown.vue'),
          meta: { title: 'markdown编辑器' }
        },
        {
          // 图片上传组件
          path: '/upload',
          component: () => import(/* webpackChunkName: "upload" */ '../pages/page/Upload.vue'),
          meta: { title: '文件上传' }
        },
        {
          // vue-schart组件
          path: '/charts',
          component: () => import(/* webpackChunkName: "chart" */ '../pages/page/BaseCharts.vue'),
          meta: { title: 'schart图表' }
        },
        {
          // 拖拽列表组件
          path: '/drag',
          component: () => import(/* webpackChunkName: "drag" */ '../pages/page/DragList.vue'),
          meta: { title: '拖拽列表' }
        },
        {
          // 拖拽Dialog组件
          path: '/dialog',
          component: () => import(/* webpackChunkName: "dragdialog" */ '../pages/page/DragDialog.vue'),
          meta: { title: '拖拽弹框' }
        },
        {
          // 国际化组件
          path: '/i18n',
          component: () => import(/* webpackChunkName: "i18n" */ '../pages/page/I18n.vue'),
          meta: { title: '国际化' }
        },
        {
          // 权限页面
          path: '/permission',
          component: () => import(/* webpackChunkName: "permission" */ '../pages/page/Permission.vue'),
          meta: { title: '权限测试', permission: true }
        },
        {
          path: '/404',
          component: () => import(/* webpackChunkName: "404" */ '../pages/page/404.vue'),
          meta: { title: '404' }
        },
        {
          path: '/403',
          component: () => import(/* webpackChunkName: "403" */ '../pages/page/403.vue'),
          meta: { title: '403' }
        },
        {
          path: '/donate',
          component: () => import(/* webpackChunkName: "donate" */ '../pages/page/Donate.vue'),
          meta: { title: '支持作者' }
        }
      ]
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ '@/pages/Login/Login.vue'),
      meta: { title: '登录' }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
