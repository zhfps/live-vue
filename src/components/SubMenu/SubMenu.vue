<template>
  <el-submenu :index="index">
    <template slot="title">
      <svg-icon
        class="el-icon-location"
        name="open"
        color="#eee"
      />
      <span slot="title">{{ title }}</span>
    </template>
    <template v-for="(item,key) in data">
      <sub-menu
        v-if="item.children && item.children.length > 0"
        :key="item.name"
        :index="item.name+index"
        :data="item.children"
        :title="item.meta.title"
        :path="path+'/'+item.path"
      />
      <menu-item
        v-else
        :key="item.name"
        :index="item.name+key"
        :title="item.meta.title"
        :path="path+'/'+item.path"
      />
    </template>
  </el-submenu>
</template>

<script>
import MenuItem from '@/components/MenuItem/MenuItem'
export default {
  name: 'SubMenu',
  components: {
    MenuItem
  },
  props: {
    title: {
      type: String,
      require: true
    },
    index: {
      type: [String, Number],
      require: true
    },
    data: {
      type: Array,
      require: true
    },
    path: {
      type: String,
      require: true
    }
  }
}
</script>
