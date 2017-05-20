import Vue from 'vue'
import App from './App.vue' 
//引入iview
import iview from 'iview'
import 'iview/dist/styles/iview.css';
//引入路由
import VueRouter from 'vue-router';
import {routes} from './routers'
import {store} from './store'
//引入axios
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSimplemde from 'vue-simplemde'
import IEcharts from 'vue-echarts-v3/src/full.vue';


Vue.use(iview);
Vue.use(VueRouter);
Vue.use(VueAxios,axios);
Vue.use(VueSimplemde);

const router=new VueRouter({
  routes,
  mode:'history'
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
