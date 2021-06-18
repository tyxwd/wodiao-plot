<template>
  <div class="login_left">
    <div class="code_login">
      <div>扫码登录</div>
      <img src="@/assets/img/QR-code.png" alt="">
      <div>或许哪天会可以，但现在不行</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginLeft"
}
</script>

<style scoped>
.code_login{
  cursor: default;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 20px;
}
.code_login > *{
  margin-top: 20px;
  margin-bottom: 20px;
}
.code_login:first-child{
  font-weight: 800;
}
</style>