<template>
  <el-menu default-active="1" class="el-menu-vertical-demo"
           @open="handleOpen" @close="handleClose" :background-color="background_color">
    <el-submenu>
      <template slot="title"><i class="el-icon-s-operation"></i><span class="title_span">个性化</span></template>
      <el-form ref="bodyForm" :model="bodyForm" label-position="right" label-width="80px" size="small">
        <el-form-item label="组件宽度">
          <div class="form_item">
            <el-slider v-model="bodyForm.width" :min="1" :max="100" @input="get_width_value"
                       :format-tooltip="(value) => {return value + '%'}"
                       show-input class="font_size"></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="组件高度">
          <div class="form_item">
            <el-slider v-model="bodyForm.height" :min="1" :max="100" @input="get_height_value"
                       :format-tooltip="(value) => {return value + '%'}"
                       show-input class="font_size"></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="长宽比例">
          <div class="form_item">
            <el-slider v-model="bodyForm.squareRatio" :min="0" :max="10" step="0.01"
                       show-input class="font_size"></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="显示层级">
          <div class="form_item">
            <el-slider v-model="bodyForm.leafDepth" :min="1" :max="10" step="1"
                       show-input class="font_size"></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="分组依据">
          <el-select v-model="bodyForm.colorMappingBy" placeholder="请选择颜色分组依据">
            <el-option v-for="item in ['index','value', 'id']"
                       :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="图形颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.itemStyle.color"></el-input>
            <el-color-picker v-model="bodyForm.itemStyle.color" @active-change="change_color_item"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="透明度">
          <el-slider v-model="bodyForm.itemStyle.colorAlpha" :min="0" :max="1" :step="0.01"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="饱和度">
          <el-slider v-model="bodyForm.itemStyle.colorSaturation" :min="0" :max="1" :step="0.01"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="矩形圆角">
          <el-slider v-model="bodyForm.itemStyle.borderRadius" :min="0" :max="50" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="描边颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.itemStyle.borderColor"></el-input>
            <el-color-picker v-model="bodyForm.itemStyle.borderColor"
                             @active-change="change_color_border"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="描边粗细">
          <el-slider v-model="bodyForm.itemStyle.borderWidth" :min="0" :max="20" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="描边颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.itemStyle. borderColor"></el-input>
            <el-color-picker v-model="bodyForm.itemStyle. borderColor"
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
          <el-slider v-model="bodyForm.itemStyle.shadowOffsetX" :min="-10" :max="10" :step="0.1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="阴影偏移Y">
          <el-slider v-model="bodyForm.itemStyle.shadowOffsetY" :min="-10" :max="10" :step="0.1"
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

import {sleep} from "../../../../utils";

export default {
  name: "TreemapBody",
  data() {
    return {
      bodyForm: {
        width: '80%',
        height: "80%",
        squareRatio: 0.5 * (1 + Math.sqrt(5)),
        leafDepth: 3,
        colorMappingBy: 'index',
        itemStyle: {
          color: null,
          colorAlpha: 1, //透明度
          colorSaturation:0,  //饱和度
          borderRadius:0, //圆角，
          borderWidth: 0,
          borderColor: "#FFFFFF",
          borderType: "solid",
          shadowBlur: 0,
          shadowColor: "#000",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
        },
      },
      bodyFormCopy: null,
      bodyFormCopyClose: null,
      background_color: null,
    }
  },
  computed: {
    body() {
      return JSON.parse(JSON.stringify(this.bodyForm))
    },
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
      console.log(this.$store.state.chart_option.option)
    },
    get_width_value(value) {
      this.$store.state.chart_option.option.series[0].width = value + "%"
      this.$store.commit("change_chart_time")
    },
    get_height_value(value) {
      this.$store.state.chart_option.option.series[0].height = value + "%"
      this.$store.commit("change_chart_time")
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
    resetForm() {
      this.bodyForm = JSON.parse(JSON.stringify(this.bodyFormCopy))
    }
  },
  mounted() {
    sleep(1).then(() => {
      this.bodyForm.width = '80%'
      this.bodyForm.height = '80%'
      this.bodyFormCopy = JSON.parse(JSON.stringify(this.bodyForm))
      this.change_body_option()
      console.log(this.$store.state.chart_option.option.series[0].width)
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