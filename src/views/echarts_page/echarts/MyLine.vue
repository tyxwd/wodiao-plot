<template>
  <!--  <div class="echarts-demo">-->
  <!-- [1] 为 ECharts 准备一个具备大小 (宽高) 的 DOM -->
  <div id="my_line" ref="my_line">
  </div>
  <!--  </div>-->
</template>


<script>
import {sleep} from "../../../utils";

const echarts = require('echarts/lib/echarts');
require('echarts/lib/component/grid');
require('echarts/lib/chart/line');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/tooltip');

export default {
  name: "MyLine",
  data() {
    return {
      chart: null,
    };
  },
  computed: {
    chart_time() {
      return this.$store.state.chart_time
    }
  },
  mounted() {
    this.$store.state.chart_option.option.xAxis.data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    this.$store.state.chart_option.option.series[0] = {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
    this.$store.state.chart_option.option.xAxis.show = true
    this.$store.state.chart_option.option.yAxis.show = true
    // 使用 ref 访问 DOM, 也可以使用 document.getElementById('chart')
    this.chart = echarts.init(this.$refs.my_line, null, {renderer: 'svg'});
    this.show_chart()
    this.chart.on('finished',() => {
      sleep().then(() =>{
        this.$store.commit("change_chart_mounted_time")
      })
    })
  },
  methods: {
    show_chart() {
      this.chart.setOption(this.$store.state.chart_option.option)
    },
  },
  watch: {
    "$store.state.chart_time": "show_chart"
  }
}
</script>

<style scoped>
.echarts-demo {
  width: 100%;
  height: 100%;
}

#my_line {
  width: 90%;
  height: 90%;
}
</style>