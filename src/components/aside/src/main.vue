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
    <el-menu class="el-menu-vertical" :collapse="isCollapse">
      <template v-for="(item,index) in menus">
        <sub-menu
          v-if="item.children && item.children.length > 0"
          :data="item.children"
          :key="item.name"
          :index="item.name+index"
          :title="item.meta.title"
          :path="'/'+item.path"
        />
        <menu-item
          v-else
          :key="item.name"
          :index="item.name+index"
          :title="item.meta.title"
          :path="'/'+item.path"
        />
      </template>
      <el-submenu index="1">
        <template slot="title">
        <i class="el-icon-location" />
        <span slot="title">导航一xxxxx</span>
      </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu" />
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document" />
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting" />
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import './main.scss'
import SubMenu from '@/components/SubMenu/SubMenu'
import MenuItem from '@/components/MenuItem/MenuItem'
import { Test } from '@/router'
export default {
  name: 'ZhAside',
  components: {
    SubMenu,
    MenuItem
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
      console.log('xx')
      this.isCollapse = !this.isCollapse
      this.collIcon === 'open' ? (this.collIcon = 'close') : (this.collIcon = 'open')
    }
  }
}
</script>
