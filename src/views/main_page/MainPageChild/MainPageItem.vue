<template>
  <div>
    <item-title></item-title>
    <div class="body">
      <item-left></item-left>
      <div class="blank"></div>
      <item-right></item-right>
    </div>
  </div>

</template>

<script>
import ItemTitle from "@/views/main_page/MainPageChild/main_page_item_child/ItemTitle";
import ItemLeft from "@/views/main_page/MainPageChild/main_page_item_child/ItemLeft";
import ItemRight from "@/views/main_page/MainPageChild/main_page_item_child/ItemRight";

export default {
  name: "MainPageItem",
  components: {
    ItemTitle,
    ItemLeft,
    ItemRight
  }
}
</script>

<style scoped>
.body {
  width: var(--main-width);
  margin-left: var(--margin-left);
  display: flex;
  margin-top: 10px;
  margin-bottom: 20px;
  min-width: 1000px;
  /*min-height: 800px;*/
}

.blank{
  flex: 1;
}

.title_item span {
  margin-left: 8px;
  margin-right: 8px;
}

</style>