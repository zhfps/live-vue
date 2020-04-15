<template>
  <el-menu-item :index="index" @click="handleLink(path)">
    <svg-icon
      class="el-icon-location"
      name="open"
      color="#eee"
    />
    <span slot="title">{{ title }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    index: {
      type: [String, Number],
      require: true
    },
    title: {
      type: String,
      require: true
    },
    path: {
      type: String,
      require: true
    }
  },
  methods: {
    handleLink(path) {
      const link = this.$route.path
      if (path === link) {
        this.$router.forward(path)
      } else {
        this.$router.push(path)
      }
    }
  }
}
</script>
