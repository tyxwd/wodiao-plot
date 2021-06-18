<template>
  <div class="body">
    <a>关于本站</a>
    <a>意见反馈</a>
    <a>还有啥</a>
    <a href="https://beian.miit.gov.cn/" target="_blank">浙ICP备2021016878号-1</a>
    <p>违法和不良信息举报电话：400-921-6911</p>
  </div>
</template>

<script>
export default {
  name: "BottomInfo"
}
</script>

<style scoped>
  .body {
    display: flex;
    justify-content: center;
    border-bottom: gray solid 1px;
    /*border-top: gray solid 1px;*/
    height: 40px;
    align-items: center;
    /*background-color: #212121;*/
    min-width: 1200px;
    min-height: 40px;
    max-height: 40px;

    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .body > *{
    margin: 3px 10px 3px 10px;
    /*color: gray;*/
    color: white;
  }
</style>