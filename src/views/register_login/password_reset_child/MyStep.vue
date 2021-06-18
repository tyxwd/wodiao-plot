<template>
  <el-steps :space="200" :active="now_step" finish-status="success" :align-center="true">
    <el-step title="确认账号"></el-step>
    <el-step title="重置密码"></el-step>
    <el-step title="重置成功" process-status="success"></el-step>
  </el-steps>
</template>

<script>
export default {
  name: "MyStep",
  props:{
    now_step:{
      default(){
        return 0;
      }
    }
  }
}
</script>

<style scoped>
.el-steps {
  margin-top: 2%;
  display: flex;
  justify-content: center;
}
</style>