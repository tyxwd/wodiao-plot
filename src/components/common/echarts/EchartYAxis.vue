<template>
  <el-menu default-active="2" class="el-menu-vertical-demo"
           @open="handleOpen" @close="handleClose" :background-color="background_color">
    <el-submenu>
      <template slot="title"><i class="iconfont icon-bim_Yzhou"></i><span class="title_span">Y 轴</span></template>
      <el-form ref="yAxisForm" :model="yAxisForm" label-position="right" label-width="80px" size="small">
        <el-form-item label="Y 轴名称">
          <el-input prefix-icon="iconfont icon-biaoti" v-model="yAxisForm.name"></el-input>
        </el-form-item>
        <el-form-item label="显示Y 轴">
          <el-switch
              v-model="yAxisForm.show"
              active-text="显示"
              inactive-text="关闭">
          </el-switch>
        </el-form-item>
        <el-form-item label="Y 轴位置">
          <el-select v-model="yAxisForm.position" placeholder="请选择Y 轴位置">
            <el-option v-for="item in ['left','right']"
                       :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Y 轴偏移">
          <div class="form_item">
            <el-slider v-model="yAxisForm.offset" :min="-100" :max="100" :step="1"
                       show-input class="font_size"></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="Y 轴留白">
          <el-switch
              v-model="yAxisForm.boundaryGap"
              active-text="开启"
              inactive-text="关闭">
          </el-switch>
        </el-form-item>
        <el-form-item label="轴名位置">
          <el-select v-model="yAxisForm.nameLocation" placeholder="请选择Y 轴名称位置">
            <el-option v-for="item in ['start','middle', 'end']"
                       :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="轴名偏移">
          <div class="form_item">
            <el-slider v-model="yAxisForm.nameGap" :min="-50" :max="50" :step="1"
                       show-input class="font_size"></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="轴名角度">
          <div class="form_item">
            <el-slider v-model="yAxisForm.nameRotate" :min="0" :max="360" :step="1"
                       show-input class="font_size"></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="轴名颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="yAxisForm.nameTextStyle.color"></el-input>
            <el-color-picker v-model="yAxisForm.nameTextStyle.color" @active-change="change_color_name"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="轴名风格">
          <div class="form_item">
            <el-select v-model="yAxisForm.nameTextStyle.fontStyle" placeholder="请选择字体风格">
              <el-option v-for="item in ['normal','italic','oblique']"
                         :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="轴名粗细">
          <div class="form_item">
            <el-slider v-model="yAxisForm.nameTextStyle.fontWeight" :min="100" :max="1000" :step="100"
                       show-stops class="font_weight"></el-slider>
            <div class="blank"></div>
            <el-select v-model="yAxisForm.nameTextStyle.fontWeight" placeholder="请选择字体粗细">
              <el-option v-for="item in ['normal','bold','bolder','lighter']"
                         :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="轴名系列">
          <div class="form_item">
            <el-select v-model="yAxisForm.nameTextStyle.fontFamily" placeholder="请选择字体风格">
              <el-option v-for="item in ['serif','sans-serif','monospace','cursive','fantasy','system-ui','ui-serif',
              'ui-sans-serif','ui-monospace','ui-rounded','emoji','math','fangsong','inherit','initial','unset',
              'Arial', 'Courier New', 'Microsoft YaHei']"
                         :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="轴名大小">
          <div class="form_item">
            <el-slider v-model="yAxisForm.nameTextStyle.fontSize" :min="1" :max="100"
                       show-input class="font_size"></el-slider>
          </div>
        </el-form-item>

        <el-form-item label="显示轴线">
          <el-switch
              v-model="yAxisForm.axisLine.show"
              active-text="显示"
              inactive-text="关闭">
          </el-switch>
        </el-form-item>
        <el-form-item label="零点对齐">
          <el-switch
              v-model="yAxisForm.axisLine.onZero"
              active-text="开启"
              inactive-text="关闭">
          </el-switch>
          <p style="color: #ff5777">注：只有在X轴为数值轴且包含 0 刻度时有效，要与Y 轴位置/偏移配合使用</p>
        </el-form-item>
        <el-form-item label="端点样式">
          <div class="form_item">
            <el-select v-model="yAxisForm.axisLine.symbol" placeholder="请选择字体风格">
              <el-option v-for="item in ['circle','rect','roundRect','triangle','diamond','pin','arrow','none']"
                         :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="端点大小">
          <div class="form_item">
            <el-slider v-model="yAxisForm.axisLine.symbolSize[0]" :min="0" :max="50" :step="1"
                       show-input class="font_size" @input="get_symbolSize"></el-slider>
          </div>
        </el-form-item>

        <el-form-item label="显示刻度">
          <el-switch
              v-model="yAxisForm.axisTick.show"
              active-text="显示"
              inactive-text="关闭">
          </el-switch>
        </el-form-item>
        <el-form-item label="刻度朝向">
          <el-switch
              v-model="yAxisForm.axisTick.inside"
              active-text="inside"
              inactive-text="outside" inactive-color="#13ce66">
          </el-switch>
        </el-form-item>
        <el-form-item label="刻度长度">
          <div class="form_item">
            <el-slider v-model="yAxisForm.axisTick.length" :min="0" :max="50" :step="1"
                       show-input class="font_size"></el-slider>
          </div>
        </el-form-item>

        <el-form-item label="显示标签">
          <el-switch
              v-model="yAxisForm.axisLabel.show"
              active-text="显示"
              inactive-text="关闭">
          </el-switch>
        </el-form-item>
        <el-form-item label="标签角度">
            <el-slider v-model="yAxisForm.axisLabel.rotate" :min="-90" :max="90" :step="1"
                       show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="标签偏移">
            <el-slider v-model="yAxisForm.axisLabel.margin" :min="-25" :max="25" :step="1"
                       show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="标签颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="yAxisForm.axisLabel.color"></el-input>
            <el-color-picker v-model="yAxisForm.axisLabel.color" @active-change="change_color_label"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="标签风格">
          <div class="form_item">
            <el-select v-model="yAxisForm.axisLabel.fontStyle" placeholder="请选择字体风格">
              <el-option v-for="item in ['normal','italic','oblique']"
                         :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="标签粗细">
          <div class="form_item">
            <el-slider v-model="yAxisForm.axisLabel.fontWeight" :min="100" :max="1000" :step="100"
                       show-stops class="font_weight"></el-slider>
            <div class="blank"></div>
            <el-select v-model="yAxisForm.axisLabel.fontWeight" placeholder="请选择字体粗细">
              <el-option v-for="item in ['normal','bold','bolder','lighter']"
                         :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="标签系列">
            <el-select v-model="yAxisForm.axisLabel.fontFamily" placeholder="请选择字体风格">
              <el-option v-for="item in ['serif','sans-serif','monospace','cursive','fantasy','system-ui','ui-serif',
              'ui-sans-serif','ui-monospace','ui-rounded','emoji','math','fangsong','inherit','initial','unset',
              'Arial', 'Courier New', 'Microsoft YaHei']"
                         :key="item" :label="item" :value="item"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标签大小">
            <el-slider v-model="yAxisForm.axisLabel.fontSize" :min="1" :max="50"
                       show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="标签对齐">
          <el-select v-model="yAxisForm.axisLabel.verticalAlign" placeholder="请选择字体风格">
            <el-option v-for="item in ['auto','top','middle','bottom']"
                       :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="form_button">
            <el-button @click="resetForm('yAxisForm')">重置参数</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "EchartyAxis",
  data() {
    return {
      yAxisForm: {
        name: '这是Y 轴的名称',
        type:'value',
        nameLocation: 'middle',
        nameTextStyle: {
          color: "#000000",
          fontStyle: "normal",
          fontWeight: 'bolder',
          fontFamily: 'sans-serif',
          fontSize: 18,
        },
        show: true,
        position: 'left',
        offset: 0,
        boundaryGap: true,
        nameGap: 30,
        nameRotate: 90,
        axisLine: {
          show: true,
          onZero: true,
          symbol:'none',
          symbolSize:[10, 15]
        },
        axisTick:{
          show:true,
          length:5,
        },
        axisLabel:{
          show:true,
          rotate:0,
          margin:8,
          color: "#000000",
          fontStyle: "normal",
          fontWeight: 'bolder',
          fontFamily: 'sans-serif',
          fontSize: 12,
          verticalAlign:'auto',
        }
      },
      yAxisFormCopy: null,
      yAxisFormCopyClose: null,
      background_color:null,
    }
  },
  computed: {
    yAxis(){
      return JSON.parse(JSON.stringify(this.yAxisForm))
    }
  },
  methods: {
    handleOpen() {
      if (this.yAxisFormCopyClose === null) {
        this.yAxisFormCopy = JSON.parse(JSON.stringify(this.yAxisForm))
      }
      this.background_color = "#f4f4f4"
    },
    handleClose() {
      this.yAxisFormCopyClose = this.yAxisFormCopy
      this.background_color = null
    },
    change_yAxis_option() {
      this.$store.state.chart_option.option.yAxis = this.yAxisForm
      this.$store.commit("change_chart_time")
      console.log(this.$store.state.chart_option.option.yAxis)
    },
    get_symbolSize(value) {
      this.yAxisForm.axisLine.symbolSize[1] = value
    },
    change_color_name(color){
      this.yAxisForm.nameTextStyle.color = color
    },
    change_color_label(color){
      this.yAxisForm.axisLabel.color = color
    },
    resetForm() {
      this.yAxisForm = JSON.parse(JSON.stringify(this.yAxisFormCopy))
    }
  },
  created() {
    if (this.$store.state.chart_type === 'Heatmap'){
      this.yAxisForm.type = 'category'
      this.yAxisForm.name = null
      this.yAxisFormCopy = JSON.parse(JSON.stringify(this.yAxisForm))
    }
  },
  watch: {
    "yAxis": "change_yAxis_option",
    "$store.state.chart_type":"resetForm",
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
  /*align-items: center;*/
  /*justify-content: space-between;*/
  /*min-width: 280px;*/
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