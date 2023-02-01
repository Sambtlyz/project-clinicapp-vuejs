<template>
 <v-app>

   
  <v-container>
    
    <v-card class="mx-10 pa-5" outlined>
    <span
        ><v-icon class="pl-2">mdi-calendar</v-icon> การนัดหมาย</span
      > 
      <div
      class="d-flex align-end flex-column pr-7 mb-2"
      color="grey lighten-2"
      flat
      tile
      height="200">
        
        <v-btn @click="dialogAdd = true" outlined color="primary" >
            เพิ่มนัดหมาย  
        </v-btn> 
      </div>
      <v-data-table :search="search" :headers="headers" :items="dataappoint" class="silver2">
        <template v-slot:top>
          <v-col cols="12" md="2">
            <v-text-field
                v-model="search"
                name="search"
                label="ค้นหา"
                prepend-icon="search"
                dense
                outlined
                style="width: 180px"
                hide-details=""
              ></v-text-field>
          </v-col>
        </template>

        <template v-slot:[`item.datalist`]="{ item }">
          {{ dataappoint.indexOf(item) + 1 }}
        </template>

         <template v-slot:[`item.topic`]="{ item }">
          {{ item.topic }}
        </template>

        <template v-slot:[`item.appointment_date`]="{ item }">
          <td class="success"> {{ item.appointment_date | sumdate}}</td>
        </template>

         <template v-slot:[`item.customer_fullnames`]= "{ item}" >
         <td class="success">  {{ item.customer_fname}} {{item.customer_lname}}</td>
        </template>

        <template v-slot:[`item.user_fullname`]= "{ item}">
          {{ item.username}} 
        </template>

        <template v-slot:[`item.option`] = "{ item }">
          <v-chip color="primary"  small @click="DetailAppoint(item)"
            ><v-icon class="mr-1">mdi-card-account-details</v-icon>รายละเอียด</v-chip
          >
         <v-chip color="warning"  small @click="editdialog(item)"
            ><v-icon class="mr-1">mdi-account-edit-outline</v-icon>แก้ไข</v-chip
          >
          <v-chip color="error"  small @click="deleteAppoint(item)"
            ><v-icon class="mr-1">delete</v-icon>ลบ</v-chip
          >
        </template>
      </v-data-table>
            
  <v-dialog v-model="dialogAdd" max-width="500" >
        <v-card>
          <v-container>
            <!-- <v-form @submit.prevent="addEvent"> -->
              <v-select
                      :items="Doctorlist"
                      item-text="username"
                      item-value="user_id"
                      v-model="appointment.user_id"
                      label="แพทย์(ผู้นัด)"
                      outlined
                      dense
                      required
                    ></v-select>
                    <v-autocomplete
                      :items="customerlist"
                      item-text="customer_fname"
                      item-value="customer_id_pri"
                      outlined
                      dense
                      autofocus
                      label="ชื่อลูกค้า"
                      v-model="appointment.customer_id_pri"
                    >
                      <template v-slot:item="{ item }">
                        {{ item.customer_prefix }} {{ item.customer_fname }}
                        {{ item.customer_lname }} ({{ item.customer_id }})
                      </template>
                      <template v-slot:selection="{ item }">
                        {{ item.customer_prefix }} {{ item.customer_fname }}
                        {{ item.customer_lname }} ({{ item.customer_id }})
                      </template>
                    </v-autocomplete>
              <v-text-field
                v-model="appointment.topic"
                type="text"
                label="หัวข้อนัดหมาย"
              ></v-text-field>
              <v-text-field
                v-model="appointment.tel"
                type="text"
                label="เบอร์ติดต่อ"
              ></v-text-field>
              <v-text-field
                v-model="appointment.appointment_date"
                type="date"
                label="วันนัดหมาย"
              ></v-text-field>
              <v-text-field
                v-model="appointment.start"
                type="time"
                label="เวลานัดหมาย"
                locale="th"
              ></v-text-field>
              <!-- <v-text-field
                v-model="color"
                type="color"
                label="color (click to open color menu)"
              ></v-text-field> -->
              <v-textarea
                v-model="appointment.note"
                type="text"
                label="รายละเอียด"
              ></v-textarea>
              <v-btn
                type="submit"
                color="green"
                class="mr-4"
                outlined
                @click="addEvents()"
              >
                เพิ่มกิจกรรม
              </v-btn>
              
              <v-btn
                
                color="red"
                class="mr-50"
                outlined
                @click="dialogAdd = false"
              >
                ยกเลิก
              </v-btn>
            <!-- </v-form> -->
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDetail" max-width="500" >
        <v-card>
          <v-container>
            <!-- <v-form @submit.prevent="addEvent"> -->
              <v-text-field
                v-model="appointments.topic"
                type="text"
                label="หัวข้อนัดหมาย"
                style="font-size: 25px"
                disabled
              ></v-text-field>
              <v-text-field
                v-model="appointments.tel"
                type="text"
                label="เบอร์ติดต่อ"
                style="font-size: 25px"
                disabled
              ></v-text-field>
              <!-- <v-text-field
                v-model="appointment.appointment_date"
                type="date"
                label="วันนัดหมาย"
              ></v-text-field> -->
              <v-text-field
                v-model="appointments.start"
                type="time"
                label="เวลานัดหมาย"
                disabled
                style="font-size: 25px"
              ></v-text-field>
              <!-- <v-text-field
                v-model="color"
                type="color"
                label="color (click to open color menu)"
              ></v-text-field> -->
              <v-textarea
                v-model="appointments.note"
                type="text"
                label="รายละเอียด"
                disabled
                style="font-size: 25px"
              ></v-textarea>
              <v-btn
                
                color="success"
                class="mr-50"
                outlined
                @click="dialogDetail = false"
              >
                ตกลง
              </v-btn>
            <!-- </v-form> -->
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogEdit" max-width="500" >
        <v-card>
          <v-container>
            <!-- <v-form @submit.prevent="addEvent"> -->
              
              <v-select
                      :items="Doctorlist"
                      item-text="username"
                      item-value="user_id"
                      v-model="appointments.user_id"
                      label="แพทย์(ผู้นัด)"
                      outlined
                      dense
                      required
                    ></v-select>
                    <v-autocomplete
                      :items="customerlist"
                      item-text="customer_fname"
                      item-value="customer_id_pri"
                      outlined
                      dense
                      autofocus
                      label="ชื่อลูกค้า"
                      v-model="appointments.customer_id_pri"
                    >
                      <template v-slot:item="{ item }">
                        {{ item.customer_prefix }} {{ item.customer_fname }}
                        {{ item.customer_lname }} ({{ item.customer_id }})
                      </template>
                      <template v-slot:selection="{ item }">
                        {{ item.customer_prefix }} {{ item.customer_fname }}
                        {{ item.customer_lname }} ({{ item.customer_id }})
                      </template>
                    </v-autocomplete>
              <v-text-field
                v-model="appointments.topic"
                type="text"
                label="หัวข้อนัดหมาย"
                
                
              ></v-text-field>
              <v-text-field
                v-model="appointments.tel"
                type="text"
                label="เบอร์ติดต่อ"
               
                
              ></v-text-field>
              <v-text-field
                v-model="appointments.appointment_date"
                type="date"
                label="วันนัดหมาย"
              ></v-text-field>
              <v-text-field
                v-model="appointments.start"
                type="time"
                label="เวลานัดหมาย"
                
               
              ></v-text-field>
              <!-- <v-text-field
                v-model="color"
                type="color"
                label="color (click to open color menu)"
              ></v-text-field> -->
              <v-textarea
                v-model="appointments.note"
                type="text"
                label="รายละเอียด"
                
                
              ></v-textarea>
              <v-btn
                type="submit"
                color="green"
                class="mr-4"
                outlined
                @click="editAppoint()"
              >
                ยืนยัน
              </v-btn>
              
              <v-btn
                
                color="red"
                class="mr-50"
                outlined
                @click="dialogEdit = false"
              >
                ยกเลิก
              </v-btn>
            <!-- </v-form> -->
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="confirmDeleteDialog" max-width="300">
        <v-card>
         
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
   
  </v-app>
  
</template>

<script>
import { sumdate } from "@/components/hooks/filter"
// import axios from "axios";
import api from "@/services/api";
export default {
  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },

    menu1: false,
    selectDoctor: "",
    customer_fullname:"",
    search:"",
    Doctorlist: [],
    customerlist:[],
    dataappoint:[],
    appointment: {
      user_id:"",
      customer_id_pri:"",
      topic:"",
      appointment_date:"",
      start:"",
      end:"",
      tel:"",
      note:"",
    },
     appointments: {
      appointment_id_pri:"",
      user_id:"",
      customer_id_pri:"",
      topic:"",
      appointment_date:"",
      start:"",
      end:"",
      tel:"",
      note:"",
    },
    headers:[
      { text:"#", value:"datalist"
      }, 
      { text:"ชื่อลูกค้า", value:"customer_fullnames" ,
      }, 
      { text:"แพทย์(ผู้นัด)" , value: "user_fullname"
      }, 
      { text:"หัวข้อนัดหมาย" , value:"topic"
      } , 
      // { text:"เบอร์ติดต่อ"
      // }, 
      // { text:"รายละเอียด"
      // }, 
      { text:"วันที่", value:"appointment_date" ,  
      } ,
      // { text:"สถานะ"
      // }, 
      { text:"ตัวเลือก" , value:"option" , align: "center"
      }
    ],
   
    
    dialogAdd: false,
    dialogDate: false,
    dialogDetail: false,
    dialogEdit: false,
    confirmDeleteDialog: false,
  }),

  mounted() {
    // this.getEvents();
    this.getDoctorlist();
    this.getCustomerslist();
    this.getAppointdata();
  },
  computed: {
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long",
      });
    },
  },
  methods: {
    async addEvents(){
      this.appointment.customer_id_pri = this.appointment.customer_id_pri;
      this.appointment.user_id = this.appointment.user_id;
      this.appointment.topic = this.appointment.topic;
      this.appointment_date = this.appointment_date;
      this.appointment.tel = this.appointment.tel;
      this.appointment.start = this.appointment.start;
      this.appointment.note = this.appointment.note;
      let formData = new FormData();

      const {
        customer_id_pri,
        user_id,
        topic,
        tel,
        appointment_date,
        note,
        start
      } = this.appointment
      formData.append("customer_id_pri",customer_id_pri);
      formData.append("user_id",user_id);
      formData.append("topic",topic);
      formData.append("tel",tel);
      formData.append("appointment_date",appointment_date);
      formData.append("start",start);
      formData.append("note",note);

      await api.addAppointment(formData);
      this.dialogAdd = false;
      
    },
    DetailAppoint(item){
      
      this.appointments = item;
      this.dialogDetail = true;
      console.log("test", item)
    },

    editdialog(item){
      this.dialogEdit = true;

      // this.editAppoint();

      console.log("testedit", item)
      this.appointments = item;
    },
    deleteAppoint(item){
      this.deleteAppointID = item.appointment_id_pri
      this.confirmDeleteDialog = true;
    },
    async confirmDelete(){
      await api.deleteAppoint(this.deleteAppointID)
      this.confirmDeleteDialog = false;
      window.location.reload();
    },
   async editAppoint(){
    this.appointments.appointment_id_pri = this.appointments.appointment_id_pri;
    this.appointments.customer_id_pri = this.appointments.customer_id_pri;
    this.appointments.user_id = this.appointments.user_id;
    this.appointments.topic = this.appointments.topic;
    this.appointments.tel = this.appointments.tel;
    this.appointments.appointment_date = this.appointments.appointment_date;
    this.appointments.note = this.appointments.note;
    this.appointments.start = this.appointments.start;
      let  formData = new FormData();

      const {
       appointment_id_pri,
        customer_id_pri,
        user_id,
        topic,
        tel,
        appointment_date,
        note,
        start
      } = this.appointments
     {
      formData.append("appointment_id_pri",appointment_id_pri);
      formData.append("customer_id_pri",customer_id_pri);
      formData.append("user_id",user_id);
      formData.append("topic",topic);
      formData.append("tel",tel);
      formData.append("appointment_date",appointment_date);
      formData.append("start",start);
      formData.append("note",note);

      await api.updateAppoint(formData)
     }
     this.dialogEdit = false;
      
    },
   async getAppointdata(){
      let data = await api.getAppointment();
      

       let data1 = await api.getCustomers()
      this.datacustomer = data1.data;

      let data2 = await api.getUsers();
      this.datadoctor = data2.data;

      this.dataappoint = data.data.map(item =>{
        item.username = this.datadoctor.find(sub => sub.user_id == item.user_id).username
        item.customer_fname = this.datacustomer.find(sub => sub.customer_id_pri == item.customer_id_pri).customer_fname
        item.customer_lname = this.datacustomer.find(sub => sub.customer_id_pri == item.customer_id_pri).customer_lname
        return item
      })
    },
    // async getEvents(){
    //      this.events = [];
        
    //       const events = this.dataappoint
    //       for (const item of events) {
    //         const topic = item.appointment.topic 
    //         const start = item.appointment.start
    //         const end = item.appointment.end
    //         this.events.push({ topic, start, end })
    //       }
       
    // },
    async getDoctorlist(){
      let dataDoctor = await api.getUsers();
      this.Doctorlist = dataDoctor.data;
      this.selectDoctor = dataDoctor.data[0].user_id
    },
    async getCustomerslist(){
      let datacustomer = await api.getCustomers();
      this.customerlist = datacustomer.data;
      this.customer_fullname = datacustomer.data[0].customer_id_pri
    },
  },
  components: {
    
  },
  filters: {
    sumdate
  },
};
</script>

<style></style>
