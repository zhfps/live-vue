<template>
  <div>
    <div class="tag-view" @contextmenu.stop.prevent="$refs.ctxshow.showMenu($event)">
      <router-link class="link" :to="path" @click.native="handleClick">
        <svg-icon
          class="pre-icon"
          :name="icon"
          width="18"
          height="18"
          :color="activeColor"
        />
        <span class="title"> {{ title }}</span>
      </router-link>
      <svg-icon
        class="icon"
        name="pageclose"
        width="18"
        height="18"
        color="#409EFF"
        @click.stop="handleClose(name)"
      />
    </div>
    <e-vue-contextmenu id="contextStyle" ref="ctxshow" class="contextmenu">
      <div class="menu-item" @click.stop="handleClose(name)">关闭当前标签</div>
      <div class="menu-item" @click.stop="handleCloseOther(name)">关闭其它标签</div>
      <div class="menu-item" @click.stop="handleCloseRight(name)">关闭右边标签</div>
      <div class="menu-item" @click.stop="handleCloseLeft(name)">关闭左边标签</div>
      <div class="menu-item" @click.stop="handleCloseAll()">关闭所有标签</div>
      <div class="tag-view" @contextmenu.prevent="handleOnMousedown" />
    </e-vue-contextmenu>
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
    }
  },
  data() {
    return {
      contextmenu: false,
      activeColor: '#409EFF',
      color: '#eee'
    }
  },
  watch: {
    contextmenu(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    closeMenu() {
      this.contextmenu = false
    },
    handleClose(val) {
      this.$emit('close', val)
    },
    handleClick(path) {
      this.$emit('link', path)
    },
    handleOnMousedown(event) {
      this.contextmenu = true
    },
    handleCloseOther(name) {
      this.$emit('CloseOther', name)
    },
    handleCloseRight(name) {
      this.$emit('CloseRight', name)
    },
    handleCloseLeft(name) {
      this.$emit('CloseLeft', name)
    },
    handleCloseAll() {
      this.$emit('CloseAll')
    }
  }
}
</script>
