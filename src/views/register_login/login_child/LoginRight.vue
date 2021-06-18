<template>
  <div class="login_form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item>
        <div class="login_type">
          <div>密码登录</div>
          <div>验证码登录</div>
          <div style="color: #ff5777">到时候这里的颜色得改一下；</div>
        </div>
      </el-form-item>
      <el-form-item prop="username_or_email">
        <el-input v-model="form.username_or_email" placeholder="你的用户名/邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <div class="remember_box_line">
          <el-checkbox v-model="form.remember" text-color="black">
            <div class="remember_box">
              <div style="color: #606266">记住我</div>
              <div style="color: lightgray;">不是自己的电脑上不要勾选此选项</div>
            </div>
          </el-checkbox>
          <div @click="to_reset_password">
            忘记密码？
          </div>
        </div>
        <div class="to_login" @click="submit"><p>登录</p></div>
        <div class="to_register">
          <div @click="to_register">
            没有账号？立即注册>>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "LoginRight",
  props: {
    username: null,
    email: null,
    username_or_email: null,
    password: null,
    remembered: {
      default(){
        return false;
      }
    },
    registerError: null,
    passwordError: null,
    emailActivatedError: null,
  },
  data() {
    return {
      form: {
        username_or_email: undefined,
        password: undefined,
        remember: false,
      },
      rules: {
        username_or_email: [
          {required: true, message: '请输入用户名或邮箱', trigger: 'blur'},
          {min: 2, message: '请输入正确的用户名或邮箱', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    to_reset_password() {
      this.$router.push("/resetPassword")
    },
    to_register() {
      this.$router.push("/register")
    },

    // 登录前先进行表单验证
    submit() {
      this.$refs.form.validate(this.login)
    },

    // 没问题再登录；
    login(valid) {
      // 如果提交表单，判断没有问题，前往服务器进行登录；
      if (valid) {
        this.$emit("login", this.form)
      } else {
        return false
      }
    },
    get_user_password() {
      if(this.remembered){
        this.$set(this.form, "username_or_email", this.username_or_email)
        this.$set(this.form, "password", this.password)
        this.$set(this.form, "remember", this.remembered)
      }
    }
  },
  mounted() {
  },
  watch: {
    "remembered": "get_user_password"
  }
}
</script>

<style scoped>
.login_form {
  transform: translate(-2vw, 0);
}

.login_type {
  display: flex;
  transform: translate(0, 20px);
  color: var(--color-tint);
  cursor: pointer;
}

.login_type div {
  margin-right: 20px;
}

.to_login {
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
  background-color: var(--color-tint);
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  color: white;
}

.to_login:hover {
  opacity: 0.8;
}

.remember_box {
  display: flex;
}

.remember_box > * {
  margin-right: 10px;
}

.remember_box_line {
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.remember_box {
  font-size: 13px;
}

.remember_box_line:nth-child(1) {
  color: var(--color-tint);
}

.to_register {
  font-size: 13px;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  color: var(--color-tint);
  transform: translate(0, -10px);
}
</style>