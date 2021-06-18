<template>
  <div class="ensure_form">
    <el-input v-model="username" placeholder="请输入绑定的邮箱地址"></el-input>
<!--    点击生出滑动验证码进行验证-->
    <div class="ensure" @click="to_verification_code"><p>确认</p></div>
    <verification-code :is-show="isShow" :imgs="imgs"
                       @success="ver_code_success"
                       @close="to_close_ver_code"></verification-code>
  </div>

</template>

<script>
// 滑动验证码
import VerificationCode from "@/components/common/VerificationCode";
export default {
  name: "EnsureAccount",
  components:{
    VerificationCode,
  },
  data() {
    return {
      username: "",
      isShow:false, //是否显示验证码；

      // 后期在这里添加请求验证码图片的方法，直接从服务器里读；

      imgs:[
        "http://8.135.98.41:80/static/init_img/gll.jpg",
          "",
          "",
          "",
          "",
      ], // 验证码的显示图片；
    }
  },
  methods:{
    // 点击显示滑动验证码，进行验证
    to_verification_code(){
      this.isShow = true;
    },
    // 验证成功；
    ver_code_success(){
      this.isShow = false;
      this.$emit("success", 0)
    },
    // 用户点击关闭验证码
    to_close_ver_code(){
     this.isShow = false;
    }
  }
}
</script>

<style scoped>
.ensure_form {
  width: 24%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 38%;
  margin-top: 60px;
}

.ensure_form > *{
  margin-bottom: 30px;
}

.ensure {
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
</style>