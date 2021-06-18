<template>
  <div id="my_sankey" ref="my_sankey">
  </div>
</template>

<script>
import {sleep} from "../../../utils";

const echarts = require('echarts/lib/echarts');
require('echarts/lib/component/grid');
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/dataset');
require('echarts/lib/chart/sankey');

export default {
  name: "MySankey",
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.my_sankey);
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