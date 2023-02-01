<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <span><v-icon class="pl-2">mdi-doctor</v-icon>รายการใบเสร็จ</span>
      <v-data-table :search="search" :headers="headers" :items="mDataArray">
        <!-- top section -->
        <template v-slot:top>
          <v-toolbar flat>
            <v-col cols="12" md="2">
              <v-text-field
                v-model="search"
                name="search"
                label="ค้นหาด้วยเลขทีใบเสร็จ"
                prepend-icon="search"
                dense
                outlined
                hide-details=""
              ></v-text-field>
            </v-col>
            <!-- <v-col cols="12" md="2">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                 <v-text-field
                    v-model="date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    dense
                    outlined
                    class="pt-6"
                  >
                 <template v-slot:append>
              <v-tooltip color="#212121" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    
                    >mdi-calendar-blank</v-icon
                  >
                </template>
                <span class="set-font-kanit">วันที่ทั้งหมด</span>
              </v-tooltip>
            </template>
            </v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable locale="th">
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" >
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col> -->

            <!-- <v-col cols="12" md="2">
              <v-select
                :items="items"
                placeholder="สถานะ"
                solo
                dense
                class="pt-6"
              ></v-select>
            </v-col> -->
            <v-spacer></v-spacer>
           
          </v-toolbar>
        </template>

    

        <template v-slot:[`item.orderlist`]="{ item }">
          {{ mDataArray.indexOf(item) + 1 }}
        </template>

       
       

        <!-- สถานะ -->
        <template v-slot:[`item.order_check`]="{ item }">
          <v-chip
            color="success"
            small
            class="text-white"
            label
            v-if="item.order_check == 'undefined'"
          >
            <v-icon left class="text-white">mdi-check</v-icon>
            เสร็จสิ้น
          </v-chip>
          <v-chip color="warning" class="text-white" small label v-else>
            <v-icon left class="text-white">mdi-clock</v-icon>
            รอชำระ</v-chip
          >
        </template> 

        <template v-slot:[`item.customer_fullname`]= "{ item}">
          {{ item.customer_fname}} {{item.customer_lname}}
        </template>

        <template v-slot:[`item.opd_date`]="{ item }">
          {{ item.opd_date | sumdate}}
        </template>

        <!-- เพิ่มเติม -->
       <template v-slot:[`item.options`]= "{item}" >
          <!-- <v-chip color="info" >
            <span class="material-icons">done</span>ทำรายการ</v-chip>
          <v-chip color="info" >
            <span class="material-icons">receipt</span>พิมใบเสร็จ</v-chip
          > -->
          <v-chip color="info"  small @click="payment(item, item.order_check ? '0' : '0')"  :disabled=" item.order_check== 'undefined'" 
            > <v-icon class="mr-1" >done</v-icon>ชำระ {{ item.options}}</v-chip
          >
          <v-chip color="info"  small @click="paymentEdit(item, item.order_check ? '0' : '0')"  :disabled=" item.order_check== 'undefined'" 
            > <v-icon class="mr-1" >done</v-icon>แก้ไข {{ item.options}}</v-chip
          >
          <!-- <v-chip color="info"  small
            ><v-icon class="mr-1">receipt</v-icon>พิมใบเสร็จ</v-chip
          > -->
          <v-chip color="info"  small @click="printOrder(item, item.order_check ? '0' : 'undefined')"  :disabled=" item.order_check== '0'"
            ><v-icon class="mr-1">mdi-printer-outline</v-icon>พิมพ์ใบเสร็จ</v-chip
          >
          <v-chip color="error"  small @click="deleteItem(item)"
            ><v-icon class="mr-1">delete</v-icon>ลบ</v-chip
          >
        </template>

      
      </v-data-table>
      <!-- ลบข้อมูล -->
      <v-dialog v-model="confirmDeleteDialog" max-width="300">
        <v-card>
          <!-- <v-card-title>
                   ลบข้อมูล
            </v-card-title> -->
          <v-card-title class="body"> คุณต้องการที่จะลบหรือไม่? </v-card-title>
          <v-card-actions>
            <v-btn class="primary" @click="confirmDelete()">ตกลง</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="error" 
              >ยกเลิก</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import { sumdate } from "@/components/hooks/filter"
import api from "@/services/api";
export default {
  data() {
    return {
      // items:["ยาสามัญประจำบ้าน","ยาแผนโบราณ","ยาแผนปัจจุบัน","ยาอันตราย","ยาควบคุมพิเศษ","ยาสมุนไพร","ยาบรรจุเสร็จ","ยาใช้ภายใน","ยาใช้เฉพาะที่"],
      // items1:["แพทย์A","แพทย์B","แพทย์C","แพทย์D"],
      mDataArray: [],
      search: "",
      drugtypeData: {},
      qpolicing:{ },
      customer:{},
      dataPaymentforsend:"",
      cartPolicing:{},
      menu:null,
      confirmDeleteDialog: false,
      selectdate: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      items: ['ทั้งหมด','รอตรวจ','เสร็จสิ้น'],
      headers: [
        {
          text: "#",
          align: "left",
          value: "orderlist",
        },
        {
          text: "เลขที่ใบเสร็จ",
          value: "order_code",
        }, 
        {
          text: "ลูกค้า",
          value: "customer_fullname"
        },
        {
          text: "สถานะ",
          value: "order_check",
        },
        {
          text: "วันที่",
          value: "opd_date",
        },
      //  {
      //   text: "ยอดชำระ"
      //  },
        {
          text: "ตัวเลือก",
          value: "options",
          align: "center",
        },
      ],
    };
  },
  methods: {
    async loadOrderList(){
      let result = await api.getOpd();
      // this.mDataArray = result.data;
      let data1 = await api.getCustomers()
      this.datacustomer = data1.data;

       this.mDataArray = result.data.map(item =>{
       
        item.customer_fname = this.datacustomer.find(sub => sub.customer_id_pri == item.customer_id_pri).customer_fname
        item.customer_lname = this.datacustomer.find(sub => sub.customer_id_pri == item.customer_id_pri).customer_lname
        return item
      })
    },
     payment(item){
      // this.$router.push("report") 
      this.$router.push(`/report/${item.customer_id_pri}`) 
      // this.dataPaymentforsend = item;
      // this.$router.push({
      //   name:"report",
      //   query: {id: item.customer_id_pri} 
      // })
    },
     paymentEdit(item){
      this.$router.push(`/receiptedit/${item.customer_id_pri}`) 
    },
    printOrder(item){
      this.$router.push(`/invoice/${item.customer_id_pri}`) 
    },
    deleteItem(item) {
      this.deleteqOpdID = item.opd_id;
      this.confirmDeleteDialog = true;
    },
    async confirmDelete() {
      await api.deleteOpd(this.deleteqOpdID);
      // console.log(loadCustomers)
      this.confirmDeleteDialog = false;
    this.loadOrderList();
      
    },
  
  },
  filters: {
    sumdate
  },
 async mounted(){
    this.loadOrderList();
  }
};
</script>

<style>
</style>