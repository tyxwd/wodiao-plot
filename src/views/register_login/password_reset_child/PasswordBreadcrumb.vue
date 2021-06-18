<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/login' }">登录</el-breadcrumb-item>
      <el-breadcrumb-item>忘记密码</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "PasswordBreadcrumb"
}
</script>

<style scoped>
.breadcrumb{
  margin-top: 2%;
  margin-left: 20%;
}
</style>