<template>
  <div :class="status">
    <svg-icon
      class="pre-icon"
      :name="icon"
      width="18"
      height="18"
    />
    <span class="title">{{ title }}</span>
    <svg-icon
      class="icon"
      name="pageclose"
      width="18"
      height="18"
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
    }
  }
}
</script>
