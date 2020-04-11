<template>
  <el-button @click="handleLang">{{ $t('message.key') }}</el-button>
</template>

<script>
import { test } from '@/api/module/Test'
export default {
  name: 'Home',
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
