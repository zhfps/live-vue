<template>
  <el-container class="page">
    <el-header height="60px" class="header">Header</el-header>
    <el-container class="container">
      <el-aside width="200px" class="aside">Aside</el-aside>
        <el-container>
            <el-main class="main">
                <router-view/>
            </el-main>
            <el-footer>footer</el-footer>
        </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'LayOut'
}
</script>

<style scoped>
    .page{
        margin: 0;
        padding: 0;
    }
    .header{
        background-color: azure;
    }
    .aside{
        background-color: #42b983;
        height: 100%;
        min-height: 600px;
    }
    .main{
        background-color: green;
        padding: 25px;
        min-height: 556px;
    }
    .footer{
        height: 44px;
        background-color: red;
    }
</style>
