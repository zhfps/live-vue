<template>
  <div>
    <div @contextmenu.stop.prevent="$refs.ctxshow.showMenu($event)">
      鼠标右键点击
    </div>
    <e-vue-contextmenu id="contextStyle" ref="ctxshow">
      <div>Sql数据操作</div>
      <div>打开表</div>
      <div>生成代码</div>
    </e-vue-contextmenu>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      require: true,
      default: 'hello world'
    }
  },
  created() {
    console.log('yy')
  },
  methods: {
    hideMenu() {
      this.$refs.ctxshow.hideMenu() // 隐藏菜单
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
