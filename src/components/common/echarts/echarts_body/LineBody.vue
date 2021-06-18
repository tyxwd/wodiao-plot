<template>
  <el-menu default-active="1" class="el-menu-vertical-demo"
           @open="handleOpen" @close="handleClose" :background-color="background_color">
    <el-submenu>
      <template slot="title"><i class="el-icon-s-operation"></i><span class="title_span">个性化</span></template>
      <el-form ref="titleForm" :model="bodyForm" label-position="right" label-width="80px" size="small">
        <el-form-item label="图形颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.itemStyle.color"></el-input>
            <el-color-picker v-model="bodyForm.itemStyle.color" @active-change="change_color_item"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="折线颜色">
          <!--          注： 修改 lineStyle 中的颜色不会影响图例颜色，如果需要图例颜色和折线图颜色一致，需修改 itemStyle.color，线条颜色默认也会取该颜色。-->
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.lineStyle.color"></el-input>
            <el-color-picker v-model="bodyForm.lineStyle.color" @active-change="change_color_line"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="透明度">
          <el-slider v-model="bodyForm.itemStyle.opacity" :min="0" :max="1" :step="0.01"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="折线宽度">
          <el-slider v-model="bodyForm.lineStyle.width" :min="0" :max="50" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="折线样式">
          <el-select v-model="bodyForm.lineStyle.type" placeholder="请选择折线样式">
            <el-option
                v-for="item in ['solid','dashed','dotted']"
                :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="折线平滑">
          <el-slider v-model="bodyForm.smooth" :min="0" :max="1" :step="0.01"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="折点大小">
          <el-slider v-model="bodyForm.symbolSize[0]" :min="0" :max="50" :step="1"
                     show-input class="font_size" @input="get_symbolSize"></el-slider>
        </el-form-item>
        <el-form-item label="折点样式">
          <el-select v-model="bodyForm.symbol" placeholder="请选择折点样式">
            <el-option
                v-for="item in ['emptyCircle','circle','rect', 'roundRect','triangle','diamond','pin','arrow','none']"
                :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <p style="color: #ff5777">注：折点为emptyCircle时，其描边设置无效</p>
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
          <el-slider v-model="bodyForm.itemStyle.shadowOffsetX" :min="-10" :max="10" :step="0.1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="阴影偏移Y">
          <el-slider v-model="bodyForm.itemStyle.shadowOffsetY" :min="-10" :max="10" :step="0.1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="折点偏移">
          <el-slider v-model="bodyForm.symbolOffset[0]" :min="-50" :max="50" :step="1"
                     show-input class="font_size" @input="get_symbolOffset"></el-slider>
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
  name: "EchartBody",
  data() {
    return {
      bodyForm: {
        symbol: 'emptyCircle',
        lineStyle: {
          color: "#5C7BD9",
          width: 2,
          type: 'solid',
        },
        smooth:0,
        symbolSize: [8, 8],
        itemStyle: {
          color: "#5C7BD9",
          opacity:1,
          borderWidth: 0,
          borderColor: "#000",
          borderType: "solid",
          shadowBlur: 0,
          shadowColor: "#000",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
        },
        symbolOffset: [0, 0]
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
      console.log(this.$store.state.chart_option.option.series[0])
    },
    get_symbolSize(value) {
      this.bodyForm.symbolSize[1] = value
    },
    get_symbolOffset(value) {
      this.bodyForm.symbolOffset[1] = value
    },
    change_color_item(color) {
      this.bodyForm.itemStyle.color = color
      this.bodyForm.lineStyle.color = color
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
    get_barWidth(value) {
      this.$store.state.chart_option.option.series[0].barWidth = value + "%"
      this.$store.commit("change_chart_time")
    },
    resetForm() {
      this.bodyForm = JSON.parse(JSON.stringify(this.bodyFormCopy))
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