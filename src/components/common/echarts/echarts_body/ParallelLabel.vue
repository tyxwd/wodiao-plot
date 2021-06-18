<template>
  <el-menu default-active="1" class="el-menu-vertical-demo"
           @open="handleOpen" @close="handleClose" :background-color="background_color">
    <el-submenu>
      <template slot="title"><i class="el-icon-info"></i><span class="title_span">标签</span></template>
      <el-form ref="titleForm" :model="bodyForm" label-position="right" label-width="80px" size="small">
        <el-form-item label="背景颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.backgroundColor"></el-input>
            <el-color-picker v-model="bodyForm.backgroundColor" @active-change="change_backgroundColor"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="类名颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.parallel.parallelAxisDefault.nameTextStyle.color"></el-input>
            <el-color-picker v-model="bodyForm.parallel.parallelAxisDefault.nameTextStyle.color"
                             @active-change="change_nameTextColor"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="类名大小">
          <el-slider v-model="bodyForm.parallel.parallelAxisDefault.nameTextStyle.fontSize" :min="0" :max="100" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="Y 轴颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.parallel.parallelAxisDefault.axisLine.lineStyle.color"></el-input>
            <el-color-picker v-model="bodyForm.parallel.parallelAxisDefault.axisLine.lineStyle.color"
                             @active-change="change_axisLineColor"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="刻度颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.parallel.parallelAxisDefault.axisTick.lineStyle.color"></el-input>
            <el-color-picker v-model="bodyForm.parallel.parallelAxisDefault.axisTick.lineStyle.color"
                             @active-change="change_axisTickColor"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="标签颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.parallel.parallelAxisDefault.axisLabel.color"></el-input>
            <el-color-picker v-model="bodyForm.parallel.parallelAxisDefault.axisLabel.color"
                             @active-change="change_axisLabelColor"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="标签大小">
          <el-slider v-model="bodyForm.parallel.parallelAxisDefault.axisLabel.fontSize" :min="0" :max="100" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item>
          <div class="form_button">
            <el-button @click="resetForm('titleForm')">重置参数</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "ParallelLabel",
  data() {
    return {
      bodyForm: {
        backgroundColor:'#333',
        parallel:{
          parallelAxisDefault:{
            nameTextStyle:{
              color:"#fff",
              fontSize: 12
            },
            axisLine: {
              lineStyle: {
                color: '#aaa'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#777'
              }
            },
            axisLabel: {
              color: '#fff',
              fontSize: 12
            }
          }
        },
      },
      bodyFormCopy: null,
      bodyFormCopyClose: null,
      background_color:null
    }
  },
  computed: {
    body() {
      return JSON.parse(JSON.stringify(this.bodyForm))
    }

  },
  methods: {
    handleOpen() {
      if (this.bodyFormCopyClose === null) {
        this.bodyFormCopy = JSON.parse(JSON.stringify(this.bodyForm))
        this.background_color = "#f4f4f4"
      }
    },
    handleClose() {
      this.bodyFormCopyClose = this.bodyFormCopy
      this.background_color = null
    },
    change_body_option() {
      this.$store.state.chart_option.option.parallel = this.bodyForm.parallel
      this.$store.commit("change_chart_time")
    },
    change_backgroundColor(color){
      this.$store.state.chart_option.option.backgroundColor = color
      this.$store.commit("change_chart_time")
    },
    change_nameTextColor(color){
      this.$store.state.chart_option.option.parallel.parallelAxisDefault.nameTextStyle.color = color
      this.$store.commit("change_chart_time")
    },
    change_axisLineColor(color){
      this.$store.state.chart_option.option.parallel.parallelAxisDefault.axisLine.lineStyle.color = color
      this.$store.commit("change_chart_time")
    },
    change_axisTickColor(color){
      this.$store.state.chart_option.option.parallel.parallelAxisDefault.axisTick.lineStyle.color = color
      this.$store.commit("change_chart_time")
    },
    change_axisLabelColor(color){
      this.$store.state.chart_option.option.parallel.parallelAxisDefault.axisLabel.color = color
      this.$store.commit("change_chart_time")
    },
    resetForm() {
      this.bodyForm = JSON.parse(JSON.stringify(this.bodyFormCopy))
      this.change_backgroundColor(this.bodyForm.backgroundColor)
    }
  },
  watch: {
    "body": "change_body_option",
    "$store.state.chart_type": "resetForm",
  }
}
</script>

<style scoped>
.el-container {
  height: 100%;
  width: 100%;
  min-width: 150px;
}

.title_span {
  font-size: 18px;
  font-weight: 700;
}

.el-aside {
  height: 100%;
  width: 100%;
  background: var(--color-background);
}

.el-menu {
  border-top: rgb(235, 235, 235) 1px solid;
  border-right: none;
  min-width: 100px;
}

.el-form {
  margin-top: 10px;
  margin-right: 20px;
  margin-left: 20px;
}

.form_item {
  display: flex;
  align-items: center;
}

.font_weight {
  width: 60%;
}

.font_size {
  width: 100%;
}

.blank {
  width: 2%;
}

.form_button {
  display: flex;
  justify-content: center;
}

.el-button {
  width: 50%;
  margin-right: 20%;
}
</style>