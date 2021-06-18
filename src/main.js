import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/css/alicdn.css"

// Carousel：走马灯；
import {Carousel,  CarouselItem, Upload, Drawer} from 'view-design';
Vue.component('Carousel', Carousel);
Vue.component('CarouselItem', CarouselItem);
Vue.component('Upload', Upload);
Vue.component('Drawer', Drawer);
import 'view-design/dist/styles/iview.css';

// 导入前端路由规则
import router from "./router";
// vuex保存的登录状态，用户信息等，所有页面共享；用this.$store获取
import store from "./store";

Vue.use(ElementUI)
// Vue.use(ViewUI)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
