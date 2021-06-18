<template>
  <div>
    <el-popover  v-show="!$store.state.login"
        placement="bottom" width="350"
        trigger="hover" close-delay="500">
      <div class="title">登录后你可以：</div>
      <div class="login_info">
        <div><i class="el-icon-picture-outline login_item"></i> 免费看高清视频</div>
        <div><i class="el-icon-notebook-2 login_item"></i> 多端同步播放记录</div>
        <div><i class="el-icon-postcard login_item"></i> 发表弹幕/评论</div>
        <div><i class="el-icon-video-play login_item"></i> 热门番剧影视看不停</div>
      </div>
      <div class="to_login" @click="to_login"><p>立即登录</p></div>
      <div class="first_use">
        <div>首次使用？</div>
        <div class="to_register" @click="to_register">点我注册</div>
      </div>
      <div slot="reference" class="login_img">
        <img src="@/assets/img/login_white.svg" alt="" @click="to_login"/>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "BeforeLogin",
  methods:{
    to_login() {
      this.$router.push("/login")
      // 这里有点不清楚为什么当初这么写了；先注释掉；
      // location.reload();
    },
    to_register() {
      this.$router.push("/register")
    }
  }
}
</script>

<style scoped>
.right_slot img {
  height: 4vh;
  margin-top: 1.25vh;
  cursor: pointer;
}

.login_info {
  display: flex;
  flex-wrap: wrap;
}

.title {
  width: 100%;
  margin-bottom: 15px;
}

.login_info div {
  width: 50%;
  margin-bottom: 15px;
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
}

.to_login:hover {
  opacity: 0.8
}

.to_login p {
  size: 18px;
  color: white;
  cursor: pointer;
}

.first_use {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.to_register {
  color: var(--color-tint);
  cursor: pointer;
}

.to_register:hover {
  opacity: 0.8;
}

.login_item {
  color: var(--color-tint);
}
</style>