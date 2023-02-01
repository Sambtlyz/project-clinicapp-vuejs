import api from "@/services/api";
import { server } from "@/services/constants";
import axios from "axios";
// import { server } from "@/services/constants";


export  const   doLogin =  async ({ commit, dispatch } , { username, password })   =>  {

    let result = await api.login({ username, password });
      if (result == true) {
        commit("SET_LOGGED_IN"); //check if else เรียกใช้ mutations โดยตัวแปร commmit
        commit("SET_USERNAME", username);
      } else {
        dispatch("doLogout", {}); //ถ้า login ไม่สำเร็จเรียกตัวเเปร dispatch mutation Logout
      }
}

export const restoreLogin = ({ commit }) =>{
    if (api.isLoggedIn() == true) {
              let username = localStorage.getItem(server.USERNAME)
              commit("SET_LOGGED_IN");
              commit("SET_USERNAME",username);
              }
}

export const doLogout = ({ commit }) => {
          api.logoff();
          commit("SET_LOGGED_OUT");
          commit("SET_USERNAME", ""); // clear ค่า
}

export const udpate_status_edit_user = ({ commit } , payload) =>{
    commit("set_status_edit_user", payload);
}

export const opdCode = ({ commit }) =>{
    api.getCustomerById();
    commit("SET_OPDCODE", )
}

export const getqpolicingData = ({ commit , payload } ) => {
  api.getqPolicing();
  commit ("SET_QPOLICINGDATA" , payload )
}

 export  const  addOrderCart = async  ({commit}, {order,quantity})=>{
  commit('ADD_TO_CART', {order,quantity})

  // axios.post('http://localhost:8081/api/v2/order'), {
  //   order: this.order,
  //   quantity
  // }
  
}

export  const  addPayment = async  ({commit}, {orderpay})=>{
  commit('ADD_TO_PAYMENT', {orderpay})
}

export const removeOrderCart =  ({commit}, order) =>{
  commit('REMOVE_ORDER_CART' , order);

}