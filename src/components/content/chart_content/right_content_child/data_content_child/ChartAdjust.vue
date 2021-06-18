<template>
  <div class="chart_adjust">
    <echart-title></echart-title>
    <echart-x-axis v-if="$store.state.show_xy"></echart-x-axis>
    <echart-y-axis v-if="$store.state.show_xy"></echart-y-axis>

    <echart-body-label v-if="this.show_label"></echart-body-label>
    <sunburst-label v-if="this.chart_type === 'Sunburst'"></sunburst-label>
    <parallel-label v-if="this.chart_type === 'Parallel'"></parallel-label>

    <bar-body v-if="this.chart_type === 'Bar'"></bar-body>
    <line-body v-if="this.chart_type === 'Line'"></line-body>
    <pie-body v-if="this.chart_type === 'Pie'"></pie-body>
    <scatter-body v-if="this.chart_type === 'Scatter'"></scatter-body>
    <effect-scatter-body v-if="this.chart_type === 'EffectScatter'"></effect-scatter-body>
    <radar-body v-if="this.chart_type === 'Radar'"></radar-body>
    <tree-body v-if="this.chart_type === 'Tree'"></tree-body>
    <treemap-body v-if="this.chart_type === 'Treemap'"></treemap-body>
    <sunburst-body v-if="this.chart_type === 'Sunburst'"></sunburst-body>
    <boxplot-body v-if="this.chart_type === 'Boxplot'"></boxplot-body>
    <heatmap-body v-if="this.chart_type === 'Heatmap'"></heatmap-body>
    <parallel-body v-if="this.chart_type === 'Parallel'"></parallel-body>
    <graph-body v-if="this.chart_type === 'Graph'"></graph-body>
    <sankey-body v-if="this.chart_type === 'Sankey'"></sankey-body>
  </div>

</template>

<script>
import EchartTitle from "../../../../common/echarts/EchartTitle";
import EchartXAxis from "../../../../common/echarts/EchartXAxis";
import EchartYAxis from "../../../../common/echarts/EchartYAxis";
import EchartBodyLabel from "../../../../common/echarts/EchartBodyLabel";
//  不同类型的图
import BarBody from "../../../../common/echarts/echarts_body/BarBody";
import LineBody from "../../../../common/echarts/echarts_body/LineBody";
import PieBody from "../../../../common/echarts/echarts_body/PieBody";
import ScatterBody from "../../../../common/echarts/echarts_body/ScatterBody";
import EffectScatterBody from "../../../../common/echarts/echarts_body/EffectScatterBody";
import RadarBody from "../../../../common/echarts/echarts_body/RadarBody";
import TreeBody from "../../../../common/echarts/echarts_body/TreeBody";
import TreemapBody from "../../../../common/echarts/echarts_body/TreemapBody";
import SunburstLabel from "../../../../common/echarts/echarts_body/SunburstLabel";
import SunburstBody from "../../../../common/echarts/echarts_body/SunburstBody";
import BoxplotBody from "../../../../common/echarts/echarts_body/BoxplotBody";
import HeatmapBody from "../../../../common/echarts/echarts_body/HeatmapBody";
import ParallelLabel from "../../../../common/echarts/echarts_body/ParallelLabel";
import ParallelBody from "../../../../common/echarts/echarts_body/ParallelBody";
import GraphBody from "../../../../common/echarts/echarts_body/GraphBody";
import SankeyBody from "../../../../common/echarts/echarts_body/SankeyBody";


export default {
  name: "ChartAdjust",
  components: {
    EchartTitle,
    EchartXAxis,
    EchartYAxis,
    EchartBodyLabel,
    BarBody,
    LineBody,
    PieBody,
    ScatterBody,
    EffectScatterBody,
    RadarBody,
    TreeBody,
    TreemapBody,
    SunburstLabel,
    SunburstBody,
    BoxplotBody,
    HeatmapBody,
    ParallelLabel,
    ParallelBody,
    GraphBody,
    SankeyBody,
  },
  computed: {
    chart_type() {
      return this.$store.state.chart_type
    },
    show_label() {
      return this.chart_type !== 'Sunburst' & this.chart_type !== 'Parallel'
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  }
}
</script>

<style scoped>
.chart_adjust {
  width: 100%;
  height: calc(100% - 60px);
  overflow: auto;
}
</style>