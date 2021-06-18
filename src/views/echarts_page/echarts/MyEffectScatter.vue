<template>
  <div id="my_effect_scatter" ref="my_effect_scatter">
  </div>
</template>

<script>
import {sleep} from "../../../utils";

const echarts = require('echarts/lib/echarts');
require('echarts/lib/component/grid');
require('echarts/lib/chart/effectScatter');
require('echarts/lib/chart/scatter');
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');


export default {
  name: "MyEffectScatter",
  data(){
    return{
      chart:null
    }
  },
  mounted() {
    this.$store.state.chart_option.option.series[0] = {
      symbolSize: 18,
      symbol: 'diamond',
      data: [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33],
        [14.0, 7.66],
        [13.4, 6.81],
        [10.0, 6.33],
        [14.0, 8.96],
        [12.5, 6.82],
        [9.15, 7.20],
        [11.5, 7.20],
        [3.03, 4.23],
        [12.2, 7.83],
        [2.02, 4.47],
        [1.05, 3.33],
        [4.05, 4.96],
        [6.03, 7.24],
        [12.0, 6.26],
        [12.0, 8.84],
        [7.08, 5.82],
        [5.02, 5.68]
      ],
      type: 'effectScatter',
    }
    this.$store.state.chart_option.option.xAxis.data = null
    this.$store.state.chart_option.option.xAxis.show = true
    this.$store.state.chart_option.option.yAxis.show = true
    this.chart = echarts.init(this.$refs.my_effect_scatter);
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

/*#my_scatter {*/
/*  width: 95%;*/
/*  height: 95%;*/
/*}*/
div {
  width: 95%;
  height: 95%;
}
</style>