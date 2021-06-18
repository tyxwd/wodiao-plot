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
        <el-form-item label="透明度">
          <el-slider v-model="bodyForm.itemStyle.opacity" :min="0" :max="1" :step="0.01"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="布局方式">
          <el-select v-model="bodyForm.layout" placeholder="请选择排列方式">
            <el-option
                v-for="item in ['orthogonal','radial']"
                :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="布局方向">
          <p style="color: #ff5777">注： 布局方式为'orthogonal'，下面两项配置才生效</p>
          <el-select v-model="bodyForm.orient" placeholder="请选择布局方向">
            <el-option
                v-for="item in ['从左到右LR','从右到左RL','从上到下TB','从下到上BT']"
                :key="item" :label="item.substring(0,4)" :value="item.substring(4,)">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="边线样式">
          <el-select v-model="bodyForm.edgeShape" placeholder="请选择边线样式">
            <el-option
                v-for="item in ['curve','polyline']"
                :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="分叉位置">-->
<!--          <el-slider v-model="bodyForm.edgeForkPosition" :min="0" :max="100" :step="1" @input="get_edgeForkValue"-->
<!--                     :format-tooltip="(value) => {return value + '%'}"-->
<!--                     show-input class="font_size"></el-slider>-->
<!--        </el-form-item>-->

        <el-form-item label="散点样式">
          <el-select v-model="bodyForm.symbol" placeholder="请选择折点样式">
            <el-option
                v-for="item in ['emptyCircle','circle','rect', 'roundRect','triangle','diamond','pin','arrow','none']"
                :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="散点大小">
          <el-slider v-model="bodyForm.symbolSize" :min="0" :max="50" :step="0.5"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="散点角度">
          <el-slider v-model="bodyForm.symbolRotate" :min="-180" :max="180" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <!--        <el-form-item label="透明度">-->
        <!--          <el-slider v-model="bodyForm.itemStyle.opacity" :min="0" :max="1" :step="0.01"-->
        <!--                     show-input class="font_size"></el-slider>-->
        <!--        </el-form-item>-->
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
  name: "TreeBody",
  data() {
    return {
      bodyForm: {
        layout: "orthogonal",
        orient: "LR",
        symbol: 'emptyCircle',
        symbolSize: 7,
        symbolRotate: 0,
        edgeShape: 'curve',
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
    // get_edgeForkValue(value) {
      // this.$store.state.chart_option.option.series[0].edgeForkPosition = value + "%"
      // this.$store.commit("change_chart_time")
    // },
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
  },
  watch: {
    "body": "change_body_option",
    // "color": "change_body_option",
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