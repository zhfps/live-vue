<template>
  <div class="zh-aside">
    <div class="switch">
      <svg-icon
        :name="collIcon"
        width="18px"
        height="18px"
        color="#bfbfbf"
        @click="handleColl"
      />
    </div>
    <Menu class="el-menu-vertical" :is-collapse="isCollapse" @active="handleActive" />
  </div>
</template>

<script>
import './main.scss'
import Menu from '@/components/Menu/Menu'
import { Test } from '@/router'
export default {
  name: 'ZhAside',
  components: {
    Menu
  },
  data() {
    return {
      menus: Test[0].children,
      isCollapse: true,
      collIcon: 'open'
    }
  },
  methods: {
    handleColl() {
      this.isCollapse = !this.isCollapse
      this.collIcon === 'open' ? (this.collIcon = 'close') : (this.collIcon = 'open')
    },
    handleActive(name) {
      console.log(name)
    }
  }
}
</script>
