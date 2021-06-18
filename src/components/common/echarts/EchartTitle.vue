<template>
  <el-menu default-active="1" class="el-menu-vertical-demo"
           @open="handleOpen" @close="handleClose" :background-color="background_color">
    <el-submenu>
      <template slot="title"><i class="iconfont icon-biaoti"></i><span>标题</span></template>
      <el-form ref="titleForm" :model="titleForm" label-position="right" label-width="80px" size="small">
        <el-form-item label="标题" prop="text">
          <el-input prefix-icon="iconfont icon-biaoti" v-model="titleForm.text"></el-input>
        </el-form-item>
        <el-form-item label="字体颜色" prop="color">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="titleForm.textStyle.color"></el-input>
            <el-color-picker v-model="titleForm.textStyle.color" @active-change="change_color"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="字体风格" prop="fontStyle">
          <div class="form_item">
            <el-select v-model="titleForm.textStyle.fontStyle" placeholder="请选择字体风格">
              <el-option v-for="item in ['normal','italic','oblique']"
                         :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="字体粗细" prop="fontWeight">
          <div class="form_item">
            <el-slider v-model="titleForm.textStyle.fontWeight" :min="100" :max="1000" :step="100"
                       show-stops class="font_weight"></el-slider>
            <div class="blank"></div>
            <el-select v-model="titleForm.textStyle.fontWeight" placeholder="请选择字体粗细">
              <el-option v-for="item in ['normal','bold','bolder','lighter']"
                         :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="字体系列" prop="fontFamily">
          <div class="form_item">
            <el-select v-model="titleForm.textStyle.fontFamily" placeholder="请选择字体风格">
              <el-option v-for="item in ['serif','sans-serif','monospace','cursive','fantasy','system-ui','ui-serif',
              'ui-sans-serif','ui-monospace','ui-rounded','emoji','math','fangsong','inherit','initial','unset',
              'Arial', 'Courier New', 'Microsoft YaHei']"
                         :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="字体大小" prop="fontSize">
          <div class="form_item">
            <el-slider v-model="titleForm.textStyle.fontSize" :min="1" :max="100"
                       show-input class="font_size"></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="左边距" prop="left">
          <div class="form_item">
            <el-slider v-model="titleForm.left" :min="1" :max="100" @input="get_left_value"
                       :format-tooltip="(value) => {return value + '%'}"
                       show-input class="font_size"></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="上边距" prop="top">
          <div class="form_item">
            <el-slider v-model="titleForm.top" :min="1" :max="100" @input="get_top_value"
                       :format-tooltip="(value) => {return value + '%'}"
                       :show-input="true" class="font_size"></el-slider>
          </div>
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
import {sleep} from "../../../utils";

export default {
  name: "EchartTitle",
  components: {},
  data() {
    return {
      titleForm: {
        text: "这是一个标题",
        textStyle: {
          color: "#000000",
          fontStyle: "normal",
          fontWeight: null,
          fontFamily: 'sans-serif',
          fontSize: 18,
        },
        left: 70,
        top: 1,
      },
      titleFormCopy: {},
      titleFormCopyClose: null,
      background_color: null,
    }
  },
  computed: {
    title() {
      return {
        text: this.titleForm.text,
        textStyle: {
          color: this.titleForm.textStyle.color,
          fontStyle: this.titleForm.textStyle.fontStyle,
          fontWeight: this.titleForm.textStyle.fontWeight,
          fontFamily: this.titleForm.textStyle.fontFamily,
          fontsize: this.titleForm.textStyle.fontSize,
        },
        // left: this.titleForm.left,
        // top: this.titleForm.top,
      }
    }
  },
  methods: {
    handleOpen() {
      if (this.titleFormCopyClose === null) {
        this.titleFormCopy = JSON.parse(JSON.stringify(this.titleForm))
      }
      this.background_color = '#f4f4f4'
    },
    handleClose() {
      this.titleFormCopyClose = this.titleFormCopy
      this.background_color = null
    },
    change_title_option() {
      this.$store.state.chart_option.option.title = this.titleForm
      this.$store.commit("change_chart_time")
    },
    get_left_value(value) {
      this.$store.state.chart_option.option.title.left = value + "%"
      this.$store.commit("change_chart_time")
    },
    get_top_value(value) {
      this.$store.state.chart_option.option.title.top = value + "%"
      this.$store.commit("change_chart_time")
    },
    change_color(color) {
      this.titleForm.textStyle.color = color
    },
    resetForm() {
      this.titleForm = JSON.parse(JSON.stringify(this.titleFormCopy))
    },
  },
  mounted() {
    sleep(1).then(() => {
      if (this.$store.state.chart_type === 'Tree') {
        this.$store.state.chart_option.option.title.left = "10%"
        this.$store.commit("change_chart_time")
      } else if (this.$store.state.chart_type === 'TreeMap') {
        this.titleForm.left = 'center'
        this.titleForm.text = 'Disk Usage'
        this.titleForm.textStyle = {
          color: "#000000",
          fontStyle: "normal",
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
          fontSize: 18,
        }
        this.change_title_option()
      }
    })
  },
  watch: {
    "title": "change_title_option",
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

span {
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
}

.font_weight {
  width: 60%;
}

.font_size {
  width: 100%;
}

.blank {
  width: 5%;
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