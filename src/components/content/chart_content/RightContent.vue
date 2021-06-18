<template>
  <div class="right_content">
    <el-container>
      <el-main>
        <chart-content class="chart_content" :echart_types="echart_types"></chart-content>
        <data-content class="data_content"></data-content>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import ChartContent from "./right_content_child/ChartContent";
import DataContent from "./right_content_child/DataContent";
export default {
  name: "RightContent",
  components:{
    ChartContent,
    DataContent,
  },
  props:{
    echart_types:null,
  }
}
</script>

<style scoped>
.right_content{
  position: absolute;
  right: 0;
  bottom: 0;
  width: calc(100% - 240px);
  top: 6.5vh;

}
.el-container{
  height: 100%;
  min-width: 1000px;
  min-height: 560px;
}
.el-main{
  padding:0;
  padding-left: 1%;
  padding-right: 1%;
  background: rgb(247, 247, 247);
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.chart_content{
  width: 60%;
  height: 90%;
  background: white;
}
.data_content{
  width: 35%;
  height: 90%;
  background: white;
}
</style>