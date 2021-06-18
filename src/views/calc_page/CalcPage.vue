<template>
  <div>
    <left-content :calc_types="calc_types"></left-content>
    <right-content :calc_types="calc_types"></right-content>
  </div>
</template>

<script>
import LeftContent from "../../components/content/calc_content/LeftContent";
import RightContent from "../../components/content/calc_content/RightContent";

// 获取所有支持的绘图类型；

export default {
  name: "CalcPage",
  components: {
    LeftContent,
    RightContent,
  },
  data() {
    return {
      // calc_types: null, //是个对象,
      calc_types: {bleat:{type:"bleat", chinese:"这是什么东西？", info:"这一一串莫名其妙的东西；"}}
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>