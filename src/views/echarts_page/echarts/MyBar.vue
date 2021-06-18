<template>
  <!--  <div class="echarts-demo">-->
  <!-- [1] 为 ECharts 准备一个具备大小 (宽高) 的 DOM -->
  <div id="my_bar" ref="my_bar">
  </div>
  <!--  </div>-->
</template>


<script>
const echarts = require('echarts/lib/echarts');
require('echarts/lib/component/grid');
require('echarts/lib/chart/bar');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/tooltip');


import {sleep} from "../../../utils";
export default {
  name: "MyBar",
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
    this.$store.state.chart_option.option.series[0] = {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: false,
      emphasis: {
        focus: 'series',
      },
      barWidth: '70%',
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.9)'
      },
      color: '#5C7BD9', // 改颜色
    }
    this.$store.state.chart_option.option.xAxis.data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    this.$store.state.chart_option.option.xAxis.show = true
    this.$store.state.chart_option.option.yAxis.show = true
    // 使用 ref 访问 DOM, 也可以使用 document.getElementById('chart')
    this.chart = echarts.init(this.$refs.my_bar, null, {renderer: 'svg'})
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

#my_bar {
  width: 90%;
  height: 90%;
}
</style>