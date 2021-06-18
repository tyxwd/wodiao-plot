<template>
  <div>
    <Drawer :closable="false" width="65%" v-model="show_all_data_"
            :draggable="true" :scrollable="true" placement="left" @on-close="drawer_close">
      <!--        点击关闭示例数据，按钮-->
      <div style="display: flex; align-items: center; margin-bottom: 10px">
        <div class="download" v-if="table_label.length !== 0">
          <a :href="download_url">下载示例数据</a>
        </div>
        <el-switch style="display: block; margin-right: 10px;"
                   v-model="show_all_data_"
                   active-color="#13ce66"
                   active-text="关闭示例数据" @click.native="change_data_show">
        </el-switch>
      </div>
      <div class="chart_data_title" v-if="table_label.length>1">
        <div class="data" :class="{active:is_show_sheet1}" @click="show_sheet1"><p>Sheet1</p></div>
        <div class="plot" :class="{active:is_show_sheet2}" @click="show_sheet2"><p>Sheet2</p></div>
      </div>
      <el-table :data="sheet_table_data" border :fit="true">
        <el-table-column v-for="label in sheet_table_label" :key="label"
                         :prop="label" min-width="120px" :label="label">
        </el-table-column>
      </el-table>

    </Drawer>

  </div>
</template>

<script>
import {baseUrl} from "../../network/request";

export default {
  name: "MyDrawer",
  components: {},
  props: {
    show_all_data: {
      default() {
        return false;
      }
    },
    table_label: null, // 这个是个list，可能会有两个表格；
    table_data: null,
  },
  data() {
    return {
      show_all_data_: false,
      sheet_table_label: null,
      sheet_table_data: null,
      is_show_sheet1: false,
      is_show_sheet2: false,
      baseUrl,
    }
  },
  computed: {
    download_url() {
      return baseUrl + "/static/init_excel/echarts/" + this.$store.state.chart_type.toLocaleLowerCase() + ".xlsx"
    }
  },
  methods: {
    change_data_show() {
      this.$emit("change_data_show", this.show_all_data_)
    },
    drawer_close() {
      this.$emit("change_data_show", false)
    },
    // 改变显示的sheet
    change_show_all_data() {
      this.show_all_data_ = this.show_all_data
      if (this.show_all_data_ === true) {
        this.show_sheet1()
      }
    },

    show_sheet1() {
      this.sheet_table_label = this.table_label[0]
      this.sheet_table_data = this.table_data[0]
      this.is_show_sheet1 = true
      this.is_show_sheet2 = false
    },
    show_sheet2() {
      this.sheet_table_label = this.table_label[1]
      this.sheet_table_data = this.table_data[1]
      this.is_show_sheet1 = false
      this.is_show_sheet2 = true
    }
  },
  watch: {
    "show_all_data": "change_show_all_data"
  }
}
</script>

<style scoped>
.chart_data_title {
  font-size: 16px;
  font-family: 华文行楷 serif;
  font-weight: 500;
  color: rgba(0, 0, 0, .8);
  margin-left: 10px;
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

.download {
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
  cursor: pointer;
  width: 140px;
  margin-left: 10px;
  margin-right: 30px;
}

.download a {
  margin-left: 10px;
  margin-right: 10px;
  color: white;
}

.download:hover {
  background: #00a6fb;
  box-shadow: 0 3px 4px rgba(29 106 242 0.2);
}
</style>