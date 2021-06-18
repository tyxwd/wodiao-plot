<template>
  <div>
    <el-popover v-show="$store.state.login"
                placement="bottom" width="250"
                trigger="hover" close-delay="200">
      <div class="user_img">
        <el-avatar :src="user_info['user_img']" :size="80"></el-avatar>
      </div>
      <div class="username"><p>{{ username }}</p></div>
      <div class="user_level">
        <div class="level_info">
          <div>等级{{ user_info['level'] }}</div>
          <div>{{ user_info['scores'] }}</div>
        </div>
        <div>
          <el-progress :percentage="100" stroke-width=1 color="orange" :show-text="false"></el-progress>
        </div>
        <div class="coins">
          <div class="coins_info"><img class="coin" src="@/assets/img/coin.svg" alt="">
            <p>{{ user_info['coins'] }}</p>
          </div>
          <div class="actived">
            <img class="email" src="@/assets/img/email.svg" alt="">
            <div>邮箱已激活</div>
          </div>
        </div>
      </div>
      <div class="user_info">
        <div><i class="el-icon-user login_item"></i> 个人中心</div>
        <div><i class="el-icon-folder-opened login_item"></i> 文件管理</div>
        <div><i class="el-icon-discover login_item"></i> 历史记录</div>
        <div><i class="el-icon-star-off login_item"></i> 我的收藏</div>
      </div>
      <div class="exit" @click="exit">
        <div><img src="@/assets/img/exit.svg" alt=""> 退出</div>
      </div>
      <div slot="reference" class="login_img">
        <img :src="user_info['user_img']" alt=""
             @click="get_detail_infos"/>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "AfterLogin",
  data() {
    return {
      coins: 1100,
      user_level: 10,
      precent: "133/11111111111"
    }
  },
  methods: {
    get_detail_infos() {
      console.log("detail")
    },
    // 退出登录
    exit(){
      this.$emit("exit")
    }
  },
  computed: {
    username() {
      return this.$store.state.user["username"]
    },
    user_info() {
      return this.$store.state.user_info
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

.login_img img {
  border-radius: 50%
}

/*这下面的是右边的css*/
.user_img {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  cursor: pointer;
}

.right_slot img {
  height: 5vh;
  margin-top: .75vh;
  cursor: pointer;
}

.login_info div {
  width: 50%;
  margin-bottom: 15px;
}

.to_login p {
  size: 18px;
  color: white;
  cursor: pointer;
}

/*.login_item {*/
/*  color: var(--color-tint);*/
/*}*/

/*这下面是右边登录后的css*/
.username {
  font-weight: 600;
  font-size: 22px;
  font-family: "Adobe 黑体 Std R", serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
}

.user_level {
  border-bottom: #ececec solid 1px;
  margin-top: 10px;
}

.level_info {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-top: 5px;
  margin-bottom: 10px;
}

.level_info:first-child {
  color: #212121;
}

.level_info:last-child {
  color: #606266;
}

.el-progress {
  margin-bottom: 20px;
}

.coins {
  font-size: 13px;
  color: #212121;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
}

.coins_info {
  display: flex;
  align-items: center;
}

.actived {
  display: flex;
  align-items: center;
  font-size: 13px;
  justify-content: right;
}

.coin, .email {
  /*width: 100%;*/
  height: 16px;
  margin-right: 5px;
}

.user_info {
  font-size: 14px;
  border-bottom: #ececec solid 1px;
}

.user_info > * {
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
}

.user_info > *:hover, .exit:hover {
  background: lightgray;
  opacity: 0.6;
}

.exit {
  display: flex;
  align-items: center;
  height: 14px;
  margin-top: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  cursor: pointer;
}

.exit img {
  height: 14px;
}
</style>