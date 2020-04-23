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
import { mapGetters } from 'vuex'
export default {
  name: 'ZhAside',
  components: {
    Menu
  },
  data() {
    return {
      isCollapse: true,
      collIcon: 'open',
      index: 1
    }
  },
  computed: {
    ...mapGetters([
      'menus'
    ])
  },
  methods: {
    handleColl() {
      this.isCollapse = !this.isCollapse
      this.collIcon === 'open' ? (this.collIcon = 'close') : (this.collIcon = 'open')
    },
    handleActive(name) {
      console.log(this.findMenuItem(this.menus, name))
    },
    findMenuItem(data, name) {
      let Item = {}
      data.forEach(item => {
        if (item.children && (item.children).length > 0) {
          Item = this.findMenuItem(item.children, name)
        } else {
          if (item.name === name) {
            Item = item
            return false
          }
        }
      })
      return Item
    }
  }
}
</script>
