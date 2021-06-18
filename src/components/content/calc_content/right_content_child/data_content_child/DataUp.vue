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
            v-model="plot_with_init_data"
            active-color="#13ce66"
            active-text="使用示例数据分析">
        </el-switch>
      </div>
    </div>
    <div class="item3">
      <div class="bottom_submit" @click="to_calc">
        <div></div>
        <p>提交计算</p>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpLoad from "../../../../common/FileUpLoad";
import DataTable from "../../../../common/DataTable";

export default {
  name: "DataUp",
  components: {
    FileUpLoad,
    DataTable,
  },
  data() {
    return {
      show_all_data: false,
      plot_with_init_data: false,
      excel_id: null,
      suffix: null,
      calc_data: null, //用户上传的数据信息；
      table_data_label: [],// 示例数据标题；
      table_data_list: [], // 示例数据主体
    }
  },
  methods: {
    to_calc(){

    },

    //文件上传成功；
    upload_success(res) {
      this.excel_id = res[0]
      this.suffix = res[1]
    },
  },
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