<template>
  <div class="zh-header">
    <div class="logo">
      <span class="logo-text">It_dog</span>
      <svg-icon
        name="dog"
        width="45"
        height="45"
        color="#42b983 #35495e"
      />
    </div>

  </div>
</template>

<script>
import './main.scss'
export default {
  name: 'ZhHeader',

  componentName: 'Header',

  props: {
    height: {
      type: String,
      default: '60px'
    }
  }
}
</script>
