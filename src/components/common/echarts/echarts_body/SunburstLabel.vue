<template>
  <el-menu default-active="1" class="el-menu-vertical-demo"
           @open="handleOpen" @close="handleClose" :background-color="background_color">
    <el-submenu>
      <template slot="title"><i class="el-icon-info"></i><span class="title_span">标签</span></template>
      <el-form ref="titleForm" :model="bodyLabelForm" label-position="right" label-width="80px" size="small">
        <el-form-item label="显示标签">
          <el-switch v-model="bodyLabelForm.label.show" active-text="显示" inactive-text="关闭">
          </el-switch>
        </el-form-item>
        <el-form-item label="标签位置">
          <el-select v-model="bodyLabelForm.label.position" placeholder="请选择标签位置" @click.native="show_label">
            <el-option v-for="item in ['top','left','right','bottom','inside','insideLeft','insideRight',
              'insideTop','insideBottom','insideTopLeft','insideBottomLeft','insideTopRight','insideBottomRight']"
                       :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="旋转类型">
          <el-select v-model="bodyLabelForm.label.rotate" placeholder="请选择旋转类型">
            <el-option v-for="item in ['径向旋转radial','切向旋转tangential']"
                       :key="item" :label="item.substring(0,4)" :value="item.substring(4,)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="旋转角度">
          <el-slider v-model="bodyLabelForm.label.rotate" :min="-90" :max="90" :step="1"
                     show-input class="font_size"></el-slider>

        </el-form-item>
        <el-form-item label="对齐方式">
          <el-select v-model="bodyLabelForm.label.align" placeholder="请选择对齐方式">
            <el-option v-for="item in ['left', 'center', 'right']"
                       :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <p style="color: #ff5777">注：'left' 是指靠近内圈，而 'right' 是指靠近外圈。</p>
        </el-form-item>
        <el-form-item label="标签颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyLabelForm.label.color"></el-input>
            <el-color-picker v-model="bodyLabelForm.label.color" @active-change="change_color_label"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="标签风格">
          <el-select v-model="bodyLabelForm.label.fontStyle" placeholder="请选择字体风格">
            <el-option v-for="item in ['normal','italic','oblique']"
                       :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签粗细">
          <div class="form_item">
            <el-slider v-model="bodyLabelForm.label.fontWeight" :min="100" :max="1000" :step="100"
                       show-stops class="font_weight"></el-slider>
            <div class="blank"></div>
            <el-select v-model="bodyLabelForm.label.fontWeight" placeholder="请选择字体粗细">
              <el-option v-for="item in ['normal','bold','bolder','lighter']"
                         :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="标签系列">
          <div class="form_item">
            <el-select v-model="bodyLabelForm.label.fontFamily" placeholder="请选择字体风格">
              <el-option v-for="item in ['serif','sans-serif','monospace','cursive','fantasy','system-ui','ui-serif',
              'ui-sans-serif','ui-monospace','ui-rounded','emoji','math','fangsong','inherit','initial','unset',
              'Arial', 'Courier New', 'Microsoft YaHei']"
                         :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="标签大小">
          <el-slider v-model="bodyLabelForm.label.fontSize" :min="1" :max="50"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="视觉引线">
          <el-switch v-model="bodyLabelForm.labelLine.show" active-text="显示" inactive-text="关闭">
          </el-switch>
          <p style="color: #ff5777">注：要与标签偏移配合使用</p>
        </el-form-item>
        <!--        <el-form-item label="显示位置">-->
        <!--          <el-switch v-model="bodyLabelForm.labelLine.showAbove" active-text="图形上方" inactive-text="图形下方">-->
        <!--          </el-switch>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="引线长度">-->
        <!--          <el-slider v-model="bodyLabelForm.label.length2" :min="0" :max="50"-->
        <!--                     show-input class="font_size"></el-slider>-->
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
  name: "SunburstLabel",
  data() {
    return {
      bodyLabelForm: {
        label: {
          show: true,
          position: "inside",
          rotate: null,
          align: 'center',
          color: "#000000",
          fontStyle: "normal",
          fontWeight: 'bolder',
          fontFamily: 'sans-serif',
          fontSize: 14,
        },
        labelLine: {
          show: true,
          // showAbove:true,
          // length2:0
        }
      },
      bodyLabelFormCopy: null,
      bodyLabelFormCopyClose: null,
      background_color: null,
    }
  },
  computed: {
    bodyLabel() {
      return JSON.parse(JSON.stringify(this.bodyLabelForm))
    }
  },
  methods: {
    handleOpen() {
      if (this.bodyLabelFormCopyClose === null) {
        this.bodyLabelFormCopy = JSON.parse(JSON.stringify(this.bodyLabelForm))
      }
      this.background_color = "#f4f4f4"
    },
    handleClose() {
      this.bodyLabelFormCopyClose = this.bodyLabelFormCopy
      this.background_color = null
    },
    change_body_option() {
      this.$store.state.chart_option.option.series = this.bodyLabelForm
      this.$store.commit("change_chart_time")
    },
    change_color_label(color) {
      this.bodyLabelForm.label.color = color
    },
    resetForm() {
      this.bodyLabelForm = JSON.parse(JSON.stringify(this.bodyLabelFormCopy))
    }
  },
  mounted() {
    sleep(10).then(() => {
      this.bodyLabelForm.label.rotate = 'radial'
      this.bodyLabelFormCopy = JSON.parse(JSON.stringify(this.bodyLabelForm))
      this.change_body_option()
    })
  },
  watch: {
    "bodyLabel": "change_body_option",
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