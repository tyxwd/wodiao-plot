<template>
  <el-menu default-active="1" class="el-menu-vertical-demo"
           @open="handleOpen" @close="handleClose" :background-color="background_color">
    <el-submenu>
      <template slot="title"><i class="el-icon-s-operation"></i><span class="title_span">个性化</span></template>
      <el-form ref="bodyForm" :model="bodyForm" label-position="right" label-width="80px" size="small">
        <el-form-item label="调整对象">
          <el-select v-model="bodyForm.object_index" placeholder="请选择调整对象">
            <el-option v-for="(item, index) in object_list"
                       :key="item" :label="item.name" :value="index - 1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="线条颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.lineStyle.color"></el-input>
            <el-color-picker v-model="bodyForm.lineStyle.color" @active-change="change_color_line"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="透明度">
          <el-slider v-model="bodyForm.lineStyle.opacity" :min="0" :max="1" :step="0.01"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="线条粗细">
          <el-slider v-model="bodyForm.lineStyle.width" :min="0" :max="20" :step="0.5"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="线条样式">
          <el-select v-model="bodyForm.lineStyle.type" placeholder="请选择线条样式">
            <el-option
                v-for="item in ['solid','dashed','dotted']"
                :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="线条平滑">
          <el-slider v-model="bodyForm.smooth" :min="0" :max="1" :step="0.01"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="线条阴影">
          <el-slider v-model="bodyForm.lineStyle.shadowBlur" :min="0" :max="100" :step="1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="阴影颜色">
          <div class="form_item">
            <el-input prefix-icon="iconfont icon-huitutiaosepan" v-model="bodyForm.lineStyle.shadowColor"></el-input>
            <el-color-picker v-model="bodyForm.lineStyle.shadowColor"
                             @active-change="change_shadowColor"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="阴影偏移X">
          <el-slider v-model="bodyForm.lineStyle.shadowOffsetX" :min="-20" :max="20" :step="0.1"
                     show-input class="font_size"></el-slider>
        </el-form-item>
        <el-form-item label="阴影偏移Y">
          <el-slider v-model="bodyForm.lineStyle.shadowOffsetY" :min="-20" :max="20" :step="0.1"
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
  name: "ParallelBody",
  data() {
    return {
      object_list: [], // series中有多少对象；共几组。
      bodyForm: {
        object_index: "all", //'如果值是-1，则全部调整'
        lineStyle: {
          color: null,//不知道为什么不行；
          opacity: 1,
          width: 1,
          type:'solid',
          shadowBlur: 0,
          shadowColor: "#000",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
        },
        smooth:0,
      },
      bodyFormCopy: null,
      bodyFormCopyClose: null,
      background_color: null,
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
      if (this.bodyForm.object_index === -1 || this.bodyForm.object_index === 'all') {
        for (let index = 0; index < this.object_list.length -1; index++) {
          this.$store.state.chart_option.option.series[index] = JSON.parse(JSON.stringify(this.bodyForm))
        }
      } else {
        this.$store.state.chart_option.option.series[this.bodyForm.object_index] = JSON.parse(JSON.stringify(this.bodyForm))
      }
      this.$store.commit("change_chart_time")
    },
    change_color_line(color) {
      this.bodyForm.lineStyle.color = color
      this.change_body_option()
    },
    change_shadowColor(color) {
      this.bodyForm.lineStyle.shadowColor = color
    },
    resetForm() {
      this.bodyForm = JSON.parse(JSON.stringify(this.bodyFormCopy))
    }
  },
  created() {
    this.object_list = [{name: 'all'}].concat(this.$store.state.chart_option.option.series)
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