<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <span><v-icon class="pl-2">mdi-doctor</v-icon> ห้องตรวจ</span>
      <v-data-table :search="search" :headers="headers" :items="mDataArray">
        <!-- top section -->
        <template v-slot:top>
          <v-toolbar flat>
            <v-col cols="12" md="2">
              <v-text-field
                v-model="search"
                name="search"
                label="ค้นหาด้วยรหัส"
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
                    @click="clearDataDate()"
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
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
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
            <CheckqAdd />
          </v-toolbar>
        </template>

        <!-- Table tr section -->
        <!-- <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.drug_id_pri }}</td>
            <td>{{ item.drug_id }}</td>
            <td>{{ item.drugtype_id }}</td>
            <td>{{ item.drug_price }}</td>
            <td>{{ item.drug_total }}</td>
            <td>{{ item.drug_unit }}</td>
            <td>{{ item.drug_status_id }}</td>
            <td>
              <v-icon class="mr-2"> edit </v-icon>

              <v-icon class="mr-2">delete</v-icon>
            </td>
          </tr>
        </template> -->

        <template v-slot:[`item.qPolicingData`]="{ item }">
          {{ mDataArray.indexOf(item) + 1 }}
        </template>
        <template v-slot:[`item.opd_date`]="{ item }">
          {{ item.opd_date | sumdate}}
        </template>

        <!-- <template v-slot:[`item.room_name`]= "{ item}">
          {{ item.room_name}}
        </template> -->
        <template v-slot:[`item.customer_fullname`]= "{ item}">
          {{ item.customer_fname}} {{item.customer_lname}}
        </template>

        



        <!-- สถานะ -->
        <template v-slot:[`item.opd_check`]="{ item }">
          <v-chip
            color="success"
            small
            class="text-white"
            label
            v-if="item.opd_check == 'undefined'"
          >
            <v-icon left class="text-white">mdi-check</v-icon>
            เสร็จสิ้น
          </v-chip>
          <v-chip color="warning" class="text-white" small label v-else>
            <v-icon left class="text-white">mdi-clock</v-icon>
            รอตรวจ</v-chip
          >
        </template> 

        <!-- เพิ่มเติม -->
        <template v-slot:[`item.options`]="{ item }">
          <v-chip color="info" @click="roomcheck(item,  item.opd_id ? '0' : 'undefined')" small :disabled=" item.opd_check == 'undefined'">
            <v-icon class="mr-1"> edit {{ item.options }}</v-icon
            >ตรวจ</v-chip
          >
          <!-- <v-tooltip color="#212121" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="
                      roomcheck(item, item.opd_id ? '0' : 'undefined')
                    "
                    icon
                    
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-check-circle-outline</v-icon>
                  </v-btn>
                </template>
                <span class="set-font-kanit">ตรวจ</span>
              </v-tooltip> -->
          <v-chip color="error" @click="deleteItem(item)" small
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
            <v-btn class="error" @click="confirmDeleteDialog = false"
              >ยกเลิก</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import api from "@/services/api";
import CheckqAdd from "@/views/roomcheck/CheckqAdd";

import { sumdate } from "@/components/hooks/filter"
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
      menu:null,
      confirmDeleteDialog: false,
      selectdate: false,
      dataRoomCheckForSend:"",
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      items: ['ทั้งหมด','รอตรวจ','เสร็จสิ้น'],
      headers: [
        {
          text: "#",
          align: "left",
          value: "qPolicingData",
        },
        {
          text: "เลขที่การตรวจ",
          value: "opd_code",
        },
        {
          text: "วันที่",
          value: "opd_date",
        },
        {
          text: "ลูกค้า",
          value: "customer_fullname",
        }, 
        // {
        //   text: "ผู้ดำเนินการ",
        //   value: "",
        // },
        {
          text: "ห้องตรวจ",
          value: "room_name",
        },
       
        {
          text: "สถานะ",
          value: "opd_check",
        },
        {
          text: "ตัวเลือก",
          value: "options",
          align: "center",
        },
      ],
    };
  },
  methods: {
    
    clearDataDate() {
      this.date = "";
    },
    async loadqPolicing() {
      let result = await api.getOpd();
      // this.mDataArray = result.data;
      let data = await api.getRoom();
      this.dataroom = data.data;

        let data1 = await api.getCustomers()
      this.datacustomer = data1.data;

      

    
      // this.mDataArray = result.data;
      this.mDataArray = result.data.map(item =>{
        item.room_name = this.dataroom.find(sub => sub.room_id == item.room_id).room_name
        item.customer_fname = this.datacustomer.find(sub => sub.customer_id_pri == item.customer_id_pri).customer_fname
        item.customer_lname = this.datacustomer.find(sub => sub.customer_id_pri == item.customer_id_pri).customer_lname
        return item
      })
     
    },
    // async loadCustomer(){
    //   let result = await api.getqPolicing();
    //   let data = await api.getCustomers()
    //   this.datacustomer = data.data;
    //   // this.mDataArray = result.data;

    //   this.mDataArray = result.data.map(item =>{
    //     item.customer_fname = this.datacustomer.find(sub => sub.customer_id_pri == item.customer_id_pri).customer_fname
    //     return item
    //   })
    // },
    // editItem(item) {
    //   this.$router.push(`/drugedit/${item.drug_id_pri}`);
    //   // alert(JSON.stringify(result))
    // },
     roomcheck(item){
      this.$router.push(`/roomcheck/${item.customer_id_pri}`) 
    },
    //  roomcheck(item){
    //   this.dataRoomCheckForSend = item;
    //   this.$router.push({
    //     name:"roomcheck",
    //     query: {id: item.opd_id}
    //   })
    // },
    deleteItem(item) {
      this.deleteqPolicingID = item.opd_id;
      this.confirmDeleteDialog = true;
    },
    async confirmDelete() {
      await api.deleteOpd(this.deleteqPolicingID);
      // console.log(loadCustomers)
      this.confirmDeleteDialog = false;
    this.loadqPolicing();
      
    },
  },
  async mounted() {
    this.loadqPolicing();
    this.$store.dispatch("getqpolicingData");
    // this.$store.dispatch('opdCode', this.opd_code)
    // this.loadCustomer();
  },
  components: {
    CheckqAdd,
   
  },

  filters: {
    sumdate
  },
};
</script>

<style>
</style>