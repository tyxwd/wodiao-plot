<template>
  <el-table
      :data="table_data"
      border
      max-height="180">
    <el-table-column v-for="col in table_label" :key="col" :prop="col" :label="col" width="130"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "DataTable",
  props: {
    table_label:null,
    table_data:null,
  },
}
</script>

<style scoped>
.el-table {
  /*width: 100%;*/
  /*height: 100%;*/
  /*overflow: auto;*/
}
</style>