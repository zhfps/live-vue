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
import { mapGetters } from 'vuex'
import vHead from '@/components/common/Header.vue'
import vSidebar from '@/components/common/Sidebar.vue'
import vTags from '@/components/common/Tags.vue'
export default {
  components: {
    vHead,
    vSidebar,
    vTags
  },
  computed: {
    ...mapGetters([
      'collapse',
      'tagsList'
    ])
  }
}
</script>
