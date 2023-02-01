import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

import Dashboard from "@/views/Dashboard";
import Report from "@/views/Report.vue";
import About from "@/views/About.vue";
import AdminLogin from "@/views/AdminLogin.vue";
import Appointment from "@/views/Appointment";

// การตรวจ
import Checkq from "@/views/roomcheck/Checkq";
import Roomcheck from "@/views/roomcheck/Roomcheck";
import Testlist from "@/views/roomcheck/testlist";
import CheckqAdd from "@/views/roomcheck/CheckqAdd"
import Checkqold from "@/views/roomcheck/Checkqold";
import roomadd from "@/views/roomcheck/roomadd";


//customer ลูกค้า
import CustomerEdit from "@/views/customer/CustomerEdit";
import Customer from "@/views/customer/Customer.vue";
import CustomerOpd from "@/views/customer/CustomerOpd.vue";

//drug ยา
import Drug from "@/views/drug/Drug";
import Drugtype from "@/views/drug/Drugtype";
import DrugEdit from "@/components/cards/DrugEdit.vue";
import DrugAdd from "@/components/cards/DrugAdd.vue";
import DrugtypeEdit from "@/views/drug/DrugtypeEdit.vue";

//policing การตรวจ
import Policing from "@/views/policing/Policing";
import PolicingEdit from "@/views/policing/PolicingEdit";
import PolicingType from "@/views/policing/PolicingType";
import PolicingTypeEdit from "@/views/policing/PolicingTypeEdit";

import Edituser from "@/views/pagesetting/Edituser"
import Settings from "@/views/pagesetting/Settings";
import Profile from "@/views/Profile";

import api from "@/services/api";


//Receipt ใบเสร็จ
import Receipt from "@/views/receipt/Receipt";
import ReceiptEdit from "@/views/receipt/ReceiptEdit";
import Invoice from "@/views/receipt/Invoice";


Vue.use(VueRouter);


const routes = [
  {
    path: "/login",
    name: "login", // เรียกใช้ route ที่เป็นชื่อ name และ path ก็ได้
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard

  },
  {
    path: "/customer",    
    name: "customer",
    beforeEnter: (to, from, next)=>{
      let token = api.isLoggedIn()
        if(token == false){
          next('/login')
        } else {
          next();
        }
      },
    component: Customer
  },
  {
    path: "/customer-opd/:customer_id_pri",    
    name: "customer-opd",
    component: CustomerOpd
  },
  {
    path: "/customer-edit/:customer_id_pri",    
    name: "customer-edit",
    component: CustomerEdit
  },
  {
    path: "/drugadd",    
    name: "drugadd",
    component: DrugAdd
  },
  {
    path: "/drugtype",
    name: "drugtype",
    component: Drugtype
  },
  {
    path: "/drugedit/:drug_id_pri",    
    name: "drugedit",
    component: DrugEdit
  },
  {
    path: "/drugtype-edit/:drugtype_id",    
    name: "drugtyp-edit",
    component: DrugtypeEdit
  },
  {
    path: "/policing",    
    name: "policing",
    component: Policing
  },
  {
    path: "/policingedit/:policing_id_pri",    
    name: "policingedit",
    component: PolicingEdit
  },
  {
    path: "/policingtype",
    name: "policingtype",
    component: PolicingType
  },
  {
    path: "/policingtype-edit/:policingtype_id",
    name: "policingtype-edit",
    component: PolicingTypeEdit
  },
  {
    path: "/appointment",
    name: "appointment",
    component: Appointment
  },
  {
    path: "/checkqadd",
    name: "checkqadd",
    component: CheckqAdd
  },
  {
  path: "/checkq",
  name: "checkq",
  component: Checkq
  },
  {
    path: "/roomadd",
    name: "roomadd",
    component: roomadd
  },
  {
    path: "/checkqold",
    name: "checkqold",
    component: Checkqold
  },
  
  {
    path: "/roomcheck/:opd_id", // อันเดิม
    name: "roomcheck",
    component: Roomcheck
  },
  // {
  //     path: "/roomcheck/:customer_id_pri", // ใหม่
  //     name: "roomcheck",
  //     component: Roomcheck
  //   },
  {
    path: "/testlist",
    name: "testlist",
    component: Testlist
  },
  // {
  //     path: "/roomcheck/", 
  //     name: "roomcheck",
  //     component: Roomcheck
  //   },
  // {
  //     path: "/roomcheck/:customer_id_pri",
  //     name: "roomcheck",
  //     component: Roomcheck
  //   },
  
  // ใบเสร็จ
  {
    path: "/receipt",
    name: "receipt",
    component: Receipt
  },
  {
    path: "/receiptedit/:customer_id_pri",
    name: "receiptedit",
    component: ReceiptEdit
  },
  {
    path: "/invoice/:customer_id_pri",
    name: "invoice",
    component: Invoice
  },
  // {
  //   path: "/CustomerCard",
  //   name: "customercard",
  //   component: CustomerCard 
  // },
  {
    path: "/drug",
    name: "drug",
    component: Drug 
  },

  {
    path: "/report/:customer_id_pri",
    // meta: { isSecured: true },
    name: "report",
    component: Report
  },
  {
    path: "/about",
    meta: { isSecured: false }, //meta คือ route แบบ private คนทั่วไปเข้าไม่ได้ถ้ายังไม่ล้อคอิน
    name: "about",
    component: About
  },
  {
    path: "/edituser/:user_id",
    name: "edituser",
    component: Edituser
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile
  },
  {
    path: "/setting",
    name: "setting",
    component: Settings
  },
  {
    path: "/adminlogin",
    name: "/adminlogin",
    component: AdminLogin
  },
  // Path Default  
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "*", // ดัก error ของ path เพื่อที่จะ redirect ไปยังหน้า login
    redirect: "/login"
  },
  
  
];

// router.beforeEnter: (to, from, next)=>{
//   let token = api.isLoggedIn()
//     if(token == false){
//       next('/login')
//     } else {
//       next();
//     }
//   },
  

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
