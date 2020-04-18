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
          <tags-view v-for="(item,index) in tags" :key="index" :title="item.title" :icon="item.icon" :path="item.path" @close="handleClose" />
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
export default {
  name: 'LayOut',
  components: {
    ZhHeader,
    ZhAside,
    TagsView
  },
  data() {
    return {
      tags: [{
        icon: 'dog',
        title: 'home',
        path: '/home'
      }, {
        icon: 'eye',
        title: 'index',
        path: '/hello'
      }]
    }
  },
  methods: {
    handleClose(val) {
      this.tags.splice(this.tags.findIndex(item => item.title === val), 1)
    }
  }
}
</script>
