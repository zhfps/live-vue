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
          <tags-view v-for="(item,index) in tags" :key="index" :title="item.title" :icon="item.icon" :status="item.status" />
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
        status: 'tag-view'
      }, {
        icon: 'eye',
        title: 'index',
        status: 'tag-view-active'
      }]
    }
  }
}
</script>
