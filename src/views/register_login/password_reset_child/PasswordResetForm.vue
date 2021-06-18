<template>
  <div>
    <ensure-account @success="step_success" v-show="now_step === 0"></ensure-account>
    <reset-pw @success="step_success" @change_email="change_email" v-show="now_step === 1"></reset-pw>
    <reset-success v-show="now_step === 2"></reset-success>
  </div>
</template>

<script>
// 第一步，确认账号
import EnsureAccount from "@/views/register_login/password_reset_child/password_reset_form_child/EnsureAccount";
// 第二步，重置密码
import ResetPw from "@/views/register_login/password_reset_child/password_reset_form_child/ResetPw";
// 第三步，修改成功
import ResetSuccess from "@/views/register_login/password_reset_child/password_reset_form_child/ResetSuccess";
export default {
  name: "PasswordResetForm",
  components:{
    EnsureAccount,
    ResetPw,
    ResetSuccess
  },
  props:{
    now_step: {
      default(){
        return 0;
      }
    }
  },
  methods:{
    // 当前步骤验证成功；
    step_success(){
      //
      this.now_step += 1
      this.$emit("success")
    },
    // 修改邮箱地址，即回到第一步
    change_email(){
      this.$emit("change_email")
    }

  }
}
</script>

<style scoped>

</style>