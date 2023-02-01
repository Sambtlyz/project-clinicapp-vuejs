import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue2Filters from "vue2-filters";
import { imageUrl } from "@/services/constants";
import moment from 'moment';
import VueApexCharts from 'vue-apexcharts';
import {jsPDF}  from "jspdf"

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  jsPDF,
  render: (h) => h(App),
}).$mount("#app");

// Vue.use(Vue2Filters);
// Vue.filter("imageUrl", function(image) {
//   return `${imageUrl}/${image}?timestamp=${Date.now()}`; // เพื่อเปลี่ยน Url ของรูปไม่ให้มันซ้ำกัน ?timestamp เพื่อแก้ปัญหาเรื่อง catching
// });

Vue.use(Vue2Filters);
Vue.filter("imageUrl", function(customer_image) {
  return `${imageUrl}/${customer_image}?timestamp=${Date.now()}`; // เพื่อเปลี่ยน Url ของรูปไม่ให้มันซ้ำกัน ?timestamp เพื่อแก้ปัญหาเรื่อง catching
});

Vue.filter('formatDate', function(value) {
  if (value) {
      return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
});


Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)