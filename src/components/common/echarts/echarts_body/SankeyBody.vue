<template>
  <el-menu default-active="1" class="el-menu-vertical-demo"
           @open="handleOpen" @close="handleClose" :background-color="background_color">
    <el-submenu>
      <template slot="title"><i class="el-icon-s-operation"></i><span class="title_span">个性化</span></template>
      <el-form ref="bodyForm" :model="bodyForm" label-position="right" label-width="80px" size="small">
        <el-form-item label="布局方式">
          <div style="display: flex; align-items: center; justify-content: space-around; margin-right: 40%">
            <el-tooltip class="item" effect="dark" content="水平布局" placement="top">
              <img src="@/assets/img/sankey_h.svg" alt="" style="height: 30px; cursor: pointer" @click.stop="show_h">
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="垂直布局" placement="top">
              <img src="@/assets/img/sankey_v.svg" alt="" style="width: 30px; cursor: pointer" @click.stop="show_v">
            </el-tooltip>
          </div>
        </el-form-item>
        <el-form-item label="图形颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.itemStyle.color"></el-input>
            <el-color-picker v-model="bodyForm.itemStyle.color" @active-change="change_color_item"></el-color-picker>
          </div>
          <p style="color: #ff5777">注：目前桑基图不支持分组调色</p>
        </el-form-item>
        <el-form-item label="图形透明度">
          <el-slider v-model="bodyForm.itemStyle.opacity" :min="0" :max="1" :step="0.01"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="对齐方式">
          <el-select v-model="bodyForm.nodeAlign" placeholder="请选择折线样式">
            <el-option
                v-for="item in ['justify','left','right']"
                :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="图形宽度">
          <el-slider v-model="bodyForm.width" :min="0" :max="100" :step="1"
                     :format-tooltip="(value) => {return value + '%'}"
                     show-input class="font_size" @input="change_body_width"></el-slider>
        </el-form-item>
        <el-form-item label="图形高度">
          <el-slider v-model="bodyForm.height" :min="0" :max="100" :step="1"
                     :format-tooltip="(value) => {return value + '%'}"
                     show-input class="font_size" @input="change_body_height"></el-slider>
        </el-form-item>
        <p style="color: #ff5777; font-family: 华文行楷,serif; margin-left: 20%; margin-bottom: 5px; font-size: 16px">注：下面的调整针对的是节点</p>
        <el-form-item label="节点宽度">
          <el-slider v-model="bodyForm.nodeWidth" :min="0" :max="100" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="节点间距">
          <el-slider v-model="bodyForm.nodeGap" :min="0" :max="30" :step="0.5"
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
        <el-form-item label="节点阴影">
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
          <el-slider v-model="bodyForm.itemStyle.shadowOffsetX" :min="-100" :max="100" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="阴影偏移Y">
          <el-slider v-model="bodyForm.itemStyle.shadowOffsetY" :min="-100" :max="100" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>


        <p style="color: #ff5777; font-family: 华文行楷,serif; margin-left: 20%; margin-bottom: 5px; font-size: 16px">注：下面的调整针对的是连线</p>
        <el-form-item label="连线颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.lineStyle.color"></el-input>
            <el-color-picker v-model="bodyForm.lineStyle.color" @active-change="change_color_line"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="连线曲率">
          <el-slider v-model="bodyForm.lineStyle.curveness" :min="0" :max="1" :step="0.01"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="连线阴影">
          <el-slider v-model="bodyForm.lineStyle.shadowBlur" :min="0" :max="100" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="阴影颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.lineStyle.shadowColor"></el-input>
            <el-color-picker v-model="bodyForm.lineStyle.shadowColor"
                             @active-change="change_line_shadowColor"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="阴影偏移X">
          <el-slider v-model="bodyForm.lineStyle.shadowOffsetX" :min="-100" :max="100" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="阴影偏移Y">
          <el-slider v-model="bodyForm.lineStyle.shadowOffsetY" :min="-100" :max="100" :step="1"
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
  name: "SankeyBody",
  data() {
    return {
      bodyForm: {
        orient:'horizontal', // 布局方式
        nodeAlign:'justify',
        width:70,
        height:90,
        nodeWidth:20,
        nodeGap:8,
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
        lineStyle: {
          color: 'source',
          curveness:0.25,
          opacity:0.2,
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
    },
    change_body_width(){
      this.$store.state.chart_option.option.series[0].width = this.bodyForm.width + "%"
      this.$store.commit("change_chart_time")
    },
    change_body_height(){
      this.$store.state.chart_option.option.series[0].height = this.bodyForm.height + "%"
      this.$store.commit("change_chart_time")
    },
    show_h(){
      this.bodyForm.orient = 'horizontal'
    },
    show_v(){
      this.bodyForm.orient = 'vertical'
    },
    change_color_item(color) {
      this.bodyForm.itemStyle.color = color
    },
    change_color_line(color) {
      this.bodyForm.lineStyle.color = color
    },
    change_line_shadowColor(color) {
      this.bodyForm.lineStyle.shadowColor = color
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
    sleep(50).then(() => {
      this.bodyForm.width = '70%'
      this.bodyForm.height = '90%'
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