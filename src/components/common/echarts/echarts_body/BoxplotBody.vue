<template>
  <el-menu default-active="1" class="el-menu-vertical-demo"
           @open="handleOpen" @close="handleClose" :background-color="background_color">
    <el-submenu>
      <template slot="title"><i class="el-icon-s-operation"></i><span class="title_span">个性化</span></template>
      <el-form ref="titleForm" :model="bodyForm" label-position="right" label-width="80px" size="small">
        <el-form-item label="布局方式">
          <div style="display: flex; align-items: center; justify-content: space-around; margin-right: 40%">
            <el-tooltip class="item" effect="dark" content="水平排列" placement="top">
              <img src="@/assets/img/boxplot_h.svg" alt="" style="height: 30px; cursor: pointer" @click.stop="show_h">
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="垂直排列" placement="top">
              <img src="@/assets/img/boxplot_v.svg" alt="" style="height: 30px; cursor: pointer" @click.stop="show_v">
            </el-tooltip>
          </div>
        </el-form-item>
        <el-form-item label="箱形宽度">
          <div class="form_item">
            <el-slider v-model="bodyForm._boxWidth[1]" :min="0" :max="100" @input="get_boxWidth"
                       :format-tooltip="(value) => {return value + '%'}"
                       :show-input="true" class="font_size"></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="图形颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.itemStyle.color"></el-input>
            <el-color-picker v-model="bodyForm.itemStyle.color" @active-change="change_color_item"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="透明度">
          <el-slider v-model="bodyForm.itemStyle.opacity" :min="0" :max="1" :step="0.01"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="描边粗细">
          <el-slider v-model="bodyForm.itemStyle.borderWidth" :min="0" :max="20" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="描边颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.itemStyle.borderColor"></el-input>
            <el-color-picker v-model="bodyForm.itemStyle.borderColor"
                             @active-change="change_color_border"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="描边类型">
          <el-select v-model="bodyForm.itemStyle.borderType" placeholder="请选择描边类型">
            <el-option v-for="item in ['solid','dashed', 'dotted']"
                       :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图形阴影">
          <el-slider v-model="bodyForm.itemStyle.shadowBlur" :min="0" :max="100" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="阴影颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.itemStyle.shadowColor"></el-input>
            <el-color-picker v-model="bodyForm.itemStyle.shadowColor"
                             @active-change="change_shadowColor"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="阴影偏移X">
          <el-slider v-model="bodyForm.itemStyle.shadowOffsetX" :min="-20" :max="20" :step="0.1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="阴影偏移Y">
          <el-slider v-model="bodyForm.itemStyle.shadowOffsetY" :min="-20" :max="20" :step="0.1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <!--        <el-form-item label="组件距离">-->
        <!--          <div class="form_item">-->
        <!--            <el-slider v-model="bodyForm.barWidth" :min="-100" :max="100" @input="get_barGap"-->
        <!--                       :format-tooltip="(value) => {return value + '%'}"-->
        <!--                       :show-input="true" class="font_size"></el-slider>-->
        <!--          </div>-->
        <!--        </el-form-item>-->
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
import {sleep} from "../../../../utils";

export default {
  name: "BoxplotBody",
  data() {
    return {
      bodyForm: {
        itemStyle: {
          color: "#5C7BD9",
          opacity:1,
          borderWidth: 1,
          borderColor: "#4F4F4F",
          borderType: "solid",
          shadowBlur: 0,
          shadowColor: "#000",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
        },
        _boxWidth: [20, 50],
        boxWidth: ['20%', '50%'],
      },
      bodyFormCopy: null,
      bodyFormCopyClose: null,
      background_color:null,
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
      }
      this.background_color = "#f4f4f4"
    },
    handleClose() {
      this.bodyFormCopyClose = this.bodyFormCopy
      this.background_color = null
    },
    change_body_option() {
      this.$store.state.chart_option.option.series[0] = this.bodyForm
      this.$store.commit("change_chart_time")
    },
    show_v(){
      this.$store.state.chart_option.option.xAxis.type = 'value'
      this.$store.state.chart_option.option.yAxis.type = 'category'
    },
    show_h(){
      this.$store.state.chart_option.option.xAxis.type = 'category'
      this.$store.state.chart_option.option.yAxis.type = 'value'
    },
    change_color_item(color) {
      this.bodyForm.itemStyle.color = color
    },
    change_color_border(color) {
      this.bodyForm.itemStyle.borderColor = color
    },
    change_shadowColor(color) {
      this.bodyForm.itemStyle.shadowColor = color
    },
    get_boxWidth(value) {
      this.bodyForm.boxWidth[1] = value +'%'
      this.change_body_option()
    },
    resetForm() {
      this.bodyForm = JSON.parse(JSON.stringify(this.bodyFormCopy))
    }
  },
  mounted() {
    sleep(50).then(() => {
      this.$store.state.chart_option.option.series[0].barWidth = '70%'
      this.$store.commit("change_chart_time")
    })
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