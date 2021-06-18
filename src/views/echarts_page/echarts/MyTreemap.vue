<template>
  <div id="my_tree_map" ref="my_tree_map">
  </div>
</template>

<script>
import {sleep} from "../../../utils";

const echarts = require('echarts/lib/echarts');
require('echarts/lib/component/grid');
require('echarts/lib/chart/treemap');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/tooltip');


export default {
  name: "MyTreemap",
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.my_tree_map);
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