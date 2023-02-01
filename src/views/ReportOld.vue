<template>
 
      <v-col cols="12">
      <v-card class="mx-10 pa-5">
        <div >
      <div class="col col-12">
        <div class="row py-0">
          <div class="col col-12 col-md-6 py-0">
            <h1>
              <v-icon left>fa-list</v-icon>
              {{       ("ชำระเงิน") }} {{       ("") }} 
              {{ dataOpd }}
            </h1>
          </div>
          
        </div>
        <div class="row">
          <div class="col col-12" >
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      #
                    </th>
                    <th class="text-left">
                      {{       ("เลขที่") }}
                    </th>
                    <th class="text-left">
                      {{       ("รายการตรวจ") }}
                    </th>
                    <th class="text-left">
                      {{       ("รายละเอียดการตรวจ") }}
                    </th>

                    <th class="text-left">
                      {{       ("ค่าบริการ") }}
                    </th>
                    <th class="text-center" width="250px">
                      {{       ("ตัวเลือก") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in cartlistPolicing" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.opdpolicing_temp_code }}</td>
                    <td>
                      {{ item.opdpolicing_temp_name }}
                      <!-- <v-chip
                        style="background-image: linear-gradient(310deg, #17ad37, #98ec2d);"
                        small
                        text-color="white"
                        v-if="
                          item.checking_set_id == '0' ||
                            item.checking_set_id == null
                        "
                      >
                        {{       ("general") }}
                      </v-chip> -->
                    </td>
                    <!-- <td>
                      <ol>
                        <li v-for="(i, index) in item.checklist" :key="index">
                          {{ i.checklist_name }}
                        </li>
                      </ol>
                    </td> -->
                    <td>
                      <!-- <strike v-if="item.opdchecking_temp_discount != 0.0">
                        {{
                          +item.opdchecking_temp_discount +
                            +item.opdchecking_temp_cost
                        }}
                      </strike> -->

                      {{ item.opdpolicing_temp_cost }}
                    </td>
                    <!-- <td>{{ item.opdchecking_temp_fee }}</td> -->
                    <td v-if="statusAdd == 2"></td>
                    <!-- <td class="text-center">
                      <v-tooltip color="#212121" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="editCartListCheck(item, index)"
                            icon
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>mdi-pencil-outline</v-icon>
                          </v-btn>
                        </template>
                        <span class="set-font-kanit">{{       ("edit") }}</span>
                      </v-tooltip>
                      <v-tooltip color="#212121" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="
                              confirmDeleteListCheck(item.opdchecking_temp_id)
                            "
                            icon
                            color="error"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>mdi-delete-outline</v-icon>
                          </v-btn>
                        </template>
                        <span class="set-font-kanit">{{       ("delete") }}</span>
                      </v-tooltip>
                    </td> -->
                  </tr>

                  <v-fade-transition leave-absolute >
                    <tr style="background-color:#eeeeee" v-if="statusAdd == 1" >
                      <td>{{ data_list.length + 1 }}</td>
                      <td colspan="2">
                        <label style="font-size:14px"
                          >รายการตรวจ
                          <span class="text-danger"> * </span></label
                        >
                        <v-autocomplete
                          v-model="policing_id_pri"
                          :items="policingList"
                          :search-input.sync="search"
                          
                          item-text="policing_name"
                          auto-select-first
                          autofocus
                          item-value="policing_id_pri"
                          :label="ค้นหารายการตรวจ"
                          solo
                        >
                          <template v-slot:no-data>
                            <v-list-item>
                              <v-list-item-title>
                                {{       ("ไม่มีข้อมูล") }} !
                              </v-list-item-title>
                            </v-list-item>
                          </template>
                          <template v-slot:selection="{ item }">
                            {{ item.policing_name }} ({{ item.policing_id }})
                          </template>
                          <template v-slot:item="{ item }">
                            <v-list-item-content>
                              <v-list-item-title
                                >{{ item.policing_name }} ({{
                                  item.policing_id
                                }})</v-list-item-title
                              >
                            </v-list-item-content>
                          </template>
                        </v-autocomplete>
                      </td>
                      <td class="text-left">
                        <v-btn
                          color="success"
                          @click="addcartPolicing()"
                          outlined
                          class="rounded-lg elevation-3 me-2"
                        >
                          <v-icon>mdi-check</v-icon>ยืนยัน
                        </v-btn>
                        <v-btn
                          color="error"
                          outlined
                          @click="(checking_id = ''), (statusAdd = 0)"
                          class="rounded-lg elevation-3"
                        >
                          <v-icon>mdi-delete-outline</v-icon>ลบ
                        </v-btn>
                        <!-- <span class="text-danger">
                          * {{       ("press_endter_for_save_data") }}</span
                        > -->
                      </td>

                      <td colspan="3" class="text-right"></td>
                    </tr>
                  </v-fade-transition>

                  <v-fade-transition leave-absolute>
                    <tr style="background-color:#eeeeee" v-if="statusAdd == 2">
                      <td>{{ indexEdit + 1 }}</td>
                      <td>
                        {{ dataEdit.opdchecking_temp_code }}
                      </td>
                      <td>
                        {{ dataEdit.opdchecking_temp_name }}
                        <v-chip
                          style="background-image: linear-gradient(310deg, #17ad37, #98ec2d);"
                          small
                          text-color="white"
                          v-if="
                            dataEdit.checking_set_id == '0' ||
                              dataEdit.checking_set_id == null
                          "
                        >
                          {{       ("general") }}
                        </v-chip>
                        <v-chip
                          style="background-image: linear-gradient(310deg, #ea0606, #ff95a5);"
                          small
                          text-color="white"
                          v-if="dataEdit.checking_set_id == '1'"
                        >
                          {{       ("single") }}
                        </v-chip>
                        <v-chip
                          style="background-image: linear-gradient(310deg, #ec8200, #f8c17f);"
                          small
                          text-color="white"
                          v-if="dataEdit.checking_set_id == '2'"
                        >
                          {{       ("series") }}
                        </v-chip>
                      </td>

                      <td>
                        <label style="font-size:14px"
                          >{{       ("examination_fee") }}
                          <span class="text-danger"> * </span></label
                        >
                        <v-text-field
                          solo
                          hide-details
                          class="mb-3"
                          v-model.trim="sum"
                        >
                        </v-text-field>
                      </td>
                      <td>
                        <label style="font-size:14px"
                          >{{       ("doctor_fee") }}
                          <span class="text-danger"> * </span></label
                        >
                        <v-text-field
                          solo
                          hide-details
                          class="mb-3"
                          type="number"
                          v-model.trim="dataEdit.opdchecking_temp_fee"
                        ></v-text-field>
                      </td>
                      <td>
                        <label style="font-size:14px"
                          >{{       ("discount") }}
                          <span class="text-danger"> * </span></label
                        >
                        <v-text-field
                          solo
                          hide-details
                          class="mb-3"
                          type="number"
                          v-model.trim="dataEdit.opdchecking_temp_discount"
                        ></v-text-field>
                      </td>
                      <td>
                        <label style="font-size:14px"
                          >{{       ("total") }}
                          <span class="text-danger"> * </span></label
                        >
                        <v-text-field
                          solo
                          hide-details
                          disabled
                          class="mb-3"
                          type="number"
                          v-model="totalPrice"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-btn
                          color="success"
                          @click="updateListCheck"
                          outlined
                          class="rounded-lg elevation-3 me-2"
                        >
                          <v-icon>mdi-check</v-icon> {{       ("confirm") }}
                        </v-btn>
                        <v-btn
                          color="error"
                          outlined
                          @click="(checking_id = ''), (statusAdd = 0)"
                          class="rounded-lg elevation-3"
                        >
                          <v-icon>mdi-delete-outline</v-icon> {{       ("cancel") }}
                        </v-btn>
                      </td>
                    </tr>
                  </v-fade-transition>

                  <!-- <v-fade-transition leave-absolute>
                    <tr v-if="statusAdd == 0">
                      <td colspan="7">
                        <v-btn
                          @click="statusAdd = 1"
                          color="primary"
                          outlined
                          x-large
                          class="rounded-lg elevation-3 my-2"
                        >
                          <v-icon small left>fa-plus</v-icon> เพิ่มรายการตรวจ
                        </v-btn>
                      </td>
                    </tr>
                  </v-fade-transition> -->
                   <v-fade-transition leave-absolute>
                    <tr v-if="statusAdd == 0">
                      <td colspan="7">
                        <v-btn
                          @click="statusAdd = 1"
                          color="primary"
                          outlined
                          x-large
                          class="rounded-lg elevation-3 my-2"
                        >
                          <v-icon small left>mdi-plus</v-icon> เพิ่มรายการตรวจ
                        </v-btn>
                      </td>
                    </tr>
                  </v-fade-transition>
                </tbody>
              </template>
            </v-simple-table>
            <!-- <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      #
                    </th>
                    <th class="text-left">
                      {{       ("รหัส") }}
                    </th>
                    <th class="text-left">
                      {{       ("รายการ") }}
                    </th>
                    <th class="text-left">
                      {{       ("ราคา/หน่วย") }}
                    </th>
                    <th class="text-center" width="250px">
                      {{       ("ตัวเลือก") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in cartListCheck" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.opdchecking_temp_code }}</td>
                    <td>
                      {{ item.opdchecking_temp_name }}
                      <v-chip
                        style="background-image: linear-gradient(310deg, #17ad37, #98ec2d);"
                        small
                        text-color="white"
                        v-if="
                          item.checking_set_id == '0' ||
                            item.checking_set_id == null
                        "
                      >
                        {{       ("general") }}
                      </v-chip>
                      <v-chip
                        style="background-image: linear-gradient(310deg, #ea0606, #ff95a5);"
                        small
                        text-color="white"
                        v-if="item.checking_set_id == '1'"
                      >
                        {{       ("single") }}
                      </v-chip>
                      <v-chip
                        style="background-image: linear-gradient(310deg, #ec8200, #f8c17f);"
                        small
                        text-color="white"
                        v-if="item.checking_set_id == '2'"
                      >
                        {{       ("series") }}
                      </v-chip>
                    </td>
                    <td>
                      <ol>
                        <li v-for="(i, index) in item.checklist" :key="index">
                          {{ i.checklist_name }}
                        </li>
                      </ol>
                    </td>
                    <td>
                      <strike v-if="item.opdchecking_temp_discount != 0.0">
                        {{
                          +item.opdchecking_temp_discount +
                            +item.opdchecking_temp_cost
                        }}
                      </strike>

                      {{ item.opdchecking_temp_cost }}
                    </td>
                    <td>{{ item.opdchecking_temp_fee }}</td>
                    <td v-if="statusAdd == 2"></td>
                    <td class="text-center">
                      <v-tooltip color="#212121" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="editCartListCheck(item, index)"
                            icon
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>mdi-pencil-outline</v-icon>
                          </v-btn>
                        </template>
                        <span class="set-font-kanit">{{       ("edit") }}</span>
                      </v-tooltip>
                      <v-tooltip color="#212121" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="
                              confirmDeleteListCheck(item.opdchecking_temp_id)
                            "
                            icon
                            color="error"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>mdi-delete-outline</v-icon>
                          </v-btn>
                        </template>
                        <span class="set-font-kanit">{{       ("delete") }}</span>
                      </v-tooltip>
                    </td>
                  </tr>

                  <v-fade-transition leave-absolute>
                    <tr style="background-color:#eeeeee" v-if="statusAdd == 1">
                      <td>{{ data_list.length + 1 }}</td>
                      <td colspan="2">
                        <label style="font-size:14px"
                          >{{       ("examination_list") }}
                          <span class="text-danger"> * </span></label
                        >
                        <v-autocomplete
                          v-model.trim="checking_id"
                          :items="examinationList"
                          :search-input.sync="search"
                          :filter="customFilter"
                          auto-select-first
                          autofocus
                          item-value="checking_id"
                          :label="`${      ('search')}${      ('examination_list')}`"
                          solo
                        >
                          <template v-slot:no-data>
                            <v-list-item>
                              <v-list-item-title>
                                {{       ("no_data") }} !
                              </v-list-item-title>
                            </v-list-item>
                          </template>
                          <template v-slot:selection="{ item }">
                            {{ item.checking_name }} ({{ item.checking_code }})
                            <v-chip
                              style="background-image: linear-gradient(310deg, #17ad37, #98ec2d);"
                              small
                              text-color="white"
                              v-if="
                                item.checking_set_id == '0' ||
                                  item.checking_set_id == null
                              "
                            >
                              {{       ("general") }}
                            </v-chip>
                            <v-chip
                              style="background-image: linear-gradient(310deg, #ea0606, #ff95a5);"
                              small
                              text-color="white"
                              v-if="item.checking_set_id == '1'"
                            >
                              {{       ("single") }}
                            </v-chip>
                            <v-chip
                              style="background-image: linear-gradient(310deg, #ec8200, #f8c17f);"
                              small
                              text-color="white"
                              v-if="item.checking_set_id == '2'"
                            >
                              {{       ("series") }}
                            </v-chip>
                          </template>
                          <template v-slot:item="{ item }">
                            <v-list-item-content>
                              <v-list-item-title
                                >{{ item.checking_name }} ({{
                                  item.checking_code
                                }})</v-list-item-title
                              >
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-chip
                                style="background-image: linear-gradient(310deg, #17ad37, #98ec2d);"
                                small
                                text-color="white"
                                v-if="
                                  item.checking_set_id == '0' ||
                                    item.checking_set_id == null
                                "
                              >
                                {{       ("general") }}
                              </v-chip>
                              <v-chip
                                style="background-image: linear-gradient(310deg, #ea0606, #ff95a5);"
                                small
                                text-color="white"
                                v-if="item.checking_set_id == '1'"
                              >
                                {{       ("single") }}
                              </v-chip>
                              <v-chip
                                style="background-image: linear-gradient(310deg, #ec8200, #f8c17f);"
                                small
                                text-color="white"
                                v-if="item.checking_set_id == '2'"
                              >
                                {{       ("series") }}
                              </v-chip>
                            </v-list-item-action>
                          </template>
                        </v-autocomplete>
                      </td>
                      <td class="text-left">
                        <v-btn
                          color="success"
                          @click="addListCheck"
                          outlined
                          class="rounded-lg elevation-3 me-2"
                        >
                          <v-icon>mdi-check</v-icon> {{       ("confirm") }}
                        </v-btn>
                        <v-btn
                          color="error"
                          outlined
                          @click="(checking_id = ''), (statusAdd = 0)"
                          class="rounded-lg elevation-3"
                        >
                          <v-icon>mdi-delete-outline</v-icon> {{       ("delete") }}
                        </v-btn>
                        
                      </td>

                      <td colspan="3" class="text-right"></td>
                    </tr>
                  </v-fade-transition>

                  <v-fade-transition leave-absolute>
                    <tr style="background-color:#eeeeee" v-if="statusAdd == 2">
                      <td>{{ indexEdit + 1 }}</td>
                      <td>
                        {{ dataEdit.opdchecking_temp_code }}
                      </td>
                      <td>
                        {{ dataEdit.opdchecking_temp_name }}
                        <v-chip
                          style="background-image: linear-gradient(310deg, #17ad37, #98ec2d);"
                          small
                          text-color="white"
                          v-if="
                            dataEdit.checking_set_id == '0' ||
                              dataEdit.checking_set_id == null
                          "
                        >
                          {{       ("general") }}
                        </v-chip>
                        <v-chip
                          style="background-image: linear-gradient(310deg, #ea0606, #ff95a5);"
                          small
                          text-color="white"
                          v-if="dataEdit.checking_set_id == '1'"
                        >
                          {{       ("single") }}
                        </v-chip>
                        <v-chip
                          style="background-image: linear-gradient(310deg, #ec8200, #f8c17f);"
                          small
                          text-color="white"
                          v-if="dataEdit.checking_set_id == '2'"
                        >
                          {{       ("series") }}
                        </v-chip>
                      </td>

                      <td>
                        <label style="font-size:14px"
                          >{{       ("examination_fee") }}
                          <span class="text-danger"> * </span></label
                        >
                        <v-text-field
                          solo
                          hide-details
                          class="mb-3"
                          v-model.trim="sum"
                        >
                        </v-text-field>
                      </td>
                      <td>
                        <label style="font-size:14px"
                          >{{       ("doctor_fee") }}
                          <span class="text-danger"> * </span></label
                        >
                        <v-text-field
                          solo
                          hide-details
                          class="mb-3"
                          type="number"
                          v-model.trim="dataEdit.opdchecking_temp_fee"
                        ></v-text-field>
                      </td>
                      <td>
                        <label style="font-size:14px"
                          >{{       ("discount") }}
                          <span class="text-danger"> * </span></label
                        >
                        <v-text-field
                          solo
                          hide-details
                          class="mb-3"
                          type="number"
                          v-model.trim="dataEdit.opdchecking_temp_discount"
                        ></v-text-field>
                      </td>
                      <td>
                        <label style="font-size:14px"
                          >{{       ("total") }}
                          <span class="text-danger"> * </span></label
                        >
                        <v-text-field
                          solo
                          hide-details
                          disabled
                          class="mb-3"
                          type="number"
                          v-model="totalPrice"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-btn
                          color="success"
                          @click="updateListCheck"
                          outlined
                          class="rounded-lg elevation-3 me-2"
                        >
                          <v-icon>mdi-check</v-icon> {{       ("confirm") }}
                        </v-btn>
                        <v-btn
                          color="error"
                          outlined
                          @click="(checking_id = ''), (statusAdd = 0)"
                          class="rounded-lg elevation-3"
                        >
                          <v-icon>mdi-delete-outline</v-icon> {{       ("cancel") }}
                        </v-btn>
                      </td>
                    </tr>
                  </v-fade-transition>
                   <v-fade-transition leave-absolute>
                    
                      <td colspan="7">
                        <v-btn
                          @click="statusAdd = 1"
                          color="primary"
                          outlined
                          x-large
                          class="rounded-lg elevation-3 my-2"
                        >
                          <v-icon small left>mdi-plus</v-icon> จ่ายยา
                        </v-btn>
                      </td>
                    
                  </v-fade-transition>
                </tbody>
              </template>
            </v-simple-table> -->
            <v-divider class="mb-0"></v-divider>
          </div>
          <div class="col col-12 col-sm-12 col-md-6">
            <label for="">หมายเหตุ</label>
            <v-textarea
              ref="myTextEditor"
              v-model.trim="opdData"
              :options="editorOption"
              class="pb-2"
              solo
              label="กรุณากรอกที่นี่"
            >
            </v-textarea>
          </div>
          <div class="col col-12 col-sm-12 col-md-6 text-right ">
            <table class="table table-striped mt-7">
              <tbody>
                <tr>
                  <td class="set-font-table-th text-right" >รวมค่าบริการ</td>
                  <td class="set-font-table-td text-right" >
                    {{ cartCheck | formatPrice }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="justify-md-end">
           <v-btn
              color="primary"
              class="me-2 rounded-lg elevation-3 b-0"
              large
              :disabled="cartListCheck == 0"
              @click="saveListCheck()"
            >
              <v-icon left>mdi-content-save</v-icon>{{       ("บันทึก") }}
            </v-btn>
            <v-btn
              @click="$router.back()"
              color="error"
              class="rounded-lg elevation-3"
              large
            >
              <v-icon left>mdi-window-close</v-icon>{{       ("ยกเลิก") }}
            </v-btn>
          </div>
            
          </div>
        </div>
      </div>
    </div>
      </v-card>
      </v-col>
</template>

<script>
import api from "@/services/api";
export default {
  data() {
    return {
      statusAdd:0,
      dataEdit: {},
      totalPrice: 0,
      policingList: [],
      data_list:[],
      cartPolicing:{},
      cartlistPolicing:[],
      // opdpolicing_temp: {
      //   policling_id_pri:""
        
      // }
      policling_id_pri:"",
    }
  },
  // watch: {
  //   sum(value) {
  //     this.totalPrice = + value
  //   },
  //   statusAdd(value){
  //     if(value == 1){
  //       this.sum = +this.dataEdit.policing_cost
  //     }
  //   }
  // },
  mounted() {
    this.getPolicingList();
    // this.addopdPolicing();
    // this.getcartPolicing();
  },
  methods: {
  async  getPolicingList() {
     let datapolicingList = await api.getPolicings();
     this.policingList = datapolicingList.data
     this.policing_name = datapolicingList.data[0].policling_id_pri

     console.log("policing List", datapolicingList.data )
    },

    // async addopdpolicing(){
    //   let body = {
    //     opd_id: this.opd_id,
    //     policling_id_pri: this.policling_id_pri
    //   }
    //   let data = await api.addopdpolicing({
    //     path
    //   })
    // },
   async addcartPolicing(){
    // this.opd_id = this.opd_id
      let body = {
        opd_id: this.opd_id,
        policing_id_pri: this.policling_id_pri
      };
      let data = await api.addopdPolicing({
        path:"policing_temp",
        body: body
      })
      console.log("list policng", data.data)

      this.policling_id_pri = ""
      this.cartlistPolicing = data.data.cart
      this.cartPolicing = data.data;
    },

    // async addopdPolicing(){
    //   let body = {
    //     opd_id,
    //     policling_id_pri
    //   };
    //   let data =  api.addopdPolicing({
    //     path: "policing_temp",
    //     body: body
    //   });
    //   this.cartPolicing = data.data

      
      
    // },
   
    customFilter(item, queryText, itemText) {
      if (item.policing_id && item.policing_name) {
        const textOne = item.policing_id.toLowerCase();
        const textTwo = item.policing_name.toLowerCase();
        const searchText = queryText.toLowerCase();
        return (
          textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
        );
      }
    },
    
  },
}
</script>

<style>

</style>