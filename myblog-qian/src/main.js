import Vue from 'vue'
import App from './App.vue'
//引入iview
import iview from 'iview'
import 'iview/dist/styles/iview.css';
//引入路由
import VueRouter from 'vue-router';
import { routes } from './routers'
//引入axios
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(iview);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

// 进行路由的配置
const router = new VueRouter({
    routes,
    mode: 'history'
})


new Vue({
    el: '#app',
    router,
    render: h => h(App)
})