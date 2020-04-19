<template>
  <!--  <el-button @click="handleLang">{{ $t('message.key') }}</el-button>-->
  <!--    <div>{{icons}}</div>-->
  <div />
</template>

<script>
import { test } from '@/api/module/Test'
// import icons from '@/icons'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      // icons
    }
  },
  computed: {
    ...mapGetters([
      'visitedViews'
    ])
  },
  created() {
    console.log(this.visitedViews)
  },
  methods: {
    ...mapActions({
      addView: 'tagsView/addView'
    }),
    handleLang() {
      // this.$i18n.locale = 'en'
      // this.handleTestApi()
      this.addView('xx')
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
