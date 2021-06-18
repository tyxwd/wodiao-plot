<template>
  <div class="feedback">
<!--    <p>意<br>见<br>反<br>馈</p>-->
    <p>意见反馈</p>
  </div>
</template>

<script>
export default {
  name: "Feedback"
}
</script>

<style scoped>
.feedback{
  /*background-color: var(--color-background);*/
  border: lightgrey solid 1px;
  /*字体颜色*/
  color: black;
  font-size: 14px;
  /*font-size: var(--font-size) ;*/
  text-align: center;
  border-radius: 0 3px 3px 0;
  position: fixed;
  top: 40%;
  /*位移*/
  transform: translate(-1px,0);
  z-index: 9;
  opacity:0.8;
  cursor: pointer;
}
.feedback p{
  /*margin: 3px;*/
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 3px;
  margin-left: 1px;
  /*垂直*/
  writing-mode:vertical-lr
}
</style>