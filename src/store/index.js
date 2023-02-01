import Vue from "vue";
import Vuex from "vuex";
// import api from "@/services/api";
// import { server } from "@/services/constants";
// import axios from "axios";


Vue.use(Vuex);

import state from "./state"
import * as actions from "./actions"
import * as mutations from "./mutations"
import * as getters from "./getters"




export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,

 

});

// export default new Vuex.Store({
//   // การจำกัดการเข้าถึงข้อมูล state
//   state: {
//     isLogged: false,
//     username:"",
//     name:"",
//     data_edit_user: {},
//     qpolicing: null,
//   },
//   // check login username โดย get component
//   getters: {
//     isLogin(state){
//       return state.isLogged;
//     },
//     username(state){
//       // return "สวัสดี"+"คุณ " + state.username;
//       return  state.username;
//     } 
//   },
//   mutations: {
//     SET_LOGGED_IN(state){
//       state.isLogged = true //อ้างถึงตัวแปร state ให้เป็น true
//     },
//     SET_LOGGED_OUT(state) {
//       state.isLogged = false; //อ้างถึงตัวแปร state ให้เป็น false
//     },
//     SET_USERNAME(state, value){
//       state.username = value
//     },
//     set_status_edit_user(state, payload) {
//       state.data_edit_user = payload;
//     },
//     SET_OPDCODE(state, qpolicing){
//       state.qpolicing = qpolicing;
//     }
//   },
//   actions: {
//      async doLogin({ commit, dispatch }, { username, password }) {
//       let result = await api.login({ username, password });
//       if (result == true) {
//         commit("SET_LOGGED_IN"); //check if else เรียกใช้ mutations โดยตัวแปร commmit
//         commit("SET_USERNAME", username);
//       } else {
//         dispatch("doLogout", {}); //ถ้า login ไม่สำเร็จเรียกตัวเเปร dispatch mutation Logout
//       }
//     },
//     restoreLogin({commit}){
//       if (api.isLoggedIn() == true) {
//       let username = localStorage.getItem(server.USERNAME)
//       commit("SET_LOGGED_IN");
//       commit("SET_USERNAME",username);
//       }
//     },
//     doLogout({ commit }) {
//       api.logoff();
//       commit("SET_LOGGED_OUT");
//       commit("SET_USERNAME", ""); // clear ค่า
//     },
//     udpate_status_edit_user({ commit }, payload) {
//       commit("set_status_edit_user", payload);
//     },
//     opdCode({ commit }) {
//       api.getqPolicing();
//       commit("SET_OPDCODE", )
//     }
//   },
//   modules: {},
// });
