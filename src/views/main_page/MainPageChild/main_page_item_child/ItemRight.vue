<template>
  <!--      排行榜-->
  <div class="item_right">
    <div class="rank_item" v-for="(item, index) in function_ranks" :key="item">
      <div class="index">{{index + 1}}</div>
      <div class="function">{{item["function"]}}</div>
      <div class="store"><div>{{item["stores"]}}</div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemRight",
  data() {
    return {
      function_ranks:[
        {
          function:"PCA",
          stores:10,
        },
        {
          function:"NMDS",
          stores:9,
        },
        {
          function:"Line",
          stores:7,
        },
        {
          function:"PCA",
          stores:10,
        },
        {
          function:"NMDS1",
          stores:9,
        },
        {
          function:"Line1",
          stores:7,
        },
      ]
    }
  }
}
</script>

<style scoped>
.item_right {
  flex: 4;
  display: flex;
  flex-direction: column;
}
.rank_item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10%;
}

.index{
  flex: 1;
}
.function{
  flex: 10;
  cursor: pointer;
}
.store{
  flex: 2;
  cursor: pointer;
  display: flex;
  /*align-items: center;*/
  justify-content: flex-end;
}
</style>