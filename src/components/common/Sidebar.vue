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
      <template v-for="item in Menus">
        <template v-if="item.children.length>0">
          <el-submenu :key="item.id" :index="item.path">
            <template slot="title">
              <i :class="item.meta.icon" />
              <span slot="title">{{ item.meta.title }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-submenu
                v-if="subItem.children.length>0"
                :key="subItem.id"
                :index="subItem.path"
              >
                <template slot="title">
                  <i :class="subItem.meta.icon" />
                  <span slot="title">{{ subItem.meta.title }}</span>
                </template>
                <el-menu-item
                  v-for="threeItem in subItem.children"
                  :key="threeItem.id"
                  :index="threeItem.path"
                >
                  <template slot="title">
                    <i :class="threeItem.meta.icon" />
                    <span slot="title">{{ threeItem.meta.title  }}</span>
                  </template>
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :key="subItem.id"
                :index="subItem.path"
              >
                <template slot="title">
                  <i :class="subItem.meta.icon " />
                  <span slot="title">{{ subItem.meta.title  }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :key="item.id" :index="item.path">
            <i :class="item.meta.icon " />
            <span slot="title">{{ item.meta.title  }}</span>
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
    }
  },
  computed: {
    ...mapGetters([
      'collapse',
      'Menus'
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
