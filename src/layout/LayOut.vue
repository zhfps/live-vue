<template>
  <div class="container">
    <!-- **********************************************************************************************************************************************************
        TOP BAR CONTENT & NOTIFICATIONS
        *********************************************************************************************************************************************************** -->
    <!--header start-->
    <div class="header black-bg">
      <zh-header />
      <div v-if="true" class="page-tags" :style="{marginLeft: tagsLeft}">
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
    </div>
    <!--header end-->
    <!-- **********************************************************************************************************************************************************
        MAIN SIDEBAR MENU
        *********************************************************************************************************************************************************** -->
    <!--sidebar start-->

    <div class="sidebar">
      <!-- sidebar menu end-->
      <div style="height: 50px;" />
      <zh-aside class="menu" @isCollapse="isCollapse" />
    </div>
    <!--sidebar end-->
    <!-- **********************************************************************************************************************************************************
        MAIN CONTENT
        *********************************************************************************************************************************************************** -->
    <!--main content start-->
    <div class="main-content">
      <!--      <div style="height: 74px;" />-->
      <div class="wrapper" :style="{marginLeft,width}">
        <router-view />
      </div>
    </div>
    <!--main content end-->
    <!--footer start-->
    <div class="site-footer">
      <div class="text-center">
        copyright 2020 zhang
      </div>
    </div>
    <!--footer end-->
  </div>
<!--  <section class="layout">-->
<!--    <div class="header">-->
<!--      <zh-header />-->
<!--    </div>-->
<!--    <div class="aside">-->
<!--      <zh-aside />-->
<!--    </div>-->
<!--    <div class="content">-->
<!--      <div class="main-content">-->
<!--        <div v-if="true" class="page-tags">-->
<!--          <tags-view-->
<!--            v-for="(item,index) in visitedViews"-->
<!--            :key="index"-->
<!--            :name="item.name"-->
<!--            :title="item.title"-->
<!--            :icon="item.icon"-->
<!--            :path="item.path"-->
<!--            :color="item.color"-->
<!--            @link="handleIsActive"-->
<!--            @close="handleClose"-->
<!--            @closeOther="handleCloseOther"-->
<!--            @closeRight="handleCloseRight"-->
<!--            @closeLeft="handleCloseLeft"-->
<!--            @closeAll="handleCloseAll"-->
<!--          />-->
<!--        </div>-->
<!--        <div class="main">-->
<!--          <div class="page">-->
<!--            <router-view />-->
<!--          </div>-->
<!--          <div class="footer">-->
<!--              copyright 2020 it_dog_zhang@163.com-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </section>-->
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
      marginLeft: '80px',
      tagsLeft: '63px',
      width: '90%'
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
    isCollapse(status) {
      console.log(status)
      if (status) {
        this.marginLeft = '80px'
        this.tagsLeft = '63px'
        this.width = '90%'
      } else {
        this.marginLeft = '200px'
        this.tagsLeft = '200px'
        this.width = '84%'
      }
    },
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
