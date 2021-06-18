<template>
  <div id="app">
    <my-nav-bar class="my_nav_bar"></my-nav-bar>
    <div class="fake_nav_bar"></div>
    <!--页面创建完成后，转到其他页面，返回后不销毁-->
    <!--    <keep-alive exclude="Detail">-->
    <router-view/>
    <!--    </keep-alive>-->
    <!--    <bottom-info></bottom-info>-->
  </div>
</template>

<script>
import MyNavBar from "@/components/content/navbar/MyNavBar";

import {getUserInfo} from "./network/user_request";
// import BottomInfo from "@/components/content/bottom_infos/BottomInfo";
export default {
  name: 'App',
  components: {
    MyNavBar,
    // BottomInfo
  },
  methods: {
    // 重新请求user_info:
    get_user_info() {
      getUserInfo().then(res => {
        this.$store.state.user = {
          username: res["user_info"]["username"],
          uuid: res["user_info"]["uuid"],
          login: true,
        };
        this.$store.state.user_info = res["user_info"]
        this.$store.state.login = true
      })
    }
  },
  mounted() {
    this.get_user_info()
  }

}
</script>


<style>
@import "./assets/css/base.css";

body {
  /*只有在这里加才不会出现水平滚动条*/
  margin: 0;
  padding: 0;
  /*overflow-x: hidden;*/
}

.my_nav_bar {
  background-color: var(--color-background);
  /*字体颜色*/
  color: #f6f6f6;

  /*下面两自己调的*/
  font-family: "Adobe Hebrew", serif;
  font-size: 20px;

  /*固定Home_bar在最顶部*/
  position: fixed;
  left: 0;
  right: 0;
  top: 0;

  /*可能是显示在上层*/
  z-index: 9;
}

.fake_nav_bar {
  height: 6.5vh;
  width: 100%;
}
</style>



