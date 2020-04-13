<template>
  <div>
    <div class="header">
      <zh-header />
    </div>
    <div class="content">
      <div class="aside">
        <zh-aside/>
      </div>
      <div class="main-content">
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
export default {
  name: 'LayOut',
  components: {
    ZhHeader,
    ZhAside
  }
}
</script>
