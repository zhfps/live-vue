<template>
  <div class="Home">
    <div class="date">{{ sdate }}</div>
    <div class="week">{{ sweek }}</div>
    <div class="time">{{ stime }}</div>
  </div>
</template>

<script>
import './_Home.scss'
export default {
  name: 'Home',
  data() {
    return {
      stime: '00:00:00',
      sdate: this.getDate(),
      sweek: this.getWeek()
    }
  },
  created() {
    this.setTime()
  },
  methods: {
    getTime() {
      const time = new Date()
      const strTime = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
      return strTime
    },
    getDate() {
      const time = new Date()
      const strDate = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日'
      return strDate
    },
    getWeek() {
      const time = new Date()
      const week = time.getDay()
      let strweek
      if (week === 0) {
        strweek = '星期天'
      } if (week === 1) {
        strweek = '星期一'
      } if (week === 2) {
        strweek = '星期二'
      } if (week === 3) {
        strweek = '星期三'
      } if (week === 4) {
        strweek = '星期四'
      } if (week === 5) {
        strweek = '星期五'
      } if (week === 6) {
        strweek = '星期六'
      }

      return strweek
    },
    setTime() {
      setInterval(() => {
        this.stime = this.getTime()
      }, 1000)
    }
  }
}
</script>
