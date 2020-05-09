<template>
  <div class="zh-header">
    <div class="logo">
      <span class="logo-text">LOGO</span>
      <svg-icon
        clss="icon"
        name="dog"
        width="45"
        height="45"
        color="#42b983 #35495e"
      />
    </div>
    <div class="nav">
      <div class="nav-item">
        <UserInfo/>
      </div>
    </div>
  </div>
</template>

<script>
import './main.scss'
import UserInfo from '@/components/UserInfo/UserInfo'
export default {
  name: 'ZhHeader',
  components: {
    UserInfo
  },
  props: {
    height: {
      type: String,
      default: '60px'
    }
  }
}
</script>
