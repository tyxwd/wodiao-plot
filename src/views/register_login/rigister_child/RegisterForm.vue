<template>
  <div class="register_form">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
             label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" placeholder="用户名（2-10个字符）"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" placeholder="密码（6-16个字符组成，区分大小写）" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password_ensure">
        <el-input v-model="ruleForm.password_ensure" placeholder="请再次输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" placeholder="请填写常用邮箱地址"></el-input>
      </el-form-item>
      <!--      我还是直接发邮件，点链接吧；-->
      <!--      <el-form-item label="验证码" prop="verification_code">-->
      <!--        <div class="verification_code">-->
      <!--          <el-input v-model="ruleForm.verification_code" placeholder="请输入验证码"></el-input>-->
      <!--          <div class="get_verification_code"><p>点击获取</p></div>-->
      <!--        </div>-->
      <!--      </el-form-item>-->
      <el-form-item>
        <div class="to_register" @click="submit_form"><p>注册</p></div>
      </el-form-item>
      <div class="to_login" @click="to_login"><p>已有账号，直接登录></p></div>
    </el-form>
    <!--    <div class="to_login"><p>已有账号，直接登录></p></div>-->
  </div>

</template>

<script>

// 用户注册的请求
import {toRegister} from "../../../network/user_request";

export default {
  name: "RegisterForm",
  data() {
    // 输入的确认密码的判断方式；
    let validatePass2 = (rule, value, callback) => {
      //空值，得输入密码
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    let email_format = (rule, value, callback) => {
      //空值，得输入密码
      if (value === '') {
        callback(new Error('请输入邮箱地址'));
      } else if (!this.email_re.test(value)) {
        // 正则表达式判断email格式；
        callback(new Error('请输入正确的邮箱地址!'));
      } else {
        callback();
      }
    };
    return {
      // 后端只判断了是否重复；
      is_rightful_username: false,
      is_rightful_email: false,
      uuid:'',
      ruleForm: {
        username: 'wodiao',
        password: '111111',
        password_ensure: '111111',
        email: '1@o.com',
        // verification_code: '',
      },
      email_re: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/,
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},
          // {message: "该用户名已被注册", trigger: 'clear'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 16, message: '密码不能少于6个字符', trigger: 'blur'},
          {max: 16, message: '密码不能大于于16个字符', trigger: 'change'}
        ],
        password_ensure: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {validator: email_format, trigger: 'blur'}
        ],
        // verification_code: [
        //   {required: true, message: '请输入验证码', trigger: 'blur'},
        //   {min: 6, max: 6, message: '请确认验证码格式', trigger: 'blur'},
        // ]
      }
    };
  },
  methods: {
    // 进行提交表单；
    submit_form() {
      // 如果判断表单没有问题就进行注册；
      this.$refs.ruleForm.validate(this.to_register)
    },

    // 如果提交表单，判断没有问题，前往服务器进行注册；
    to_register(valid) {
      if (valid) {
        toRegister(this.ruleForm).then(res => {
              this.is_rightful_username = res["username"]
              this.is_rightful_email = res['email']
              this.uuid = res['uuid']
              console.log(res)
              this.is_register_error()
            }
        );
      } else {
        return false;
      }
    },

    // 提交表单后是否有错
    is_register_error(){
      if (!this.is_rightful_username) {
        this.$refs.ruleForm.validateField("username", this.username_error)
        return
      }
      if (this.is_rightful_email) {
        // 如果用户名和邮箱都有效，则前往中间页；
        this.$router.push({
          name: 'loadPage',
          params: {
            username: this.ruleForm.username,
            uuid: this.uuid,
          }
        })
      } else {
        this.$refs.ruleForm.validateField("email", this.email_error)
      }
    },

    // 提交表单后, 服务器发现用户名错误；
    username_error() {
      if (!this.is_rightful_username) {
        this.$alert('该用户名已被注册', '', {
          confirmButtonText: '确定',
          callback: () => {
            // this.ruleForm.username = ''
          }
        });
      }
    },
    email_error() {
      if (!this.is_rightful_email) {
        this.$alert('该电子邮箱已被注册', '', {
          confirmButtonText: '确定',
          callback: () => {
            // this.ruleForm.email = ''
          }
        });
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    to_login() {
      this.$router.push("/login")
    }
  }
}
</script>

<style scoped>
.demo-ruleForm {
  width: 33vw;
  min-width: 400px;

}


.el-form-item {
  margin-bottom: 30px;
}

.to_register {
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

.to_register:hover, .get_verification_code:hover, .to_login:hover {
  opacity: 0.8
}

.to_register p, .get_verification_code p {
  size: 18px;
  color: white;
  cursor: pointer;
}

.verification_code {
  display: flex;
}

.get_verification_code {
  width: 40%;
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

.to_login {
  font-size: var(--font-size);
  color: var(--color-tint);
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  /*align-items: flex-start;*/
  transform: translate(0, -25px);
}

</style>