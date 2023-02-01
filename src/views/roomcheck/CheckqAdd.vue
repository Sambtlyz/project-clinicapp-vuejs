<template>
  <div class="text-center">
    <v-btn color="primary" @click="qAdd()">
      <v-icon size="15">add</v-icon>
      เพิ่มการตรวจ
    </v-btn>
    <v-dialog v-model="dialog" max-width="800px" height="800" flat>
      <v-card>
        <v-card-title class="text-h5"
          ><v-icon>add</v-icon> การตรวจ</v-card-title
        >
        <v-divider></v-divider>
        <v-col cols="12">
          <v-card class="mx-10 pa-5" outlined>
            <v-form @click.prevent="submit" ref="form">
              <v-container>
                <v-row>
                   <v-col cols="12" md="4" class="pt-9">
                    <v-autocomplete
                      :items="customerList"
                      item-text="customer_fname"
                      item-value="customer_id_pri"
                      outlined
                      dense
                      autofocus
                      
                      v-model="opd.customer_id_pri"
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
                  </v-col>
                  <v-col cols="6" md="4">
                    <!-- <span>รหัสOPD</span>
                    <span class="red--text text--lighten-1"> *</span>
                    <v-text-field solo dense v-model="qpolicing.opd_code" label="เช่น OPD001">
                    </v-text-field> -->

                    <span>ห้องตรวจ</span
                    ><span class="red--text text--lighten-1"> *</span>
                    <v-select
                      :items="roomlist"
                      item-text="room_name"
                      item-value="room_id"
                      v-model="opd.room_id"
                      :rules="RulesCheck"
                      outlined
                      dense
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="6" md="4">
                    <span>วันที่</span>
                    <v-menu
                      v-model="selectdate"
                      :close-on-content-click="false"
                     
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="opd.opd_date"
                          dense
                          outlined
                          required
                          disabled
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="opd.opd_date"
                        
                        locale="th"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                 
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-col>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" outlined @click="dialog = false">
            ยกเลิก
          </v-btn>
          <v-btn color="primary" @click="submit()"> บันทึก </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import api from "@/services/api";
export default {
  data() {
    return {
      qpolicing: {
        opd_code: "",
        opd_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
        room_id: "",
        customer_fullname: "",
        user_fullname: "",
      },
      opd: {
        opd_code: "",
        opd_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
        room_id: "",
        opd_t: "",
        opd_p: "",
        opd_rr: "",
        opd_bp: "",
        opd_w: "",
        opd_h: "",
        opd_bmi: "",
        opd_fbs: "",
        opd_pe: "",
        opd_ga: "",
        opd_cc: "",
        opd_hpi: "",
        opd_pmh: "",
        opd_dx: "",
      },
       orderpay:{
        policing_id_pri:"",
        drug_id_pri:"",
        orderpay_id:"",
        drug_name:"",
        policing_name:"",
        drug_price_total:"",
        policing_price_total:"",
        orderpay_total:"",
        orderpay_date: ""
      },
      opdpolicing_temp:{
        opdpolicing_temp_id:"",
        opdpolicing_temp_code:"",
        policing_id_pri:"",
        customer_id_pri:"",
        opd_id:"",
      },
      dialog: false,
      isLoading: false,
      selectdate: false,
      items1: ["แพทย์A", "แพทย์B", "แพทย์C", "แพทย์D"],
      customerList: [],
      roomlist:[],
      selectCustomer: "",
      selectRoom: "",
      RulesCheck: [(v) => !!v || "กรุณากรอกข้อมูล"],
      // opd_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      //   .toISOString()
      //   .substr(0, 10),
    };
  },
  methods: {
    // submit qpolicing
    // async submit() {
    //   let formData = new FormData();
    //   const {
    //     opd_date,
    //     opd_code,
    //     room_id,
    //     customer_fullname,
    //     customer_id_pri,
    //     user_fullname,
    //   } = this.qpolicing;
    //   {
    //     formData.append("customer_id_pri", customer_id_pri);
    //     await api.addOpd(formData);
    //   }
    //   if (this.$refs.form.validate()) {
    //     formData.append("opd_code", opd_code);
    //     formData.append("opd_date", opd_date);
    //     formData.append("room_id", room_id);
    //     formData.append("customer_fullname", customer_fullname);
    //     formData.append("customer_id_pri", customer_id_pri);
    //     formData.append("user_fullname", user_fullname);
    //     await api.addqPolicing(formData);
    //     this.$router.go("/checkq");
    //   }
    // },

    //submit opd
    async submit() {
      let formData = new FormData();
      const {
        opd_t,
        opd_p,
        opd_rr,
        opd_bp,
        opd_w,
        opd_bmi,
        opd_h,
        opd_fbs,
        opd_pe,
        opd_ga,
        opd_cc,
        opd_hpi,
        opd_pmh,
        opd_dx,
        opd_date,
        opd_code,
        room_id,
        customer_id_pri,
      } = this.opd;


      if (this.$refs.form.validate()) {
        formData.append("opd_t", opd_t);
        formData.append("opd_p", opd_p);
        formData.append("opd_rr", opd_rr);
        formData.append("opd_bp", opd_bp);
        formData.append("opd_w", opd_w);
        formData.append("opd_h", opd_h);
        formData.append("opd_bmi", opd_bmi);
        formData.append("opd_fbs", opd_fbs);
        formData.append("opd_pe", opd_pe);
        formData.append("opd_ga", opd_ga);
        formData.append("opd_cc", opd_cc);
        formData.append("opd_hpi", opd_hpi);
        formData.append("opd_pmh", opd_pmh);
        formData.append("opd_dx", opd_dx);
        formData.append("opd_code", opd_code);
        formData.append("opd_date", opd_date);
        formData.append("room_id", room_id);
        formData.append("customer_id_pri", customer_id_pri);
        await api.addOpd(formData);
        
        this.$router.go("/checkq");
      }
      
    },
    // async submit() {
    //   let formData = new FormData();
    //   const {
    //     opd_date,
    //     opd_code,
    //     room_id,
    //     customer_id_pri,
    //   } = this.opd;
    //   const {
    //     opdpolicing_temp_id,
    //     opdpolicing_temp_code,
        
    //     opd_id,
    //     policing_id_pri,
    //   } = this.opdpolicing_temp;

    //   if (this.$refs.form.validate()) {
    //     formData.append("opd_code", opd_code);
    //     formData.append("opd_date", opd_date);
    //     formData.append("room_id", room_id);
    //     formData.append("customer_id_pri", customer_id_pri);

    //     formData.append("opdpolicing_temp_id", opdpolicing_temp_id);
    //     formData.append("opdpolicing_temp_code", opdpolicing_temp_code);
    //     formData.append("opd_id", opd_id);
    //     formData.append("policing_id_pri", policing_id_pri);
    //     await api.addOpd(formData);
    //     await api.addopdPolicing(formData)
    //     this.$router.go("/checkq");
    //   }
    // },
    async qAdd() {
      this.getCustomerlist();
      this.getRoomlist()
      this.dialog = true;
    },
    async getCustomerlist() {
      let datacustomer = await api.getCustomers();
      this.customerList = datacustomer.data;
      this.customer_fullname = datacustomer.data[0].customer_id_pri;
    },
    async getRoomlist(){
      let dataroom = await api.getRoom();
      this.roomlist = dataroom.data;
      this.selectRoom = dataroom.data[0].room_id
    },
  },
};
</script>

