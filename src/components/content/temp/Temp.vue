<template>
  <div class="wrap">
    <div class="cube">
      <!-- 内部正方体 -->
      <span class="front_in in"><img src="https://cdn.jsdelivr.net/gh/LitStronger/pic@master/post/cssBox/1.png" class="in_pic" /></span>
      <span class="back_in in"><img src="https://cdn.jsdelivr.net/gh/LitStronger/pic@master/post/cssBox/2.png" class="in_pic" /></span>
      <span class="left_in in"><img src="https://cdn.jsdelivr.net/gh/LitStronger/pic@master/post/cssBox/3.png" class="in_pic" /></span>
      <span class="right_in in"><img src="https://cdn.jsdelivr.net/gh/LitStronger/pic@master/post/cssBox/4.png" class="in_pic" /></span>
      <span class="top_in in"><img src="https://cdn.jsdelivr.net/gh/LitStronger/pic@master/post/cssBox/5.png" class="in_pic" /></span>
      <span class="bottom_in in"><img src="https://cdn.jsdelivr.net/gh/LitStronger/pic@master/post/cssBox/6.png" class="in_pic" /></span>

      <!-- 外部正方体 -->
      <span class="front_out out" @click="dd"><img src="https://cdn.jsdelivr.net/gh/LitStronger/pic@master/post/cssBox/1.png" class="pic" /></span>
      <span class="back_out out"><img src="https://cdn.jsdelivr.net/gh/LitStronger/pic@master/post/cssBox/2.png" class="pic" /></span>
      <span class="left_out out"><img src="https://cdn.jsdelivr.net/gh/LitStronger/pic@master/post/cssBox/3.png" class="pic" /></span>
      <span class="right_out out"><img src="https://cdn.jsdelivr.net/gh/LitStronger/pic@master/post/cssBox/4.png" class="pic" /></span>
      <span class="top_out out"><img src="https://cdn.jsdelivr.net/gh/LitStronger/pic@master/post/cssBox/5.png" class="pic" /></span>
      <span class="bottom_out out"><img src="https://cdn.jsdelivr.net/gh/LitStronger/pic@master/post/cssBox/6.png" class="pic" /></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Temp",
  methods: {
    dd(){
      console.log("----------")
    }
  }
}
</script>

<style scoped>
.wrap {
  width: 100px;
  height: 100px;
  margin: 150px auto;
  position: relative;
}
.cube {
  width: 50px;
  height: 50px;
  margin: 0 auto;
  transform-style: preserve-3d;
  transform: rotateX(45deg) rotateY(45deg);
  animation: motion linear 20s infinite;
  /* 添加名为motion的动画 */
}
@keyframes motion {
  from {
    transform: rotateX(0deg) rotateY(0deg);
  }
  to {
    transform: rotateX(360deg) rotateY(360deg);
  }
}
/* 内部小正方体 */
.cube .in {
  display: block;
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50px;
  left: 50px;
}
/* 小正方体表面图片 */
.cube .in_pic {
  width: 100px;
  height: 100px;
}
.cube .front_in {
  transform: rotateY(0deg) translateZ(50px);
}
.cube .back_in {
  transform: rotateY(180deg) translateZ(50px);
}
.cube .left_in {
  transform: rotateY(90deg) translateZ(50px);
}
.cube .right_in {
  transform: rotateY(-90deg) translateZ(50px);
}
.cube .top_in {
  transform: rotateX(90deg) translateZ(50px);
}
.cube .bottom_in {
  transform: rotateX(-90deg) translateZ(50px);
}

/* 外部正方体 */
.cube .out {
  display: block;
  position: absolute;
  width: 200px;
  height: 200px;
  opacity: 0.8;
  /* hover过渡时间 */
  transition: all 0.4s;
}

/* 外部正方体表面图片 */
.pic {
  width: 200px;
  height: 200px;
}
.cube .front_out {
  transform: rotateY(0deg) translateZ(100px);
}
.cube .back_out {
  transform: rotateY(180deg) translateZ(100px);
}
.cube .left_out {
  transform: rotateY(90deg) translateZ(100px);
}
.cube .right_out {
  transform: rotateY(-90deg) translateZ(100px);
}
.cube .top_out {
  transform: rotateX(90deg) translateZ(100px);
}
.cube .bottom_out {
  transform: rotateX(-90deg) translateZ(100px);
}
/* 鼠标悬浮hover撑开 */
.cube:hover .front_out {
  transform: rotateY(0deg) translateZ(200px);
}
.cube:hover .back_out {
  transform: rotateY(180deg) translateZ(200px);
}
.cube:hover .left_out {
  transform: rotateY(90deg) translateZ(200px);
}
.cube:hover .right_out {
  transform: rotateY(-90deg) translateZ(200px);
}
.cube:hover .top_out {
  transform: rotateX(90deg) translateZ(200px);
}
.cube:hover .bottom_out {
  transform: rotateX(-90deg) translateZ(200px);
}
</style>