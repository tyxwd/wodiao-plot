<template>
  <div id="my_pie" ref="my_pie">
  </div>
</template>

<script>
import {sleep} from "../../../utils";

const echarts = require('echarts/lib/echarts');
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/chart/pie');

export default {
  name: "MyPie",
  data() {
    return {
      chart: null,
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.my_pie);
    this.$store.state.chart_option.option.xAxis.show = false
    this.$store.state.chart_option.option.yAxis.show = false
    this.$store.state.chart_option.option.series[0] = {
      name: '该项信息',
      type: 'pie',
      radius: [0, '50%'], //第一项是内径， 第二项是外径；
      data: [
        {value: 1048, name: '搜索引擎'},
        {value: 735, name: '直接访问'},
        {value: 580, name: '邮件营销'},
        {value: 484, name: '联盟广告'},
        {value: 300, name: '视频广告'}
      ],
      label: {
        show: true,
        position: "outside",
        rotate: 0,
        offset: [0, 0],
        color: "#000000",
        fontStyle: "normal",
        fontWeight: 'bolder',
        fontFamily: 'sans-serif',
        fontSize: 12,
        // formatter: '{a}: {b}: {d}%',
        formatter: '{b}: {d}%'
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
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

div {
  width: 95%;
  height: 95%;
}
</style>