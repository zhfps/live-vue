<template>
  <div class="layout">
    <div class="header">
      <zh-header />
    </div>
    <div class="content">
      <div class="aside">
        <zh-aside />
      </div>
      <div class="main-content">
        <div v-if="true" class="page-tags">
          <tags-view
            name="home"
            title="首页"
            icon="home"
            path="/home"
            color="#eee"
          />
          <tags-view
            v-for="(item,index) in visitedViews"
            :key="index"
            :name="item.name"
            :title="item.title"
            :icon="item.icon"
            :path="item.path"
            :color="item.color"
            @link="handleIsActive"
            @close="handleClose"
            @closeOther="handleCloseOther"
            @closeRight="handleCloseRight"
            @closeLeft="handleCloseLeft"
            @closeAll="handleCloseAll"
          />
        </div>
        <div class="main">
          <div class="page">
            <router-view />
          </div>
          <div class="footer">footer</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './Layout.scss'
import ZhHeader from '@/components/header'
import ZhAside from '@/components/aside'
import TagsView from '@/components/TagsView/TagsView'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'LayOut',
  components: {
    ZhHeader,
    ZhAside,
    TagsView
  },
  computed: {
    ...mapGetters([
      'visitedViews'
    ])
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapActions({
      isActive: 'tagsView/isActive',
      delView: 'tagsView/delView',
      delOthersViews: 'tagsView/delOthersViews',
      delAllViews: 'tagsView/delAllViews',
      delLeftView: 'tagsView/delLeftView',
      delRightView: 'tagsView/delRightView'
    }),
    handleIsActive(name) {
      this.isActive(name)
    },
    handleClose(val) {
      if ((this.visitedViews).length > 1) {
        this.$router.back()
      } else {
        this.$router.push('/')
      }
      this.delView(val)
    },
    handleCloseOther(val) {
      this.delOthersViews(val)
    },
    handleCloseRight(val) {
      this.delRightView(val)
    },
    handleCloseLeft(val) {
      this.delLeftView(val)
    },
    handleCloseAll() {
      this.delAllViews()
      this.$router.push('/')
    }
  }
}
</script>
