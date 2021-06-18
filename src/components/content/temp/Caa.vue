<template>
<!--  <div class="echarts-demo">-->
    <!-- [1] 为 ECharts 准备一个具备大小 (宽高) 的 DOM -->
    <div id="chart" ref="chart"></div>
<!--  </div>-->
</template>


<script>
let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar'); //所需图表
import {TitleComponent, TooltipComponent, GridComponent} from 'echarts/components';

echarts.use([TitleComponent, TooltipComponent, GridComponent]);

export default {
  name: "Caa",
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    // 使用 ref 访问 DOM, 也可以使用 document.getElementById('chart')
    this.chart = echarts.init(this.$refs.chart);

    // [4] 设置 Echarts 图表数据
    this.chart.setOption({
      // title: {
      //   text: 'ECharts 入门示例'
      // },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    });
  }

}
</script>

<style scoped>
.echarts-demo{
  width: 100%;
  height: 100%;
}
#chart {
  width: 500px;
  height: 500px;
}
</style>