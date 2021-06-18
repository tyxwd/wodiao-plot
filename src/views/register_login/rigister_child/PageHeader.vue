<template>
  <div>
    <div>
      <img src="@/assets/img/register_top_img.png" alt="">
    </div>
    <div class="main_title">
      <div class="line">
        <div style="width:30vw;border: 0.1px solid lightgrey; opacity:0.8;"></div>
      </div>
      <slot name="header"><p>注册</p></slot>
      <div class="line">
        <div style="width:30vw;border: 0.1px solid lightgrey; opacity:0.8;"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeader"
}
</script>

<style scoped>
.main_title {
  display: flex;
  justify-content: center;

}

.main_title p {
  font-size: 40px;
  font-weight: 500;
  color: black;
  margin-left: 20px;
  margin-right: 20px;
}

.line {
  display: flex;
  align-items: center;
}
</style>