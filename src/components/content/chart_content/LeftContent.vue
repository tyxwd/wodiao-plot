<template>
  <div class="left_content">
    <el-container>
      <el-aside width="240px">
        <div v-for="type in echart_types" :key="type.toString()" class="item" @click="show_chart(type['type'])">
<!--          <i class="iconfont icon-leidatu"></i>-->
          <i v-html="type['ico']"></i>
          <p>{{ type['chinese'] }}</p>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>

export default {
  name: "LeftContent",
  props: {
    echart_types: null,
  },
  methods: {
    show_chart(chart_type) {
      this.$router.push({
        name: chart_type
      })
      this.$store.commit("set_chart_type", chart_type)
    },
  }
}
</script>

<style scoped>
.left_content {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 6.5vh;
}

.el-container {
  height: 100%;
  min-width: 150px;
}

.el-aside {
  height: 100%;
  background: var(--color-background);
}

.item {
  height: 50px;
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  display: flex;
  align-items: center;
  color: rgb(246, 246, 246);
}

.item:hover {
  background: rgb(56, 65, 77);
}
</style>