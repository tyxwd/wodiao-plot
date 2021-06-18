<template>
  <div class="chart_content">
    <!--    上方表头-->
    <div class="chart_name">
      <div class="title">{{ chart_name }}</div>
      <div class="info"><p>{{chart_introduce}}</p></div>
      <div class="blank"></div>
      <div class="icon">
        <el-tooltip class="item" effect="dark" content="  下载  " placement="bottom" @click.native="download">
          <i class="el-icon-download" style="font-size: 20px"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="  收藏  " placement="bottom">
          <i class="el-icon-star-off" style="font-size: 20px"></i>
        </el-tooltip>
      </div>
    </div>
    <div class="chart_body">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChartContent",
  components: {},
  props: {
    echart_types: null
  },
  data() {
    return {
      chart_name: null,
      chart_introduce: null,
    }
  },
  computed: {},
  methods: {
    show_info() {
      if (this.echart_types !== null) {
        this.chart_name = this.echart_types[this.$store.state.chart_type]['chinese']
        this.chart_introduce = this.echart_types[this.$store.state.chart_type]['info']
      }
    },
    download() {
      this.$confirm('你还是先自己截图吧', '这里还没写完')
    }
  },
  watch: {
    "$store.state.chart_type": 'show_info'

  }
}
</script>

<style scoped>
.chart_name {
  margin-top: 15px;
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 15px;
  border-bottom: rgb(225, 225, 225) 1px solid;
  display: flex;
  justify-content: space-between;
}
.title{
  flex: 3;
  font-size: 20px;
  font-family: 华文行楷 serif;
  font-weight: 700;
  color: rgba(0, 0, 0, .8);
}
.info{
  flex: 10;
  display: flex;
  align-items: flex-end;
}
.blank{
  flex:0.8;
}
.icon {
  flex: 1.2;
  /*width: 8%;*/
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart_name > * {
  cursor: pointer;
}

.chart_body {
  height: calc(100% - 30px - 20px);
  /*!*width: 90%;*!*/
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
}
</style>