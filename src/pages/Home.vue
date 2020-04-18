<template>
<!--  <el-button @click="handleLang">{{ $t('message.key') }}</el-button>-->
    <div>{{icons}}</div>
</template>

<script>
import { test } from '@/api/module/Test'
import icons from '@/icons'
export default {
  name: 'Home',
  data() {
    return {
      icons
    }
  },
  methods: {
    handleLang() {
      this.$i18n.locale = 'en'
      this.handleTestApi()
    },
    handleTestApi() {
      new Promise((resolve, reject) => {
        test().then(res => {
          console.log(res)
          resolve(res)
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
