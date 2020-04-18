<template>
  <div :class="status">
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
      @click.stop="handleClose(title)"
    />
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
    }, title: {
      type: String,
      require: true,
      default: 'index'
    }, status: {
      type: String,
      require: true,
      default: 'tag-view'
    },
    path: {
      type: String,
      require: true,
      default: '/'
    }
  },
  data() {
    return {
      activeColor: '#409EFF',
      color: '#eee'
    }
  },
  methods: {
    handleClose(val) {
      this.$emit('close', val)
    },
    handleClick(path) {
      this.$emit('link', path)
    }

  }
}
</script>
