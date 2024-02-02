import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueVideoPlayer from "vue-video-player";
import "video.js/dist/video-js.css";

import axios from "axios";
import global_ from "./config/Global"; // 这个路径是相对于main.js的相对路径,全局参数
// axios.defaults.baseURL = "http://localhost:";
axios.defaults.withCredentials = true;


Vue.prototype.$http = axios;

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueVideoPlayer);


const app = new Vue({
  router,
  store,
  render: (h) => h(App),
});

app.$mount("#app");

Vue.prototype.GLOBAL = global_;
