<template>
  <el-menu default-active="1" class="el-menu-vertical-demo"
           @open="handleOpen" @close="handleClose" :background-color="background_color">
    <el-submenu>
      <template slot="title"><i class="el-icon-s-operation"></i><span class="title_span">个性化</span></template>
      <el-form ref="bodyForm" :model="bodyForm" label-position="right" label-width="80px" size="small">

        <el-form-item label="图形颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.itemStyle.color"></el-input>
            <el-color-picker v-model="bodyForm.itemStyle.color" @active-change="change_color_item"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="线条颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.lineStyle.color"></el-input>
            <el-color-picker v-model="bodyForm.lineStyle.color" @active-change="change_color_line"></el-color-picker>
          </div>
          <p style="color: #ff5777">注：目前雷达图不支持分组调色</p>
        </el-form-item>
        <el-form-item label="线条粗细">
          <el-slider v-model="bodyForm.lineStyle.width" :min="0" :max="50" :step="0.5"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="线条类型">
          <el-select v-model="bodyForm.lineStyle.type" placeholder="请选择描边类型">
            <el-option v-for="item in ['solid','dashed', 'dotted']"
                       :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <p style="color: #ff5777; font-family: 华文行楷,serif; font-size: 18px; margin-left: 5px; margin-right: 5px">
          注：这下面的调整都是针对顶点的。</p>
        <el-form-item label="顶点类型">
          <el-select v-model="bodyForm.symbol" placeholder="请选择描边类型">
            <el-option v-for="item in ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none']"
                       :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="顶点大小">
          <el-slider v-model="bodyForm.symbolSize" :min="0" :max="100" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="顶点旋转">
          <el-slider v-model="bodyForm.symbolRotate" :min="-180" :max="180" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="顶点透明度">
          <el-slider v-model="bodyForm.itemStyle.opacity" :min="0" :max="1" :step="0.01"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="描边粗细">
          <el-slider v-model="bodyForm.itemStyle.borderWidth" :min="0" :max="2" :step="0.01"
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
        <el-form-item label="顶点阴影">
          <el-slider v-model="bodyForm.itemStyle.shadowBlur" :min="0" :max="20" :step="0.5"
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
          <el-slider v-model="bodyForm.itemStyle.shadowOffsetX" :min="-100" :max="100" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="阴影偏移Y">
          <el-slider v-model="bodyForm.itemStyle.shadowOffsetY" :min="-100" :max="100" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <p style="color: #ff5777; font-family: 华文行楷,serif; font-size: 18px; margin-left: 5px; margin-right: 5px">
          注：这下面的调整都是针对区域的，目前功能还不完善，我会优化的。</p>
        <el-form-item label="区域颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.areaStyle.color"></el-input>
            <el-color-picker v-model="bodyForm.areaStyle.color"
                             @active-change="change_color_area"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="区域阴影">
          <el-slider v-model="bodyForm.areaStyle.shadowBlur" :min="0" :max="100" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="阴影颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.areaStyle.shadowColor"></el-input>
            <el-color-picker v-model="bodyForm.areaStyle.shadowColor"
                             @active-change="change_shadowAreaColor"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="阴影偏移X">
          <el-slider v-model="bodyForm.areaStyle.shadowOffsetX" :min="-100" :max="100" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="阴影偏移Y">
          <el-slider v-model="bodyForm.areaStyle.shadowOffsetY" :min="-100" :max="100" :step="1"
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
  name: "RadarBody",
  data() {
    return {
      bodyForm: {
        symbol: 'circle',
        symbolSize: 8,
        symbolRotate: 0,
        lineStyle: {
          color: null,
          width: 2,
          type: 'solid'
        },
        areaStyle: {
          color: null,
          shadowBlur: 0,
          shadowColor: "#000",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
        },

        itemStyle: {
          color: null,
          opacity: 1,
          borderWidth: 0,
          borderColor: "#000",
          borderType: "solid",
          shadowBlur: 0,
          shadowColor: "#000",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
        },
      },
      // colorForm:{
      //   color:["red", "green", "blue", "white", "dark"]
      // },
      bodyFormCopy: null,
      bodyFormCopyClose: null,
      background_color:null,
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
      this.background_color="#f4f4f4"
    },
    handleClose() {
      this.bodyFormCopyClose = this.bodyFormCopy
      this.background_color = null
    },
    change_body_option() {
      this.$store.state.chart_option.option.series[0] = this.bodyForm
      this.$store.commit("change_chart_time")
    },
    change_color_item(color) {
      this.bodyForm.itemStyle.color = color
    },
    change_color_line(color) {
      this.bodyForm.lineStyle.color = color
    },
    change_color_border(color) {
      this.bodyForm.itemStyle.borderColor = color
    },
    change_shadowColor(color) {
      this.bodyForm.itemStyle.shadowColor = color
    },
    change_color_area(color) {
      this.bodyForm.areaStyle.color = color
    },
    change_shadowAreaColor(color) {
      this.bodyForm.areaStyle.shadowColor = color
    },
    resetForm() {
      this.bodyForm = JSON.parse(JSON.stringify(this.bodyFormCopy))
    }
  },
  mounted() {
    sleep(50).then(() => {
      this.$store.state.chart_option.option.series[0].radius = [0, '50%']
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