<template>
  <div class="nav-bar">
    <nav-bar>
      <div class="left_slot" slot="left" @click="to_home">
        <img src="@/assets/img/log_white.svg" alt="">
      </div>
      <div class="right_slot" slot="right">
        <!--        登录框-->
        <before-login></before-login>

        <!--        用户基本信息框-->
        <after-login @exit="exit"></after-login>
      </div>
      <div class="mid_slot" slot="mid">
        <div v-for="item in home_items" :key="item['route']"
             @click="to_chart_page(item['route'])">
          {{ item['name'] }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import BeforeLogin from "./my_nav_bar_child/BeforeLogin";
import AfterLogin from "./my_nav_bar_child/AfterLogin";

// 退出登录的方法
import {toExit} from "../../../network/user_request";

export default {
  name: "MyNavBar",
  components: {
    NavBar,
    BeforeLogin,
    AfterLogin,
  },
  data() {
    return {
      home_items: [
          {route:'mainPage', name:'主页'},
          {route:'calcPage', name:'数据分析'},
          {route:'mplotPage', name:'静态图'},
          {route:'echartPage', name:'交互图'},
          {route:'3DPage', name:'3D图'},
      ]
    }
  },

  methods: {
    // 点击回到主页
    to_home() {
      this.$router.push({
        name: "mainPage"
      })
    },
    // 退出登陆
    exit() {
      toExit().then(() => {
        // 删除了cookie，然后刷新页面
        location.reload();
      })
    },
    // 点击选择画图类型，进入对应界面
    to_chart_page(route) {
      this.$router.push({
        name: route
      })
    }

  }
}
</script>

<style scoped>
.nav-bar {
  min-width: 1000px;
  background: var(--color-background);
  width: 100%;
}

.left_slot {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  align-items: stretch;
  cursor: pointer;
}

/*这下面的是右边的css*/
.right_slot {
  display: flex;
  /*flex-direction: column;*/
  justify-content: left;
  /*align-items: center;*/
  height: 100%;
  width: 100%;
  align-items: stretch;
  cursor: pointer;
}

.login_info div {
  width: 50%;
  margin-bottom: 15px;
}

.to_login p {
  size: 18px;
  color: white;
  cursor: pointer;
}

/*这下面的是中间的css*/
.mid_slot {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-family: 华文行楷 serif;
}

.mid_slot div {
  width: 10%;
  cursor: pointer;
  min-width: 100px;
}

.mid_slot div:hover{
  background-color: var(--color-tint);
  border-radius: 5px;
  opacity: 80%;
}
</style>