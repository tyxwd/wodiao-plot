<template>
  <div class="register">
    <page-header></page-header>
    <div class="register_form">
      <register-form></register-form>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/views/register_login/rigister_child/PageHeader";
import RegisterForm from "@/views/register_login/rigister_child/RegisterForm";
export default {
  name: "Register",
  components:{
    PageHeader,
    RegisterForm
  }
}
</script>

<style scoped>
  .register{
    height: 100%;
  }
  .register_form{
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

</style>