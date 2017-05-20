import Vue from 'vue'
import App from './App.vue'
//引入vue-simplemde markdown编辑器
import VueSimplemde from 'vue-simplemde'
//引入iview
import iview from 'iview'
import 'iview/dist/styles/iview.css';
//引入路由
import VueRouter from 'vue-router';
import { routes } from './routers';
import { store } from './store'
//引入axios
import axios from 'axios';
import VueAxios from 'vue-axios';

//导入echart图表
import IEcharts from 'vue-echarts-v3/src/full.vue';

Vue.use(iview);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueSimplemde)

// 进行路由的配置
const router = new VueRouter({
    routes,
    mode: 'history'
})


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})