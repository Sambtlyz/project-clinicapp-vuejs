<template>
  <v-col cols="12">
    <v-card class="mx-10 pa-5" outlined>
      <v-row class="no-gutters">
        <v-col cols="12" class="pt-0">
          <!-- <v-simple-table
                  dense
                  fixed-header
                  height="470px"
                  class="elevation-1"
                 > -->
          <v-data-table :headers="headers" :items="countData">
            <template v-slot:[`item.datalist`]="{ item }">
          {{ countData.indexOf(item) + 1 }}
        </template>
        <template v-slot:[`customer_fname.customer_fname`]="{ customer_fname }">
          {{ customer_fname.customer_fname }}
        </template>
            <!-- </v-simple-table> -->
          </v-data-table>
          <tr v-if="statusAdd == 2">
            <!-- <td colspan="3">
              <label style="fonr-size: 0.5rem">{{ "เลือกรายการตรวจ" }}</label>
              <v-autocomplete
                :no-data-text="`${'ไม่มีข้อมูล'} !`"
                :items="policingList"
                class="mb-2"
                item-text="policing_name"
                item-value="policing_id_pri"
                v-model="order"
                solo
                return-object
                dense
                style="width: 230px"
                auto-select-first
                hide-details
              >
                <template v-slot:item="{ item }">
                  {{ item.policing_name }} ({{ item.policing_id }})
                  <v-chip
                    style="
                      background-image: linear-gradient(
                        310deg,
                        #17ad37,
                        #98ec2d
                      );
                    "
                    small
                    text-color="white"
                  >
                    ตรวจทั่วไป
                  </v-chip>
                </template>
                <template v-slot:selection="{ item }">
                  ({{ item.policing_id }}) ({{ item.policing_name }})
                  <v-chip
                    style="
                      background-image: linear-gradient(
                        310deg,
                        #17ad37,
                        #98ec2d
                      );
                    "
                    small
                    text-color="white"
                  >
                    ตรวจทั่วไป
                  </v-chip>
                </template>
              </v-autocomplete>
            </td> -->
            <v-text-field
              name="name"
              label="label"
              id="id"
            ></v-text-field>
            <td>
              <label>ชื่อรายการ</label>
              <v-text-field
                hide-details
                style="width: 105px"
                class="mb-2"
                disabled
                solo
                dense
                v-model="order.policing_name"
              ></v-text-field>
            </td>
            <!-- <td>
                          <label>รหัสลูกค้า</label>
                          <v-text-field
                            hide-details
                            style="width: 105px"
                            disabled
                            class="mb-2"
                            v-model="Policingselect.customer_id_pri"
                            solo
                            dense
                          ></v-text-field>
                        </td> -->
            <!-- <td>
                          <label>ราคาการตรวจ</label>
                          <v-text-field
                            hide-details
                            style="width: 105px"
                            disabled
                            type="number"
                            class="mb-2"
                            v-model="Policingselect.policing_cost"
                            solo
                            dense
                          ></v-text-field>
                        </td> -->
            <!-- <td></td> -->
            <td colspan="2" class="text-right">
              <v-tooltip color="#212121" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="addOrderPay()"
                    icon
                    color="success"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                  </v-btn>
                </template>
                <span class="set-font-kanit">ยืนยัน</span>
              </v-tooltip>
              <v-tooltip color="#212121" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="statusAdd = 0"
                    icon
                    color="error"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-delete-outline</v-icon>
                  </v-btn>
                </template>
                <span class="set-font-kanit">{{ "cancel" }}</span>
              </v-tooltip>
            </td>
          </tr>
          <tr v-if="statusAdd == 0">
            <td colspan="9">
              <v-btn
                outlined
                @click="addPolicing()"
                class="rounded-lg elevation-3 me-2"
                color="success"
              >
                <v-icon left small>mdi-plus</v-icon>{{ "รายการตรวจ" }}
              </v-btn>
            </td>
          </tr>
        </v-col>
      </v-row>
    </v-card>

   <template>
     <v-card class="mx-10 pa-5" outlined>
      <v-form @click.prevent="submit" ref="form">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
                <v-text-field
                  name="name"
                  label="label"
                  id="id"
                  v-model="orderpay.drug_name"
                ></v-text-field>
            </v-col>
            <v-btn color="success" @click="submit()">text</v-btn>
          </v-row>
        </v-container>
      </v-form>
      
    </v-card>
   </template>
  </v-col>
  
</template>


<script>
import api from "@/services/api";
export default {
  data() {
    return {
      statusAdd: 0,
      // cartData:[],
      cartData: [],
      countData:[],
      customer_fname:"",
      orderpay:{
        drug_name:"",
      },
      headers: [
        { text: "#" , value:"datalist" },
        {
          text: "เลขที่",
          value: "",
        },
        { text: "วันที่", value: "" },
        { text: "รายการตรวจ", value: "customer_fname" },
        { text: "ราคา", value: "" },
        { text: "เพิ่มเติม", value: "" },
      ],
    };
  },
  methods: {
    addPolicing() {
      this.statusAdd = 2;
      this.order = "";
    },
    async getCountCustomer() {
      let data = await api.getCountCustomers();
      this.countData = data.data;
    },
   async submit() {
      let formData = new FormData();
      const { drug_name} = this.orderpay;

      {
        formData.append("drug_name", drug_name)
        await api.addOrderpay(formData)
      }
    },
    async loadCarddata(){
      let result = await api.getCustomers();

      let data = await api.getOrders();
      this.dataOrders = data.data;

     

      this.cartData = result.data.map(item =>{
        item.order_name = this.dataOrders.find(sub => item.customer_id_pri == item.customer_id_pri).order_name
        return item;
      })
    },

    async loadPayment(){
      let result = await api.getPayment();
      this.datapay = result.data
    }
  },
  async mounted() {
    this.loadCarddata();
    this.loadPayment();
    this.getCountCustomer();

  
  },
};
</script>

<style>
</style>