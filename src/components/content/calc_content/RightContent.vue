<template>
  <div class="right_content">
    <el-container>
      <el-main>
        <calc-content class="calc_content" :calc_types="calc_types"></calc-content>
        <data-content class="data_content"></data-content>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import CalcContent from "./right_content_child/CalcContent";
import DataContent from "./right_content_child/DataContent";
export default {
  name: "RightContent",
  components:{
    CalcContent,
    DataContent,
  },
  props:{
    calc_types:null,
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

.calc_content{
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