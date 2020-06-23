<template>
  <div class="wrapper">
    <v-head />
    <v-sidebar />
    <div class="content-box" :class="{'content-collapse':collapse}">
      <v-tags />
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view />
          </keep-alive>
        </transition>
        <el-backtop target=".content" />
      </div>
    </div>
  </div>
</template>

<script>
import vHead from '@/components/common/Header.vue'
import vSidebar from '@/components/common/Sidebar.vue'
import vTags from '@/components/common/Tags.vue'
import bus from '@/plugin/bus'
export default {
  components: {
    vHead,
    vSidebar,
    vTags
  },
  data() {
    return {
      tagsList: [],
      collapse: false
    }
  },
  created() {
    bus.$on('collapse-content', msg => {
      this.collapse = msg
    })

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', msg => {
      const arr = []
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name)
      }
      this.tagsList = arr
    })
  }
}
</script>
