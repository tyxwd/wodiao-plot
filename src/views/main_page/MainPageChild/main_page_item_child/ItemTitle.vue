<template>
  <div class="title">
    <div class="title_left">
      <div class="title_group">番剧动态</div>
      <div class="title_item more_item"><span><i class="el-icon-refresh"></i>换一换</span></div>
      <div class="title_item"><span>更多<i class="el-icon-arrow-right"></i></span></div>
    </div>
    <div class="blank"></div>
    <div class="title_right">
      <div class="title_group">排行榜</div>
      <div class="title_item"><span>更多<i class="el-icon-arrow-right"></i></span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemTitle"
}
</script>

<style scoped>
.title {
  width: var(--main-width);
  margin-left: var(--margin-left);
  display: flex;
}

.blank{
  flex: 1;
}
.title_left {
  flex: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title_right {
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title_group {
  font-size: 20px;
  font-weight: 500;
  color: black;
  flex: 1;
}

.title_item {
  border: 1px solid grey;
  border-radius: 3px;
  cursor: pointer;
}

.more_item{
  margin-right: 15px;
}
.title_item span {
  margin-left: 8px;
  margin-right: 8px;
}

/* 下面是css图像旋转 */
.more_item:hover .el-icon-refresh{
  -webkit-animation: el-icon-refresh 0.6s ease-in-out reverse both;
  animation: el-icon-refresh 0.6s ease-in-out reverse both;
}


@-webkit-keyframes el-icon-refresh {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes el-icon-refresh {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>