<template>
  <div class="data_content">
    <div class="chart_data_title">
      <div class="data" :class="{active:is_show_chart_data}" @click="show_chart_data"><p>图表数据 </p></div>
      <div class="plot" :class="{active:is_show_chart_adjust}" @click="show_chart_adjust"><p>图形调整</p></div>
    </div>
    <data-up class="items" v-show="is_show_chart_data"></data-up>
    <div v-show="is_show_chart_adjust">
      <chart-adjust class="items" v-if="is_create_chart_adjust"></chart-adjust></div>
  </div>
</template>

<script>
import DataUp from "./data_content_child/DataUp";
import ChartAdjust from "./data_content_child/ChartAdjust";

export default {
  name: "DataContent",
  components: {
    DataUp,
    ChartAdjust
  },
  data() {
    return {
      is_show_chart_data: true,
      is_show_chart_adjust: false,
      is_create_chart_adjust:false,
    }
  },
  methods: {
    show_chart_data() {
      this.is_show_chart_data = true
      this.is_show_chart_adjust = false
    },
    show_chart_adjust() {
      this.is_show_chart_data = false
      this.is_show_chart_adjust = true
    },
    // DataUp中获取到初始数据后，就可以开始显示了；
    create_chart_adjust(){
        this.is_create_chart_adjust = true
    },
    destroy_chart_adjust(){
      this.is_create_chart_adjust = false
      this.show_chart_data()
    },
  },
  watch: {
    '$store.state.chart_type': 'destroy_chart_adjust',
    '$store.state.chart_mounted_time': 'create_chart_adjust'
  }
}
</script>

<style scoped>
.data_content {
  padding-left: 20px;
  width: 100%;
}

.chart_data_title {
  font-size: 16px;
  font-family: 华文行楷 serif;
  font-weight: 500;
  color: rgba(0, 0, 0, .8);
  /*margin-top: 19px;*/
  /*padding-bottom: 15px;*/
  height: 60px;
  border-bottom: rgb(225, 225, 225) 1px solid;
  display: flex;
}

.data {
  margin-right: 50px;
}

.data, .plot {
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.active {
  font-weight: 700;
  color: var(--color-tint);
  height: 100%;
  /*border-bottom: var(--color-tint) 1px solid;*/
  box-shadow: 0 1.5px 0 var(--color-tint);
}


.items {
  height: calc(100% - 19px - 16px - 15px);
  width: 100%;
}

.bottom {
  margin-top: 20px;
  background: #00a6fb;
  margin-left: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
  border-radius: 2px;
}

.bottom_submit {
  font-size: 14px;
  font-weight: 500;
  /*cursor: pointer;*/
  color: #fff;
}

.bottom:hover {
  background: linear-gradient(
      90deg, #00a6fb, #4481eb);
  box-shadow: 0 3px 4px rgb(29 106 242 / 20%);
}

</style>