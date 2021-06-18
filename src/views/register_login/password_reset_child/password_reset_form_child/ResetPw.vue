<template>
    <div class="reset_form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="新密码" >
          <el-input v-model="form.new_password" placeholder="新密码：6~16位字符，区分大小写"></el-input>
        </el-form-item>
        <el-form-item  label="确认密码">
          <el-input v-model="form.ensure_password" placeholder="请输入确认密码"></el-input>
        </el-form-item>
        <el-form-item  label="邮箱">
          <div class="email">
            <label>{{ form.email }}</label>
            <div class="change_email" @click="change_email"><p>修改</p></div>
          </div>
        </el-form-item>
        <el-form-item  label="验证码">
<!--          <el-input v-model="form.ensure_code" label="验证码" placeholder="请输入验证码"></el-input>-->
          <div class="ensure_code">
            <el-input v-model="form.ensure_code" placeholder="请输入验证码"></el-input>
            <div class="get_verification_code"><p>点击获取</p></div>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="ensure" @click="to_reset_pw"><p>确认修改</p></div>
        </el-form-item>
        <!--    点击生出滑动验证码进行验证-->

      </el-form>
    </div>
</template>

<script>
export default {
  name: "ResetPw",
  data() {
    return {
      form:{
        new_password: "",
        ensure_password: "",
        email: "tyxwd123@outlook.com",
        ensure_code: ""
      },
    }
  },
  methods: {
    // 更改邮箱地址；
    change_email(){
      this.$emit("change_email")
    },
    // 确认并提交修改密码
    to_reset_pw() {
      this.$emit("success")
    }
  }
}
</script>

<style scoped>
.reset_form {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

/* 这里有用，*/
.el-form{
  width: 25vw;
  min-width: 400px;
  transform: translate(-20px);
}

.reset_pw > * {
  margin-bottom: 30px;
}

.email{
  display: flex;
  justify-content: space-between;
}

.change_email{
  color: var(--color-tint);
  cursor: pointer;
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

.ensure:hover, .get_verification_code:hover{
  opacity: 0.8
}

.ensure p, .get_verification_code p{
  size: 18px;
  color: white;
  cursor: pointer;
}

.ensure_code {
  display: flex;
}

.get_verification_code {
  width: 50%;
  text-align: center;
  margin-bottom: 15px;
  background-color: var(--color-tint);
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}
</style>