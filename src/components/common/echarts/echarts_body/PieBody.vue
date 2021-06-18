<template>
  <el-menu default-active="1" class="el-menu-vertical-demo"
           @open="handleOpen" @close="handleClose" :background-color="background_color">
    <el-submenu>
      <template slot="title"><i class="el-icon-s-operation"></i><span class="title_span">个性化</span></template>
      <el-form ref="bodyForm" :model="bodyForm" label-position="right" label-width="80px" size="small">
        <el-form-item label="展示类型">
          <el-switch
              v-model="bodyForm.roseType"
              active-text="南丁格尔图"
              inactive-text="基本饼图">
          </el-switch>
        </el-form-item>
        <el-form-item label="排列方式">
          <el-switch
              v-model="bodyForm.clockwise"
              active-text="顺时针"
              inactive-text="逆时针">
          </el-switch>
        </el-form-item>
        <el-form-item label="旋转角度">
          <el-slider v-model="bodyForm.startAngle" :min="0" :max="360" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="图形颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.itemStyle.color"></el-input>
            <el-color-picker v-model="bodyForm.itemStyle.color" @active-change="change_color_item"></el-color-picker>
          </div>
          <p style="color: #ff5777">注：目前饼图不支持分组调色</p>
        </el-form-item>
        <el-form-item label="透明度">
          <el-slider v-model="bodyForm.itemStyle.opacity" :min="0" :max="1" :step="0.01"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="圆环内径">
          <el-slider v-model="bodyForm.radius[0]" :min="0" :max="100" :step="1" @input="get_innerRadius"
                     :format-tooltip="(value) => {return value + '%'}"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="圆环外径">
          <el-slider v-model="bodyForm.radius[1]" :min="0" :max="100" :step="1" @input="get_outerRadius"
                     :format-tooltip="(value) => {return value + '%'}"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="内环倒角">
          <el-slider v-model="bodyForm.itemStyle.borderRadius[0]" :min="0" :max="100" :step="1" @input="get_innerBorderRadius"
                     :format-tooltip="(value) => {return value + '%'}"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="外环倒角">
          <el-slider v-model="bodyForm.itemStyle.borderRadius[1]" :min="0" :max="100" :step="1" @input="get_outerBorderRadius"
                     :format-tooltip="(value) => {return value + '%'}"
                     show-input class="font_size"></el-slider>
          <p style="color: #ff5777">注：内外环倒角需要在环形状态下使用</p>
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
          <el-slider v-model="bodyForm.itemStyle.shadowOffsetX" :min="-100" :max="100" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="阴影偏移Y">
          <el-slider v-model="bodyForm.itemStyle.shadowOffsetY" :min="-100" :max="100" :step="1"
                     show-input class="font_size"></el-slider>
          <p style="color: #ff5777">注：利用阴影偏移可以制作立体效果</p>
        </el-form-item>
        <el-form-item>
          <div class="form_button">
            <el-button @click="resetForm('titleForm')">重置参数</el-button>
          </div>
        </el-form-item>
      </el-form>
      <!--      <el-form ref="colorForm" :model="colorForm" label-position="right" label-width="80px" size="small">-->
      <!--        <el-form-item label="图形颜色">-->
      <!--          <div class="form_item" v-for="(item_color, index) in colorForm.color" :key="index">-->
      <!--            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="colorForm.color[index]"></el-input>-->
      <!--            <el-color-picker v-model="colorForm.color[index]" @active-change="change_color_item(index)"></el-color-picker>-->
      <!--          </div>-->
      <!--          &lt;!&ndash;          <p style="color: #ff5777">注：目前饼图不支持分组调色</p>&ndash;&gt;-->
      <!--        </el-form-item>-->
      <!--      </el-form>-->
    </el-submenu>
  </el-menu>
</template>

<script>
import {sleep} from "../../../../utils";

export default {
  name: "PieBody",
  data() {
    return {
      bodyForm: {
        roseType: false,
        clockwise: true,
        startAngle: 0,
        itemStyle: {
          color: null,
          opacity:1,
          borderWidth: 0,
          borderColor: "#000",
          borderType: "solid",
          shadowBlur: 0,
          shadowColor: "#000",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          borderRadius: ['0%', '0']
        },
        radius: ['0%', '50%']
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
    // color(){
    //   return JSON.parse(JSON.stringify(this.colorForm))
    // }
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
    change_color_item(color) {
      this.bodyForm.itemStyle.color = color
    },
    change_color_border(color) {
      this.bodyForm.itemStyle.borderColor = color
    },
    change_shadowColor(color) {
      this.bodyForm.itemStyle.shadowColor = color
    },
    get_innerRadius(value) {
      this.$store.state.chart_option.option.series[0].radius[0] = value + "%"
      this.$store.commit("change_chart_time")
    },
    get_innerBorderRadius(value) {
      this.$store.state.chart_option.option.series[0].itemStyle.borderRadius[0] = value + "%"
      this.$store.commit("change_chart_time")
    },
    get_outerRadius(value) {
      this.$store.state.chart_option.option.series[0].radius[1] = value + "%"
      this.$store.commit("change_chart_time")
    },
    get_outerBorderRadius(value) {
      this.$store.state.chart_option.option.series[0].itemStyle.borderRadius[1] = value + "%"
      this.$store.commit("change_chart_time")
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