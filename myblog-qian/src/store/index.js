import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        login:false
    },
    getters:{
        login:state=>{
            return state.login
        }
    },
    mutations:{
        checklogin:(state,payload)=>{
            state.login = payload;
        }
    },
    actions:{
        checklogin:({commit},payload)=>{
            commit('checklogin',payload);
        }
    }
})