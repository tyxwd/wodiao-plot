<template>
  <div class="file_upload">
    <Upload
        multiple
        type="drag"
        :action="baseUrl + '/upload'" :on-success="handleSuccess">
      <div class="upload_background">
        <div class="imgs">
          <img src="@/assets/img/xlsx.svg" alt="">
          <img src="@/assets/img/xls.svg" alt="">
          <img src="@/assets/img/csv.svg" alt="">
        </div>
        <p>点击或者将文件拖拽到此处上传</p>
      </div>
    </Upload>
  </div>
</template>

<script>
import {baseUrl} from "../../network/request";
export default {
  name: "FileUpLoad",
  data(){
    return{
      baseUrl,
    }
  },
  methods:{
    handleSuccess(res,file){
      console.log(res) //[1623763420, "xlsx"]
      console.log(file)
      this.$emit('upload_success', res)
    }
  }
}
</script>

<style scoped>
.file_upload{
}
.upload_background{
  /*background: black;*/
  border: none;
}
.imgs{
  display: flex;
  justify-content: space-between;
}
.imgs img{
  width: 25%;
}
.upload_background p{
  margin-top: 10px;
  font-size: 14px;
  font-family: 华文行楷 serif;
  font-weight: 300;
  color: rgba(0, 0, 0, .8);
}
</style>