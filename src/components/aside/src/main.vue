<template>
  <div class="zh-aside">
    <div :class="switchClass">
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
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ZhAside',
  components: {
    Menu
  },
  data() {
    return {
      isCollapse: true,
      collIcon: 'open',
      index: 1,
      switchClass: 'switch'
    }
  },
  computed: {
    ...mapGetters([
      'menus'
    ])
  },
  methods: {
    ...mapActions({
      isActive: 'sideMenu/changActiveIcon'
    }),
    handleColl() {
      this.isCollapse = !this.isCollapse
      this.collIcon === 'open' ? (this.collIcon = 'close') : (this.collIcon = 'open')
      this.switchClass === 'switch' ? (this.switchClass = 'switch-active') : (this.switchClass = 'switch')
    },
    handleActive(name) {
      this.isActive(name)
    }
  }
}
</script>
