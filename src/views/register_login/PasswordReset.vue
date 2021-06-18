<template>
  <div class="password_reset">
    <div class="header_img">
      <img src="@/assets/img/register_top_img.png" alt="">
    </div>
    <password-breadcrumb></password-breadcrumb>
    <my-step :now_step="now_step"></my-step>
    <password-reset-form @success="step_success" @change_email="change_email"
                         :now_step="now_step"></password-reset-form>
  </div>
</template>

<script>
// 头顶的面包屑
import PasswordBreadcrumb from "@/views/register_login/password_reset_child/PasswordBreadcrumb";
// 步骤确认条
import MyStep from "@/views/register_login/password_reset_child/MyStep";
// 每步的提交表单
import PasswordResetForm from "@/views/register_login/password_reset_child/PasswordResetForm";

export default {
  name: "PasswordReset",
  components: {
    PasswordBreadcrumb,
    MyStep,
    PasswordResetForm,
  },
  data() {
    return {
      now_step: 0, // 目前进行到第几步，从0开始计数；
    }
  },
  methods:{
    // 修改邮箱地址，回到第一步；
    change_email(){
      this.now_step = 0;
    },
    step_success(){
      this.now_step += 1;
      // if (this.now_step  === 2){
      //   this.now_step += 1
      // }
    }
  }
}
</script>

<style scoped>
.header_img {
  width: 100px;
}
</style>