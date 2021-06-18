<template>
  <div class="loading">
    <div class="username_content">
      <div class="username">
        {{ username + ""}}
      </div>
      <div class="hello"><p>你好：</p></div>
    </div>
    <div class="loading_message"><p>{{ loading_message }}</p></div>
  </div>
</template>

<script>
// 根据uuid判断用户是否激活；
import {isActivated} from "../../network/user_request";

export default {
  name: "LoadPage",
  data() {
    return {
      loading_message: `邮件已经发送，请前往邮箱进行验证；
      如果没收到，或许在垃圾邮件中可以看见；
      要是还没有，那我也没有办法……`,
      is_activated: false,
      username: '',
      uuid: '',
    }
  },
  methods: {
    go_to_login() {
      this.$router.push({
        name: "login",
        params: {
          username: this.username
        }
      })
    }
  },
  mounted() {
    this.username = this.$route.params.username
    this.uuid = this.$route.params.uuid
    // 往服务器发送请求看看是否激活了；
    isActivated(this.uuid).then(res => {
          console.log(res)
          this.is_activated = res["email_activated"]
          // 如果已经激活，前往登录页面；
          if (this.is_activated) {
            this.go_to_login()
          }
        }
    );
  },

}
</script>

<style scoped>
.username{
  text-shadow: 1px 1px 0 yellow,
  2px 2px 0 blue,
  3px 3px red,
  4px 4px 0 black;
  /*font-family: var(--ff-title);*/
  font-weight: 1000;
  text-transform: uppercase;
  font-size: calc(2rem + 3vw);
  text-align: center;
  margin: 0;
  color: var(--color-tint);
}
.hello{
  display: flex;
  align-items: center;
  margin-left: 2%;
}
.hello > p{
  margin-top: 5vh;
  font-size: calc(1rem + 1vw);
  font-family: "Adobe 仿宋 Std R",serif;
}
.loading_message{
  margin-top: 5vh;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 20px;
  font-family: 华文行楷,serif;
}
/*动画*/
.username_content {
  min-width: 1000px;
  margin-top: 10vh;
  display: flex;
  justify-content: center;
  align-content: center;
  -webkit-animation: username 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
  animation: username 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
}

@-webkit-keyframes username {
  0% {
    letter-spacing: 1em;
    -webkit-transform: translateZ(400px);
    transform: translateZ(400px);
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}

@keyframes username {
  0% {
    letter-spacing: 1em;
    -webkit-transform: translateZ(400px);
    transform: translateZ(400px);
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}
</style>