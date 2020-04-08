<template>
  <el-button @click="handleLang">{{$t('message.key')}}</el-button>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    handleLang() {
      this.$i18n.locale = 'en'
    }
  }
}
</script>

<style scoped>

</style>
