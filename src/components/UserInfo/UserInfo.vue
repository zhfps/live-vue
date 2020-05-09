<template>
  <div class="UserInfo">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="40">
          <!--            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>-->
          <span>admin</span>
        </el-avatar>
        <!--        <i class="el-icon-arrow-down el-icon&#45;&#45;right" />-->
        <svg-icon
          class="icon"
          name="xiala"
          width="10"
          height="10"
          color="#000"
        />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data() {
    return {
      visible: false
    }
  }
}
</script>
