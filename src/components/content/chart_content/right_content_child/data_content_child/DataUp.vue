<template>
  <div class="data_up">
    <div class="item1">
      <div class="item_title">
        <p>上传文件</p>
        <p class="item_info item_info1">目前仅支持xlsx、xls、csv格式文件</p>
      </div>
      <div class="blank"></div>
      <file-up-load class="up_load" @upload_success="upload_success"></file-up-load>
    </div>
    <div class="item2">
      <div class="item_title"><p>示例数据</p></div>
      <div class="blank"></div>
      <data-table class="data_table" :table_label="table_data_label[0]" :table_data="table_data_list[0]"></data-table>
      <div class="blank"></div>
      <div class="item_info">
        <el-switch
            style="display: block"
            v-model="show_all_data"
            active-color="#13ce66"
            active-text="显示完整数据">
        </el-switch>
        <el-switch
            style="display: block"
            v-model="plot_with_init_data"
            active-color="#13ce66"
            active-text="使用示例数据绘图">
        </el-switch>
      </div>
    </div>
    <div class="item3">
      <div class="bottom_submit" @click="to_plot_echart">
        <div></div>
        <p>提交绘图</p>
        <div></div>
      </div>
    </div>
<!--    mydrawer中可能会有两个表格的；-->
    <my-drawer :show_all_data="show_all_data"
               :table_label="table_data_label" :table_data="table_data_list"
               @change_data_show="change_data_show"></my-drawer>
  </div>
</template>

<script>
import FileUpLoad from "../../../../common/FileUpLoad";
import DataTable from "../../../../common/DataTable";
import MyDrawer from "../../../../common/MyDrawer";

// 获取用户上传的绘图数据；
import {get_echart_data} from "../../../../../network/echart_request";
// 获取当前示例数据；
import {get_type_init_data} from "../../../../../network/echart_request";

export default {
  name: "DataUp",
  components: {
    FileUpLoad,
    DataTable,
    MyDrawer
  },
  data() {
    return {
      show_all_data: false,
      plot_with_init_data: false,
      excel_id: null,
      suffix: null,
      echart_data: null, //用户上传的数据信息；
      table_data_label: [],// 示例数据标题；
      table_data_list: [], // 示例数据主体
    }
  },
  methods: {
    change_data_show(valid) {
      this.show_all_data = valid
    },

    // 获取示例数据
    get_table_data() {
      if (this.$store.state.chart_type !== null){
        get_type_init_data(this.$store.state.chart_type).then(res => {
          this.table_data_list = []
          this.table_data_label = []
          for (let i = 0; i < res.length; i++){
            this.table_data_label.push(res[i][0])
            this.table_data_list.push(res[i][1])
          }
        })
      }
    },

    //文件上传成功；
    upload_success(res) {
      this.excel_id = res[0]
      this.suffix = res[1]
    },
    // 开始画图
    to_plot_echart() {
      if (this.plot_with_init_data) {
        console.log('使用了实例数据画图；')
      } else if (this.excel_id === null || this.suffix === null) {
        this.$alert('请先上传文件，或使用示例数据绘图！', {
          type: "warning"
        })
      } else {
        get_echart_data(this.excel_id, this.suffix, this.$store.state.chart_type).then(res => {
          this.echart_data = res
          // x、y轴
          try {
            this.$store.state.chart_option.option.xAxis.data = this.echart_data.x
            this.$store.state.chart_option.option.yAxis.data = this.echart_data.y
          } catch (e) {
            console.log(e)
          }
          // series的data
          try {
            let series_item_copy = JSON.parse(JSON.stringify(this.$store.state.chart_option.option.series[0]))
            if (this.$store.state.chart_type === "Parallel") {
              this.$store.state.chart_option.option.series = []
              this.$store.state.chart_option.option.legend.data = res.series_name
            }
            for (let i = 0; i < res.series_data.length; i++) {
              if (this.$store.state.chart_type === "Parallel") {
                this.$store.state.chart_option.option.series.push(JSON.parse(JSON.stringify(series_item_copy)))
                this.$store.state.chart_option.option.series[i].name = res.series_name[i]
              }
              this.$store.state.chart_option.option.series[i].data = res.series_data[i]

            }
          } catch (e) {
            console.log(e)
          }
          // 这里基本是boxplot的；
          try {
            this.$store.state.chart_option.option.dataset[0].source = res.dataset_source
          } catch (e) {
            console.log(e)
          }
          // 这里基本是heatmap的；
          try {
            this.$store.state.chart_option.option.visualMap.min = res.visualMap.min
            this.$store.state.chart_option.option.visualMap.max = res.visualMap.max
          } catch (e) {
            console.log(e)
          }
          // 这里是parallel的；
          if (this.$store.state.chart_type === 'Parallel') {
            this.$store.state.chart_option.option.parallelAxis = res.parallelAxis
            this.$store.commit("change_chart_clear_time")
            return
          }
          if (this.$store.state.chart_type === 'Radar') {
            this.$store.state.chart_option.option.radar.indicator = res.indicator
          }
          if (this.$store.state.chart_type === "Graph") {
            this.$store.state.chart_option.option.legend.data = res.legend_data
            this.$store.state.chart_option.option.series[0].links = res.links_data
            this.$store.state.chart_option.option.series[0].categories = res.categories
            this.$store.commit("change_chart_clear_time")
            return;
          }
          if (this.$store.state.chart_type === "Sankey") {
            this.$store.state.chart_option.option.series[0].links = res.links_data
          }
          this.$store.commit("change_chart_time")
        })
      }
    }
  },
  watch:{
    '$store.state.chart_type': 'get_table_data'
  }
}
</script>

<style scoped>
.data_up {
  margin-top: 20px;
  height: calc(100% - 20px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 20px;
}

.item1 {
  height: 30%;
  color: black;
  border-bottom: rgb(225, 225, 225) 1px solid;
  display: flex;
  flex-direction: column;
}

.item1 .item_title {
  flex: 5;
  font-size: 16px;
  font-family: 华文行楷 serif;
  font-weight: 700;
  color: rgba(0, 0, 0, .8);
  cursor: default;
  display: flex;
  align-items: flex-end;
}

.item1 .blank {
  flex: 3;
}

.up_load {
  flex: 15;
}

.item_info1 {
  margin-left: 20px;
}

.item2 {
  height: 50%;
  color: black;
  border-bottom: rgb(225, 225, 225) 1px solid;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.item2 .item_title {
  flex: 3;
  margin-top: 20px;
  font-size: 16px;
  font-family: 华文行楷 serif;
  font-weight: 700;
  color: rgba(0, 0, 0, .8);
  cursor: default;
}

.data_table {
  flex: 30;
}

.item2 .item_info {
  flex: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item2 .blank {
  flex: 1;
}

.switch {
  display: flex;
}

.item_info {
  font-size: 14px;
  font-family: 华文行楷 serif;
  font-weight: 300;
  color: rgba(0, 0, 0, .8);
}

.item3 {
  flex: 1;
  margin-left: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.bottom_submit {
  border-radius: 3px;
  height: 36px;
  background: linear-gradient(
      90deg, #00a6fb, #4481eb);
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30%;
}

.bottom_submit p {
  margin-left: 30px;
  margin-right: 30px;
}

.bottom_submit:hover {
  background: #00a6fb;
  box-shadow: 0 3px 4px rgba(29 106 242 0.2);
}
</style>