<template>
  <div>
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
            v-for="(item,index) in visitedViews"
            :key="index"
            :name="item.name"
            :title="item.title"
            :icon="item.icon"
            :path="item.path"
            @close="handleClose"
            @CloseOther="handleCloseOther"
            @CloseRight="handleCloseRight"
            @CloseLeft="handleCloseLeft"
            @CloseAll="handleCloseAll"
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
import { mapGetters } from 'vuex'
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
    handleClose(val) {
      // this.tags.splice(this.tags.findIndex(item => item.title === val), 1)
    },
    handleCloseOther(val) {
      console.log('Other:' + val)
    },
    handleCloseRight(val) {
      console.log('Right:' + val)
    },
    handleCloseLeft(val) {
      console.log('Left:' + val)
    },
    handleCloseAll() {
      console.log('All')
    }
  }
}
</script>
