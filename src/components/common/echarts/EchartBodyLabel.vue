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
        <el-form-item label="标签位置" v-show="$store.state.chart_type !== 'Pie'">
          <el-select v-model="bodyLabelForm.label.position" placeholder="请选择标签位置">
            <el-option v-for="item in ['top','left','right','bottom','inside','insideLeft','insideRight',
              'insideTop','insideBottom','insideTopLeft','insideBottomLeft','insideTopRight','insideBottomRight']"
                       :key="item" :label="item" :value="item">

            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签位置" v-show="$store.state.chart_type === 'Pie'">
          <el-select v-model="bodyLabelForm.label.position" placeholder="请选择标签位置" @click.native="show_label">
            <el-option v-for="item in ['outside','inside', 'center']"
                       :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签角度">
          <div class="form_item">
            <el-slider v-model="bodyLabelForm.label.rotate" :min="-90" :max="90" :step="1"
                       show-input class="font_size"></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="标签偏移">
          <div class="form_item">
            <p>X </p>
            <div class="blank"></div>
            <el-slider v-model="bodyLabelForm.label.offset[0]" :min="-200" :max="200" :step="1"
                       show-input class="font_size" input-size="mini"></el-slider>
          </div>
          <div class="form_item">
            <p>Y </p>
            <div class="blank"></div>
            <el-slider v-model="bodyLabelForm.label.offset[1]" :min="-200" :max="200" :step="1"
                       show-input class="font_size" input-size="mini"></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="标签颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyLabelForm.label.color"></el-input>
            <el-color-picker v-model="bodyLabelForm.label.color" @active-change="change_color_label"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="标签风格">
          <div class="form_item">
            <el-select v-model="bodyLabelForm.label.fontStyle" placeholder="请选择字体风格">
              <el-option v-for="item in ['normal','italic','oblique']"
                         :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
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

export default {
  name: "EchartBodyLabel",
  data() {
    return {
      bodyLabelForm: {
        label: {
          show: false,
          position: "inside",
          rotate: 0,
          offset: [0, 0],
          color: "#000000",
          fontStyle: "normal",
          fontWeight: 'bolder',
          fontFamily: 'sans-serif',
          fontSize: 12,
        },
        labelLine: {
          show: false,
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
      // 这种神经病一样的东西，好烦；
      if(this.$store.state.chart_type === 'TreeMap'){
        let width = this.$store.state.chart_option.option.series[0].width
        let height = this.$store.state.chart_option.option.series[0].height
        this.$store.state.chart_option.option.series[0] = this.bodyLabelForm
        this.$store.state.chart_option.option.series[0].width = width
        this.$store.state.chart_option.option.series[0].height =height
        this.$store.commit("change_chart_time")
        return
      }
      // 因为这里的修改会导致bar宽度的变化，我也是没有办法，只能这样；
      if (this.$store.state.chart_type === 'Bar'){
        let barWidth = this.$store.state.chart_option.option.series[0].barWidth
        this.$store.state.chart_option.option.series[0] = this.bodyLabelForm
        this.$store.state.chart_option.option.series[0].barWidth = barWidth
        this.$store.commit("change_chart_time")
        return;
      }
      this.$store.state.chart_option.option.series[0] = this.bodyLabelForm
      this.$store.commit("change_chart_time")
    },
    change_color_label(color) {
      this.bodyLabelForm.label.color = color
    },
    resetForm() {
      this.bodyLabelForm = JSON.parse(JSON.stringify(this.bodyLabelFormCopy))
    }
  },
  created() {
    if (this.$store.state.chart_type === 'Pie') {
      this.bodyLabelForm.label.show = true
      this.bodyLabelForm.label.position = 'outside'
      this.bodyLabelForm.label.fontWeight = 600
      this.bodyLabelForm.labelLine.show = true
    }
    else if (this.$store.state.chart_type === 'Tree') {
      this.bodyLabelForm.label.show = true
    }
    else if (this.$store.state.chart_type === 'TreeMap') {
      this.bodyLabelForm.label = {
        show: true,
        position: "inside",
        rotate: 0,
        offset: [0, 0],
        color: "#FFFFFF",
        fontStyle: "normal",
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 12,
      }
          this.change_title_option()
    }
    else if (this.$store.state.chart_type === 'Graph'){
      this.bodyLabelForm.label.show =true
      this.bodyLabelForm.label.fontWeight = 600
    }
    else if (this.$store.state.chart_type === 'Sankey'){
      this.bodyLabelForm.label.show = true
      this.bodyLabelForm.label.position = 'right'
      this.bodyLabelForm.label.fontFamily = 'Airal'
      this.bodyLabelForm.label.fontWeight = 600
    }

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