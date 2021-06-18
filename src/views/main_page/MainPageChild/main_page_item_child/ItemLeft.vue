<template>
  <div class="item_left">
    <!--      番剧动态，左边的图片和文字介绍；-->
    <div class="function_items">
      <div class="function_item" v-for="item in function_infos" :key="item">
        <div class="img_item"><img :src="item['url']" alt=""></div>
        <div class="function_name">
          <div>{{ item["title"] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemLeft",
  data() {
    return {
      function_group: "番剧动态",
      function_infos: [
        {
          title: "美丽新世界1dfgasgsgasghashhsgsgasd拉萨的肌肤撒旦减肥啦圣诞节；发生的",
          url: "http://8.135.98.41:80/static/init_img/404.png",
        },
        {
          title: "美丽新世界1dfgasgsgasghashhsgsgasd拉萨的肌肤撒旦减肥啦圣诞节；发生的",
          url: "http://8.135.98.41:80/static/init_img/PCA_img.png",
        },
        {
          title: "美丽新世界2",
          url: "http://8.135.98.41:80/static/init_img/PCA_img.png",
        },
        {
          title: "美丽新世界3",
          url: "http://8.135.98.41:80/static/init_img/404.png",
        },
        {
          title: "美丽新世界4",
          url: "http://8.135.98.41:80/static/init_img/404.png",
        },
        {
          title: "美丽新世界5",
          url: "http://8.135.98.41:80/static/init_img/404.png",
        },
      ],
    }
  }
}
</script>

<style scoped>

.item_left {
  flex: 10;
  width: 100%;
  display: flex;
  flex-direction: column;
  /*min-width: 1200px;*/
}


.function_items {
  /*flex: 80;*/
  width: 100%;
  height: 72vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-around;
}

.function_item {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.function_name {
  flex: 2;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: var(--font-size);
}

.img_item {
  flex: 12;
  width: 100%;
  border-radius: 5px;
  box-shadow: -2px 0px 2px 1px #ececec, 0px -2px 2px 1px #ececec, 2px 0px 2px 1px #ececec, 0px 2px 2px 1px #ececec;
  display: flex;
}

.img_item img {
  width: 100%;
}
</style>