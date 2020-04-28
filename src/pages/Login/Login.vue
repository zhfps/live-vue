<template>
  <div class="Login">
    <div class="descrip">login</div>
    <div class="Loginform">
      <div class="logo" />
      <el-form ref="ruleForm" :model="login" status-icon :rules="rules">
        <el-form-item class="form-item" prop="userName">
          <el-input v-model="login.userName" type="password" placeholder="请输入用户名" autocomplete="off">
            <svg-icon
              slot="prefix"
              class="icon"
              name="user"
              width="18"
              height="25"
              color="#000"
            />
          </el-input>

        </el-form-item>
        <el-form-item class="form-item" prop="passWord">
          <el-input v-model="login.passWord" placeholder="请输入密码" type="password" autocomplete="off">
            <svg-icon
              slot="prefix"
              class="icon"
              name="Password"
              width="18"
              height="25"
              color="#000"
            />
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" prop="code">
          <el-input v-model="login.code" placeholder="请输入验证码" >
            <svg-icon
                    slot="prefix"
                    class="icon"
                    name="dentifying_code"
                    width="18"
                    height="25"
                    color="#000"
            />
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="submitForm('ruleForm')">提交</el-button>
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
    var validatePassWord = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      login: {
        userName: '',
        passWord: '',
        code: ''
      },
      rules: {
        userName: [
          { validator: validateUserName, trigger: 'blur' }
        ],
        passWord: [
          { validator: validatePassWord, trigger: 'blur' }
        ],
        code: [
          { validator: checkCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 登录处理
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
