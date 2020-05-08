<template>
  <div>
    <div class="tag-view" v-contextmenu:contextmenu>
      <router-link class="link" :to="path" @click.native="handleClick(name)">
        <svg-icon
          class="pre-icon"
          :name="icon"
          width="18"
          height="18"
          :color="color"
        />
        <span class="title"> {{ title }}</span>
      </router-link>
      <svg-icon
        class="icon"
        name="pageclose"
        width="18"
        height="18"
        :color="color"
        @click.stop="handleClose(name)"
      />
    </div>
    <v-contextmenu ref="contextmenu" class="contextmenu">
      <v-contextmenu-item class="menu-item" @click="handleClose(name)">关闭当前标签</v-contextmenu-item>
      <v-contextmenu-item class="menu-item" @click="handleCloseOther(name)">关闭其它标签</v-contextmenu-item>
      <v-contextmenu-item class="menu-item" @click="handleCloseRight(name)">关闭右边标签</v-contextmenu-item>
      <v-contextmenu-item class="menu-item" @click="handleCloseLeft(name)">关闭左边标签</v-contextmenu-item>
      <v-contextmenu-item class="menu-item" @click="handleCloseAll()">关闭所有标签</v-contextmenu-item>
    </v-contextmenu>
  </div>
</template>

<script>
import './_TagsView.scss'
export default {
  props: {
    icon: {
      type: String,
      require: true,
      default: 'dog'
    },
    title: {
      type: String,
      require: true,
      default: 'index'
    },
    path: {
      type: String,
      require: true,
      default: '/'
    },
    name: {
      type: String,
      require: true,
      default: 'index'
    },
    color: {
      type: String,
      default: '#eee'
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleClose(val) {
      this.$emit('close', val)
    },
    handleClick(name) {
      this.$emit('link', name)
    },
    handleCloseOther(name) {
      this.$emit('closeOther', name)
    },
    handleCloseRight(name) {
      this.$emit('closeRight', name)
    },
    handleCloseLeft(name) {
      this.$emit('closeLeft', name)
    },
    handleCloseAll() {
      this.$emit('closeAll')
    }
  }
}
</script>
