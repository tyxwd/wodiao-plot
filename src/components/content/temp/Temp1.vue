<template>
  <div class="wrap">
    <!-- 我们有两个立方体，内部哪个立方体6个面的图片始终不变。而外部的立方体，当鼠标移上时，替换6个面的图片 -->
    <div class="cube">
      <div class="front"></div>
      <div class="back"></div>
      <div class="right"></div>
      <div class="left"></div>
      <div class="top"></div>
      <div class="bottom"></div>

      <i class="ifront"></i>
      <i class="iback"></i>
      <i class="iright"></i>
      <i class="ileft"></i>
      <i class="itop"></i>
      <i class="ibottom"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Temp1"
}
</script>

<style scoped>
  /* 所有元素都设置外边距，内边距为0 */
* {
  margin: 0;
  padding: 0;
}

/* 设置body背景位黑色 */
body {
  background-color: #000000;
}

/* 设置包装类 的高度，外边距与父容器的距离 */
.wrap {
  height: 200px;
  margin-top: calc(50vh - 80px - 6.5vh);
  /*margin-bottom: calc(50vh - 120px);*/
  /*margin-top: 200px;*/
  /* 3、给爷爷加景深 */
  perspective: 1000px;
  /* 设置观看位置 */
  perspective-origin: 50% 50%;
}

/* 为立方体添加3d效果 */
.wrap .cube {
  /* 2、父级相对定位,居中显示 */
  /*position: relative;*/
  width: 12.5rem;
  height: 12.5rem;
  margin: 0 auto;
  /* 4、爸爸加3d,因为最后旋转的是爸爸 */
  transform-style: preserve-3d;
  animation: box 5s linear infinite;
  /* 5、在chrome开发者工具调试旋转父级查看效果 */
  transform: rotateX(0deg) rotateY(0deg);

}

/* 定义动画，绕x,y,z轴旋转 */
@keyframes box {
  0% {
    transform: rotateX(0) rotateY(0) ;
  }

  100% {
    transform: rotateX(360deg) rotateY(360deg) ;
  }
}

/* big box  立方体的每一个面水平居中,并为每个面设置了一个动画*/
.wrap .cube div {
  /*/2、自己为绝对定位相对于父级,把6个面盒子全部放进来 */
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.8;
  /*/1、相对于父级100% */
  width: 100%;
  height: 100%;
  font-size: 1.25rem;
  color: white;
  text-align: center;
  line-height: 200px;
  transition: transform .3s ease-in;
}

/* 5、设置立方体的每个面 */
.wrap .cube .front {
  background: linear-gradient(blueviolet,dodgerblue);
  background-size: auto 100%;
  transform: translateZ(100px);
}

.wrap .cube .back {
  background: linear-gradient(blueviolet,dodgerblue);
  background-size: auto 100%;
  transform: translateZ(-100px) rotateY(180deg);
}

.wrap .cube .right {
  background: linear-gradient(blueviolet,dodgerblue);
  background-size: auto 100%;
  transform: rotateY(90deg) translateZ(100px);

}

.wrap .cube .left {
  background: linear-gradient(blueviolet,dodgerblue);
  background-size: auto 100%;
  transform: rotateY(-90deg) translateZ(100px);

}

.wrap .cube .top {
  background: linear-gradient(blueviolet,dodgerblue);
  background-size: auto 100%;
  transform: rotateX(90deg) translateZ(100px);

}

.wrap .cube .bottom {
  background: linear-gradient(blueviolet,dodgerblue);
  background-size: auto 100%;
  transform: rotateX(-90deg) translateZ(100px);

}


/* 6、让i居中，i使用同一张图片包装立方体*/
.wrap .cube i {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  width: 100px;
  height: 100px;
}

/* 立方体先用6张相同的图片包裹起来 */
.ifront {
  background: linear-gradient(blueviolet,dodgerblue);
  background-size: auto 100%;
  transform: translateZ(50px);
}

.iback {
  background: linear-gradient(blueviolet,dodgerblue);
  background-size: auto 100%;
  transform: translateZ(-50px) rotateY(180deg);
}

.iright {
  background: linear-gradient(blueviolet,dodgerblue);
  background-size: auto 100%;
  transform: rotateY(90deg) translateZ(50px);

}

.ileft {
  background: linear-gradient(blueviolet,dodgerblue);
  background-size: auto 100%;
  transform: rotateY(-90deg) translateZ(50px);

}

.itop {
  background: linear-gradient(blueviolet,dodgerblue);
  background-size: auto 100%;
  transform: rotateX(90deg) translateZ(50px);

}

.ibottom {
  background: linear-gradient(blueviolet,dodgerblue);
  background-size: auto 100%;
  transform: rotateX(-90deg) translateZ(50px);

}


/* 7、hover box，替换立方体的每一个面的图片 */
.cube:hover .front {
  background-size: auto 100%;
  transform: translateZ(200px);
}

.cube:hover .back {
  background-size: auto 100%;
  transform: translateZ(-200px) rotateY(180deg);
  /*先沿z轴移动，再旋转*/
}

.cube:hover .right {
  background-size: auto 100%;
  transform: rotateY(90deg) translateZ(200px);
  /*先沿z轴移动，再旋转*/
}

.cube:hover .left {
  background-size: auto 100%;
  transform: rotateY(-90deg) translateZ(200px);
  /*先沿z轴移动，再旋转*/
}

.cube:hover .top {
  background-size: auto 100%;
  transform: rotateX(90deg) translateZ(200px);
  /*先沿z轴移动，再旋转*/
}

.cube:hover .bottom {
  background-size: auto 100%;
  transform: rotateX(-90deg) translateZ(200px);
  /*先沿z轴移动，再旋转*/
}
</style>