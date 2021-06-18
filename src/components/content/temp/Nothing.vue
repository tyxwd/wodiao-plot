<template>
  <div id="my_radar" ref="my_radar">
  </div>
</template>

<script>
const echarts = require('echarts/lib/echarts');
require('echarts/lib/component/grid');
require('echarts/lib/chart/radar');
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/toolbox');
require('echarts/lib/component/tooltip');


export default {
  name: "Nothing",
  data(){
    return{
      chart:null
    }
  },
  mounted() {
    let option;

    option = {
      title: {
        text: '基础雷达图'
      },
      legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '销售（Sales）', max: 6500},
          { name: '管理（Administration）', max: 16000},
          { name: '信息技术（Information Technology）', max: 30000},
          { name: '客服（Customer Support）', max: 38000},
          { name: '研发（Development）', max: 52000},
          { name: '市场（Marketing）', max: 25000}
        ]
      },
      series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: '预算分配（Allocated Budget）'
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: '实际开销（Actual Spending）'
          }
        ]
      }]
    };
    this.chart = echarts.init(this.$refs.my_radar);
    this.chart.setOption(option);
  }
}
</script>

<style scoped>
#my_radar{
  width: 500px;
  height: 500px;
}
</style>