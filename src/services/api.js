import { server } from "@/services/constants";
import router from "@/router";
import httpClient from "@/services/httpClient";
import * as customerApis from "@/services/api_customer.js"  // เรียกใช้ฟังก์ชั่นทั้งหมดของ api_customer
import * as drugApis from "@/services/api_drug.js"  // เรียกใช้ฟังก์ชั่นทั้งหมดของ api_customer
import * as policingApis from "@/services/api_policing.js"
import * as policingtypeApis from "@/services/api_policingtype.js"
import * as drugtypeApis from "@/services/api_drugtype.js"
import * as opdApis from "@/services/api_opd.js"
import * as qpolicing from "@/services/api_qpolicing.js"
import * as roomadd from "@/services/api_roomadd.js"
import * as role from "@/services/api_role.js"
import * as policing_temp from "@/services/api_policing_temp.js"
import * as order from "@/services/api_order.js"
import * as orderpay from "@/services/api_orderpay.js"
import * as appointment from "@/services/api_appointment.js"



 const getUsers = () => {
  return httpClient.get(server.LOGIN_URL)
};

const updatePassword = data => {
  return httpClient.put(server.CHAGEPASSWORD_URL , data)
};

// const getUserprofile = user_id => {
//   return httpClient.get(server.PROFILE_URL + `/uer_id/${user_id}`)
// };

const getUserByID = user_id =>{
  return httpClient.get(server.LOGIN_URL + `/user_id/${user_id}`)
}



// check token login
const isLoggedIn = () => {
  let token = localStorage.getItem(server.TOKEN_KEY);
  return token != null;
};

// const login = async (values) => {
//   let result = await httpClient.post(server.LOGIN_URL, values);
//   alert(JSON.stringify(result));
// };

// localstorage check login
// const login = async (values) => {
//   let result = await httpClient.post(server.LOGIN_URL, values);
//   if (result.data.result == "ok") {
//     localStorage.setItem(server.USERNAME, values.username);
//     localStorage.setItem(server.TOKEN_KEY, result.data.token);
//     router.push("/customer");
//   } else {
//     alert(JSON.stringify(result));
//   }
// };

const login = async values => {
    let result = await httpClient.post(server.LOGIN_URL, values);
    if (result.data.result == "ok") {
      localStorage.setItem(server.USERNAME, values.username);
      localStorage.setItem(server.TOKEN_KEY, result.data.token);
      router.push("/dashboard");
      alert('เข้าสู่ระบบสำเร็จ')
      return true;
    } else if (result.data.result == "not") {
      alert(result.data.message)
    }{
      return false;
    } 
  };

const register = async (values) => {
  let result = await httpClient.post(server.REGISTER_URL, values);
  if (result.data.result == "not") {
    alert('เพิ่มข้อมูลสำเร็จ')
    router.go('/setting')
  } else {
    alert(JSON.stringify(result));
  }
};

// const login =  values => {
//  localStorage.setItem(server.USERNAME, values.username);
//  localStorage.setItem(server.TOKEN_KEY, "test_token");
//  return true;
// };

// clear token
const logoff = () => {
  localStorage.removeItem(server.TOKEN_KEY, "");
  router.push("/login");
};

export default {
  isLoggedIn,
  login,
  logoff,
  register,
  getUsers,
  // getUserprofile,
  getUserByID,
  updatePassword,
  ...customerApis , // ... หมายถึงตัวแปรทั้งหมดที่เรียกใช้เลย
  ...drugApis ,
  ...policingApis,
  ...drugtypeApis,
  ...opdApis,
  ...policingtypeApis,
  ...qpolicing,
  ...roomadd,
  ...role,
  ...policing_temp,
  ...order,
  ...orderpay,
  ...appointment,
};
