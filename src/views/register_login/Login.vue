<template>
  <div class="login">
    <page-header>
      <p slot="header">登录</p>
    </page-header>
    <div class="login_body">
      <login-left class="body_left"></login-left>
      <!--      邮箱，用户名登录-->
      <login-right class="body_right"
                   :username="username" :email="email" :username_or_email="username_or_email"
                   :password="password" :remembered="remembered"
                   :registerError="registerError" :emailActivatedError="emailActivatedError"
                   :passwordError="passwordError"
                   @login="login"></login-right>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import PageHeader from "@/views/register_login/rigister_child/PageHeader";
import LoginLeft from "@/views/register_login/login_child/LoginLeft";
import LoginRight from "@/views/register_login/login_child/LoginRight";

// 登录
import {toLogin} from "../../network/user_request";
// 如果保存了密码，就直接从服务器请求下来
import {getUserPassword} from "../../network/user_request";

export default {
  name: "Login",
  components: {
    PageHeader,
    LoginLeft,
    LoginRight
  },
  data() {
    return {
      username: "",
      email: "",
      username_or_email:"",
      password:"",
      remembered:false,
      login_form: "",

      registerError: false,//没有注册；
      emailActivatedError: false,
      passwordError: false,
    }
  },
  activated() {
    this.username = this.$route.params.username
    this.get_user_password()
  },
  mounted() {
    this.username = this.$route.params.username
    this.get_user_password()
    // 然后刷新页面

  },
  methods: {
    // 获取用户要保存的密码信息
    get_user_password() {
      getUserPassword().then(res => {
        this.username_or_email = res["username_or_email"]
        this.password = res["password"]
        this.remembered = res["remember"]
      })
    },

    // 用户登录
    login(login_form) {
      this.login_form = login_form
      // 往服务器发送请求看看是否激活了；
      toLogin(this.login_form).then(res => {
            console.log(res)
            // 没有注册
            if (res["is_register"] === false) {
              this.register_error()
            }
            //邮箱没有激活
            else if (res["is_activated"] === false) {
              this.email_activated_error()
            }
            //密码错误
            else if (res["right_password"] === false) {
              this.password_error()
            }
            // 登录成功；
            else if (res["right_password"] === true) {
              this.login_success(res)
            }
          }
      );
    },

    // 用户没有注册
    register_error() {
      this.registerError = true
      this.$alert('该账号还没有注册', '你是傻逼吗？', {
        confirmButtonText: '确定',
        callback: () => {
        }
      });
    },

    // 邮箱没有激活
    email_activated_error() {
      this.emailActivatedError = true
      this.$alert('用户邮箱未激活', '你是傻逼吗？', {
        confirmButtonText: '确定',
        callback: () => {
        }
      });
    },
    // 密码错误，登录失败
    password_error() {
      this.passwordError = true
      this.$alert('用户名或密码错误', '你是傻逼吗？', {
        confirmButtonText: '确定',
        callback: () => {
        }
      });
    },
    // 登录成功
    login_success(res) {
      this.$store.state.user = {
        username: res["username"],
        uuid: res["uuid"],
        login: true,
      };
      this.$store.state.user_info = res["user_info"]
      this.$store.state.login = true
      this.$router.push({
        name: "mainPage"
      })
    },
  },
}
</script>

<style scoped>
.login_body {
  display: flex;
  justify-content: center;
}

.body_left, .body_right {
  width: 30vw;
  min-width: 480px;
}

</style>