<template>
  <div class="main_page">
    <div class="welcome">
        <temp1></temp1>
    </div>
    <feedback></feedback>
    <!--    <my-carousel></my-carousel>-->
<!--    <blank-horizontal></blank-horizontal>-->
<!--    <caa></caa>-->
<!--    <blank-horizontal></blank-horizontal>-->
<!--    <nothing></nothing>-->
<!--    <earth></earth>-->
<!--    <blank-horizontal></blank-horizontal>-->
<!--    <main-page-item></main-page-item>-->
<!--    <blank-horizontal></blank-horizontal>-->
    <bottom-info></bottom-info>
  </div>
</template>

<script>
// 走马灯
// import MyCarousel from "@/views/main_page/MainPageChild/MyCarousel";
// 功能类别项目
// import MainPageItem from "@/views/main_page/MainPageChild/MainPageItem";
// 意见反馈
import Feedback from "@/views/main_page/MainPageChild/Feedback";
// 空白栏
// import BlankHorizontal from "@/components/common/BlankHorizontal";
// 底部网站信息
import BottomInfo from "@/components/content/bottom_infos/BottomInfo";

// import Nothing from "../../components/content/temp/Nothing";
// import Caa from "@/components/content/temp/Caa";
// import Earth from "@/components/content/temp/Earth";
// import Temp from "../../components/content/temp/Temp";
import Temp1 from "../../components/content/temp/Temp1";

export default {
  name: "MainPage",
  components: {
    // MyCarousel,
    // MainPageItem,
    Feedback,
    // BlankHorizontal,
    BottomInfo,
    // Caa,
    // Earth,
    // Nothing,
    // Temp,
    Temp1,
  },
  data() {
    return {
      // 幻灯片的索引值；
      carousel_index: 0,
      globe: ``
    }
  }
}
</script>

<style scoped>
.main_page{
  background: url("../../../src/assets/img/background.jpg") no-repeat;
  background-size: 100% 100%;
  height: calc(100vh - 6.5vh)
}
.welcome{
  display: flex;
  align-items: center;
  justify-content: center;
  /*height: calc(100vh - 20vh - 41px);*/
}
</style>