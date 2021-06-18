<template>
  <div>
    <left-content :echart_types="echart_types"></left-content>
    <right-content :echart_types="echart_types"></right-content>
  </div>
</template>

<script>
import LeftContent from "../../components/content/chart_content/LeftContent";
import RightContent from "../../components/content/chart_content/RightContent";

// 获取所有支持的绘图类型；
import {get_type_list} from "../../network/echart_request";

export default {
  name: "EchartPage",
  components: {
    LeftContent,
    RightContent,
  },
  data() {
    return {
      echart_types: null, //是个对象,
    }
  },
  mounted() {
    this.$store.state.chart_type = null
    // 获取基本信息；
    get_type_list().then(res => {
      this.echart_types = res
      this.$router.push({
        name: "Scatter"
      })
      this.$store.commit("set_chart_type", "Scatter")
      this.$store.commit("change_chart_time")
    })
  }
}
</script>

<style scoped>
</style>