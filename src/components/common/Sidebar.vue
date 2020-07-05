<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :key="item.index" :index="item.index">
            <template slot="title">
              <i :class="item.icon" />
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :key="subItem.index"
                :index="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >
                  <template slot="title">
                    <i :class="threeItem.icon" />
                    <span slot="title">{{ threeItem.title }}</span>
                  </template>
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :key="subItem.index"
                :index="subItem.index"
              >
                <template slot="title">
                  <i :class="subItem.icon" />
                  <span slot="title">{{ subItem.title }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :key="item.index" :index="item.index">
            <i :class="item.icon" />
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Sidebar',
  data() {
    return {
      items: [
        {
          icon: 'el-icon-house',
          index: 'dashboard',
          title: '系统首页'
        }, {
          icon: 'el-icon-setting',
          index: 'system',
          title: '系统管理',
          subs: [
            {
              icon: 'el-icon-setting',
              index: 'menus',
              title: '菜单管理'
            },
            {
              icon: 'el-icon-user',
              index: 'users',
              title: '用户管理'
            }, {
              icon: 'el-icon-connection',
              index: 'permissions',
              title: '权限管理'
            }
          ]
        },
        {
          icon: 'el-icon-lx-cascades',
          index: 'table',
          title: '基础表格'
        },
        {
          icon: 'el-icon-lx-copy',
          index: 'tabs',
          title: 'tab选项卡'
        },
        {
          icon: 'el-icon-lx-calendar',
          index: '3',
          title: '表单相关',
          subs: [
            {
              index: 'form',
              title: '基本表单'
            },
            {
              index: '3-2',
              title: '三级菜单',
              subs: [
                {
                  index: 'editor',
                  title: '富文本编辑器'
                },
                {
                  index: 'markdown',
                  title: 'markdown编辑器'
                }
              ]
            },
            {
              index: 'upload',
              title: '文件上传'
            }
          ]
        },
        {
          icon: 'el-icon-lx-emoji',
          index: 'icon',
          title: '自定义图标'
        },
        {
          icon: 'el-icon-pie-chart',
          index: 'charts',
          title: 'schart图表'
        },
        {
          icon: 'el-icon-rank',
          index: '6',
          title: '拖拽组件',
          subs: [
            {
              index: 'drag',
              title: '拖拽列表'
            },
            {
              index: 'dialog',
              title: '拖拽弹框'
            }
          ]
        },
        {
          icon: 'el-icon-lx-global',
          index: 'i18n',
          title: '国际化功能'
        },
        {
          icon: 'el-icon-lx-warn',
          index: '7',
          title: '错误处理',
          subs: [
            {
              index: 'permission',
              title: '权限测试'
            },
            {
              index: '404',
              title: '404页面'
            }
          ]
        },
        {
          icon: 'el-icon-lx-redpacket_fill',
          index: '/donate',
          title: '支持作者'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'collapse'
    ]),
    onRoutes() {
      return this.$route.path.replace('/', '')
    }
  }
}
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
