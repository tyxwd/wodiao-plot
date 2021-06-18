<template>
  <el-menu default-active="1" class="el-menu-vertical-demo"
           @open="handleOpen" @close="handleClose" :background-color="background_color">
    <el-submenu>
      <template slot="title"><i class="el-icon-s-operation"></i><span class="title_span">个性化</span></template>
      <el-form ref="bodyForm" :model="bodyForm" label-position="right" label-width="80px" size="small">
        <el-form-item label="布局方式">
          <div style="display: flex; align-items: center; justify-content: space-around; margin-right: 40%">
            <el-tooltip class="item" effect="dark" content="环形布局" placement="top">
              <img src="@/assets/img/circular.svg" alt="" style="height: 30px; cursor: pointer" @click.stop="show_circular">
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="力引导布局" placement="top">
              <img src="@/assets/img/force.svg" alt="" style="height: 30px; cursor: pointer" @click.stop="show_force">
            </el-tooltip>
          </div>
        </el-form-item>
        <el-form-item label="图形大小">
          <el-slider v-model="bodyForm.zoom" :min="0" :max="1" :step="0.01"
                     :format-tooltip="(value) => {return value * 100 + '%'}"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="标签排列" v-show="bodyForm.layout==='circular'">
          <el-switch
              v-model="bodyForm.circular.rotateLabel"
              active-text="径向排列"
              inactive-text="水平排列">
          </el-switch>
        </el-form-item>
        <el-form-item label="斥力因子" v-show="bodyForm.layout!=='circular'">
          <el-slider v-model="bodyForm.force.repulsion" :min="0" :max="1000" :step="10"
                     show-input class="font_size"></el-slider>
          <p style="color: #ff5777">注：值越大则节点间斥力越大。</p>
        </el-form-item>
        <el-form-item label="中心引力" v-show="bodyForm.layout!=='circular'">
          <el-slider v-model="bodyForm.force.gravity" :min="0" :max="1" :step="0.01"
                     show-input class="font_size"></el-slider>
          <p style="color: #ff5777">注：值越大节点越往中心点靠拢。</p>
        </el-form-item>
        <el-form-item label="节点距离" v-show="bodyForm.layout!=='circular'">
          <el-slider v-model="bodyForm.force.edgeLength" :min="0" :max="100" :step="1"
                     show-input class="font_size"></el-slider>
          <p style="color: #ff5777">注：节点间距离，受斥力因子影响。</p>
        </el-form-item>

        <el-form-item label="图形颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.itemStyle.color"></el-input>
            <el-color-picker v-model="bodyForm.itemStyle.color" @active-change="change_color_item"></el-color-picker>
          </div>
          <p style="color: #ff5777">注：目前网络图不支持分组调色</p>
        </el-form-item>
        <el-form-item label="连线颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.lineStyle.color"></el-input>
            <el-color-picker v-model="bodyForm.lineStyle.color" @active-change="change_color_line"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="连线宽度">
          <el-slider v-model="bodyForm.lineStyle.width" :min="0" :max="20" :step="0.5"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="连线样式">
          <el-select v-model="bodyForm.lineStyle.type" placeholder="请选择折线样式">
            <el-option
                v-for="item in ['solid','dashed','dotted']"
                :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="连线曲率">
          <el-slider v-model="bodyForm.lineStyle.curveness" :min="0" :max="1" :step="0.01"
                     show-input class="font_size"></el-slider>
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
          <el-slider v-model="bodyForm.itemStyle.shadowOffsetX" :min="-100" :max="100" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="阴影偏移Y">
          <el-slider v-model="bodyForm.itemStyle.shadowOffsetY" :min="-100" :max="100" :step="1"
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
  name: "GraphBody",
  data() {
    return {
      bodyForm: {
        zoom: 0.9,
        layout: 'circular',
        circular:{
          rotateLabel:true,
        }, //这要开启环形布局才有；
        force:{
          initLayout:null,
          repulsion:500,
          gravity:0.01,
          edgeLength:30,
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
        lineStyle: {
          color: 'source',
          width: 1,
          type: 'solid',
          curveness:0.25,
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
    show_circular(){
      this.bodyForm.layout = 'circular'
    },
    show_force(){
      this.bodyForm.layout = 'force'
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