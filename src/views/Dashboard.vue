<template>
  <v-container>
    <span><v-icon class="pl-2 pb-2">mdi-view-dashboard</v-icon> Dashboard</span>
    <!-- Dashboard section -->
    <v-row>
      <!-- <v-col lg="3" md="6" sm="12" cols="12">
        <DashCard
          title="0.00 บาท"
          subtitle="ยอดขายรายวัน"
          Cus_bg="success"
          Cus_icon="mdi-cash"
        />
      </v-col> -->
      <!-- <v-col lg="3" md="6" sm="12" cols="12">
        <DashCard
          title="18,000.00 บาท"
          subtitle="ยอดขายรายเดือน"
          Cus_bg="warning"
          Cus_icon="mdi-cash"
        />
      </v-col> -->
      <!-- <v-col lg="3" md="6" sm="12" cols="12">
        <DashCard
          title="180,000.00 บาท"
          subtitle="ยอดขายรายปี"
          Cus_bg="error"
          Cus_icon="mdi-cash-multiple"
        />
      </v-col> -->
      <!-- <v-col lg="3" md="6" sm="12" cols="12">
        <DashCard
          title="100 คน"
          subtitle="จำนวนลูกค้า"
          Cus_bg="primary"
          Cus_icon="mdi-account-multiple"
        />
      </v-col> -->
      <v-col lg="3" md="6" sm="12" cols="12">
        <v-card>
          <v-list-item two-line>
            <v-list-item-avatar  size="60" color="primary">
          <v-icon  color="white">mdi-cash</v-icon>
      </v-list-item-avatar>
            <v-list-item-content>
        <v-list-item-title v-for="(sumorderpay, index) in sumorderpay" :key="index">{{ sumorderpay.sumtotalpay | formatPrice }} บาท</v-list-item-title>
        <v-list-item-subtitle >ยอดขายทั้งหมด</v-list-item-subtitle>
      </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col lg="3" md="6" sm="12" cols="12">
        <v-card>
          <v-list-item two-line>
            <v-list-item-avatar  size="60" color="warning">
          <v-icon  color="white">mdi-file-document-multiple</v-icon>
      </v-list-item-avatar>
            <v-list-item-content>
        <v-list-item-title v-for="(CountPolicing, index) in CountPolicing" :key="index">{{CountPolicing.policingcount}} รายการ</v-list-item-title>
        <v-list-item-subtitle >จำนวนรายการตรวจทั้งหมด</v-list-item-subtitle>
      </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col lg="3" md="6" sm="12" cols="12">
        <v-card>
          <v-list-item two-line>
            <v-list-item-avatar  size="60" color="success">
          <v-icon  color="white">mdi-pill-multiple</v-icon>
      </v-list-item-avatar>
            <v-list-item-content>
        <v-list-item-title v-for="(countDrugs, index) in countDrugs" :key="index">{{countDrugs.drugcount}} รายการ</v-list-item-title>
        <v-list-item-subtitle >จำนวนยาทั้งหมด</v-list-item-subtitle>
      </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col lg="3" md="6" sm="12" cols="12">
        <v-card>
          <v-list-item two-line>
            <v-list-item-avatar  size="60" color="error">
          <v-icon  color="white">mdi-account-multiple</v-icon>
      </v-list-item-avatar>
            <v-list-item-content>
        <v-list-item-title v-for="(countData, index) in countData" :key="index">{{countData.customercount}} คน</v-list-item-title>
        <v-list-item-subtitle >จำนวนลูกค้า</v-list-item-subtitle>
      </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-container>
      <v-row>
        <!-- <v-col lg="6" md="6" sm="12" cols="12">
          <v-card class="mx-5 pa-5">
            <span>จำนวนลูกค้า(คน)</span>
            <apexchart
              width="500"
              type="bar"
              :options="options"
              :series="series"
            ></apexchart>
          </v-card>
        </v-col> -->

        <v-col
        cols="12"
        md="6"
      >
        <v-card
          color="silver"
          class="px-5 py-3"
        >
          <span>
            <h2>
              สถิติลูกค้า
            </h2>

            <h3>
              ลูกค้าที่เพิ่มเข้ามาล่าสุด
            </h3>
          </span>
          
          <v-card-text >
            <v-data-table
              :headers="headers"
              :items-per-page="5"
              :items="customerData"
              
            >
              <template v-slot:[`item.datalist`]="{ item }">
                {{ customerData.indexOf(item) + 1 }}
              </template>
              <template v-slot:[`item.customer_image`]="{ item }">
          <td>
            <v-avatar size="40">
              <v-img
                :src="item.customer_image | imageUrl"
                lazy-src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                aspect-ratio="1"
                max-width="50"
                max-height="50"
              ></v-img>
            </v-avatar>
          </td>
        </template>
              <template v-slot:[`item.customer_fullname`]= "{ item}">
             {{ item.customer_fname}} {{item.customer_lname}}
               </template>
               <template v-slot:[`item.customer_gender`]="{ item }">
          <v-chip
            color="primary"
            small
            class="text-white"
            label
            v-if="item.customer_gender == 'ชาย'"
          >
            <v-icon left class="text-white">mdi-gender-male</v-icon>
            ชาย
          </v-chip>
          <v-chip color="warnwarn" class="text-white" small label v-else>
            <v-icon left class="text-white">mdi-gender-female</v-icon>
            หญิง</v-chip
          >
        </template>
        <template v-slot:[`item.createdAt`]="{ item }">
          {{ item.createdAt | sumdate }}
        </template>
              
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

        <v-col lg="6" md="6" sm="12" cols="12">
          <v-card class="mx-5 pa-5">
            <span>ยอดขาย(บาท)</span>
            <apexchart
              width="500"
              type="bar"
              :options="options1"
              :series="series1"
            ></apexchart>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>



<script>
import {  formatPrice,sumdate } from "@/components/hooks/filter";
import api from "@/services/api";
import VueApexCharts from "vue-apexcharts";
import DashCard from "@/components/cards/DashCard";
export default {
  name: "Dashboard",
  data() {
    return {
      // customerall:{
      //   customerall:""
      // },
      // customer_fname: {
      //   customer_fname: "",
      // },
      customerData:[],
      countData:[],
      countDrugs:[],
      CountPolicing:[],
      sumorderpay:[],
      customercount: "",
      headers: [
        { text: "#", value: "datalist"  ,class:"blue lighten-5"},
        {
          text: "รูปภาพ",
          value: "customer_image",
          class:"blue lighten-5"
        },
        {
          text: "ชื่อ-นามสกุล",
          value: "customer_fullname",
          class:"blue lighten-5"
        },
        {
          text: "เพศ",
          value: "customer_gender",
          class:"blue lighten-5"
        },
        {
          text: "วันที่เพิ่ม",
          value: "createdAt",
          class:"blue lighten-5"
        },
      ],
      // customerData: {},
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [
            "ม.ค",
            "ก.พ.",
            "มี.ค",
            "เม.ย.",
            "พ.ค.",
            "ก.ค.",
            "ส.ค.",
            "ก.ย.",
            "ต.ค.",
            "พ.ย.",
            "ธ.ค.",
          ],
        },
      },
      series: [
        {
          name: "จำนวนลูกค้า(คน)",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0],
        },
      ],
      options1: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [
            "ม.ค",
            "ก.พ.",
            "มี.ค",
            "เม.ย.",
            "พ.ค.",
            "ก.ค.",
            "ส.ค.",
            "ก.ย.",
            "ต.ค.",
            "พ.ย.",
            "ธ.ค.",
          ],
        },
      },
      series1: [
        {
          name: "บาท(k)",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 900, 1500, 0],
        },
      ],
      // series1:[],
    };
  },
  methods: {
    async getCountCustomer() {
      let data = await api.getCountCustomers();
      this.countData = data.data; 
    },
    async getDrugCount() {
      let data = await api.getCountDrug();
      this.countDrugs = data.data; 
    },
    async getCustomer() {
      let data = await api.getCustomers();
      this.customerData = data.data;
    },
    async getCountPolicing(){
      let data = await api.getCountPolicings();
      this.CountPolicing = data.data;
    },
    async getSumOrderPay(){
      let data = await api.getSumPays();
      this.sumorderpay = data.data;
    },
    // async getCustomer(){
    //   let data = await api.getCustomers();
    //   this.customerData = data.data
    // },
  },
  async mounted() {
    this.getCountCustomer();
    this.getCustomer();
    this.getDrugCount();
    this.getCountPolicing();
    this.getSumOrderPay();
    // this.getCustomer();
  },
  components: {
    DashCard,
  },
  filters: {
    formatPrice,
    sumdate,
  },
};
</script>

<style>
</style>