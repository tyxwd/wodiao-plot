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
<!--        涟漪-->
        <el-form-item label="波纹颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.rippleEffect.color"></el-input>
            <el-color-picker v-model="bodyForm.rippleEffect.color" @active-change="change_color_effect"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="动画周期">
          <el-slider v-model="bodyForm.rippleEffect.period" :min="0" :max="20" :step="0.1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="波纹大小">
          <el-slider v-model="bodyForm.rippleEffect.scale" :min="0" :max="20" :step="0.1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="波纹类型">
          <el-select v-model="bodyForm.rippleEffect.brushType" placeholder="请选择波纹类型">
            <el-option
                v-for="item in ['fill','stroke']" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="散点角度">
          <el-slider v-model="bodyForm.symbolRotate" :min="-180" :max="180" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="透明度">
          <el-slider v-model="bodyForm.itemStyle.opacity" :min="0" :max="1" :step="0.01"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="散点大小">
          <el-slider v-model="bodyForm.symbolSize[0]" :min="0" :max="50" :step="1"
                     show-input class="font_size" @input="get_symbolSize"></el-slider>
        </el-form-item>
        <el-form-item label="散点样式">
          <el-select v-model="bodyForm.symbol" placeholder="请选择折点样式">
            <el-option
                v-for="item in ['emptyCircle','circle','rect', 'roundRect','triangle','diamond','pin','arrow','none']"
                :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <p style="color: #ff5777">注：散点为emptyCircle时，其描边设置无效</p>
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
        <el-form-item label="散点偏移">
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
  name: "ScatterBody",
  data() {
    return {
      bodyForm: {
        symbol: 'diamond',
        symbolSize: [18, 18],
        rippleEffect:{
          color:"#5C7BD9",
          period:4,
          scale :2.5,
          brushType : 'fill',
        },
        symbolRotate:0,
        itemStyle: {
          color: "#5470c6",
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
      this.background_color= "#f4f4f4"
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
    change_color_effect(color) {
      this.bodyForm.rippleEffect.color = color
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