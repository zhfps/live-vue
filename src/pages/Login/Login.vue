<template>
  <div class="Login">
    <div class="descrip">login</div>
    <div class="Loginform">
      <div class="logo" />
      <el-form ref="ruleForm" :model="login" status-icon :rules="rules">
        <el-form-item class="form-item" prop="userName">
          <el-input v-model="login.userName" type="text" placeholder="请输入用户名" autocomplete="off">
            <template slot="prepend" style="width: 120px;">
              <svg-icon
                slot="prefix"
                class="icon"
                name="user"
                width="18"
                height="25"
                color="#000"
              />
            </template>
          </el-input>

        </el-form-item>
        <el-form-item class="form-item" prop="password">
          <el-input v-model="login.password" placeholder="请输入密码" type="password" autocomplete="off">
            <template slot="prepend" style="width: 120px;">
              <svg-icon
                slot="prefix"
                name="Password"
                width="18"
                height="25"
                color="#000"
              />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="form-item-code" prop="code">
          <el-input v-model="login.code" type="text" placeholder="请输入验证码">
            <el-image slot="append" class="login-code" :src="codeUrl" @click="replaceCode" />
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="reg-bar">
        <el-link class="reg" :underline="false">立即注册</el-link>
        <el-link class="forget" :underline="false">忘记密码</el-link>
      </div>
    </div>
  </div>
</template>

<script>
import './_Login.scss'
import { mapActions } from 'vuex'
export default {
  data() {
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'))
      }
      callback()
    }
    var validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      login: {
        userName: 'admin',
        password: '123456',
        code: 'PMcB'
      },
      codeUrl: 'http://localhost:8080/captchaImage/1',
      rules: {
        userName: [
          { validator: validateUserName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        code: [
          { validator: checkCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      Login: 'userInfo/Login',
      GetUserInfo: 'userInfo/GetUserInfo'
    }),
    replaceCode() {
      const url = 'http://localhost:8080/captchaImage/' + Math.random()
      this.codeUrl = url
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 登录处理
          this.Login(this.login).then(res => {
            if (res) {
              this.GetUserInfo()
              this.$router.push({ path: this.redirect || '/' })
            }
          })
        } else {
          this.resetForm(formName)
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style>
  .login-code {
    height: 38px;
    width: 120px;
    display: block;
    margin: 0px -20px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
</style>
