<template>
  <div>
<!--    https://gitee.com/beeworkshop/vue-puzzle-vcode?_from=gitee_search-->
    <Vcode
        :show="isShow"
        :imgs="imgs"
        @success="success"
        @close="close"
    />
  </div>
</template>

<script>
import Vcode from "vue-puzzle-vcode";
export default {
  name: "VerificationCode",
  props:{
    isShow:{
      default() {
        return false
      }
    },// 验证码模态框是否出现；
    imgs:{
      default() {
        return ["http://8.135.98.41:80/static/init_img/404.png"]
      }
    },// 自定义验证码的显示图片；
  },
  components:{
    Vcode
  },
  methods:{
    // 用户通过了验证
    success(msg){
      // this.isShow = false; // 通过验证后，需要手动隐藏模态框
      console.log(msg)
      this.$emit("success")
    },
    // 用户点击遮罩层，应该关闭模态框
    close(){
      // this.isShow = false;
      this.$emit("close")
    }
  }
}
</script>

<style scoped>

</style>