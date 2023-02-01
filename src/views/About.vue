<template>
<div id="about">
  <div class="container-fluid content p-3">
    <div class="row">
      <div class="col-12 col-md-5">
        <h1>
          <v-icon>fa-list-alt</v-icon>
          {{ ("examination_room") }}
        </h1>
      </div>
      <div class="col-12 col-md-7 d-md-flex justify-md-end">
        <v-btn
          @click="printPdf()"
          color="primary"
          class="btn rounded-lg elevation-3"
          large
        >
          <v-icon small left>fa-plus</v-icon>{{ ("add") }} OPD
        </v-btn>
      </div>
    </div>
    <search-examination-room-list v-on:search="onSearch" class="my-5" />
    <v-simple-table class="set-soft">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">#</th>
            <th class="text-left">{{("a_number") }} OPD</th>
            <th class="text-center">
              {{ ("receipt_number") }}
            </th>
            <th class="text-center">{{ ("date") }} /{{ ("time") }}</th>
            <th class="text-center">
              {{ ("customer") }}
            </th>
            <th class="text-center">
              {{ ("doctor") }}
            </th>
            <th class="text-left">
              {{ ("examination_room") }}
            </th>
            <th class="text-center">
              {{ ("status") }}
            </th>
            <th class="text-center">
              {{ ("check_status") }}
            </th>
            <th class="text-center">
              {{ ("option") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dataList" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              <span
                @click="detail(item.opd_id, item.opd_check)"
                style="color:blue;cursor:pointer"
                >{{ item.opd_code }}</span
              >
            </td>
            <td class="text-center">
              <span
                style="color:blue;cursor:pointer"
                @click="detail_receipt(item.order_id_pri)"
              >
                {{ item.order_id ? item.order_id : "-" }}
              </span>
            </td>
            <td>{{ item.opd_date | sumdate }} {{ item.opd_time }}</td>
            <td>{{ item.customer_fullname }}</td>
            <td>{{ item.user_fullname }}</td>
            <td>{{ item.room_name }}</td>
            <td>
              <span v-if="item.opd_status_id == 0">
                <v-chip
                  label
                  small
                  class="text-white"
                  style="background-image: linear-gradient(310deg, #ea0606, #ff95a5)"
                >
                  <v-icon left small class="text-white">fa-times</v-icon>
                  {{ ("cancel") }}</v-chip
                >
              </span>
              <span v-else>
                <v-chip
                  label
                  small
                  class="text-white"
                  style="background-image: linear-gradient(310deg, #17ad37, #98ec2d)"
                >
                  <v-icon left small class="text-white">fa-check</v-icon>
                  {{ ("completed") }}</v-chip
                >
              </span>
            </td>
            <td class="text-center">
              <span v-if="item.opd_check == 0">
                <v-chip
                  label
                  small
                  class="text-white"
                  style="background-image: linear-gradient(310deg, #ec8200, #f8c17f)"
                >
                  <v-icon left small class="text-white"
                    >mdi-clock-alert-outline</v-icon
                  >
                  {{ ("wait") }}</v-chip
                >
              </span>
              <span v-if="item.opd_check == 1">
                <v-chip
                  label
                  small
                  class="text-white"
                  style="background-image: linear-gradient(310deg, #17ad37, #98ec2d)"
                >
                  <v-icon left small class="text-white"
                    >mdi-clock-check-outline</v-icon
                  >
                  {{ ("completed") }}</v-chip
                >
              </span>
            </td>
            <td>
              <v-tooltip color="#212121" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="createReceipt(item.opd_id)"
                    icon
                    :disabled="
                      item.order_id != null ||
                        item.opd_check == '0' ||
                        item.opd_status_id == '0'
                    "
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>fa-receipt</v-icon>
                  </v-btn>
                </template>
                <span class="set-font-kanit">{{ ("create_receipt") }}</span>
              </v-tooltip>
              <v-tooltip color="#212121" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="
                      editDoctorAndRoom(item, item.order_id_pri ? '1' : '2')
                    "
                    icon
                    :disabled="item.opd_status_id == '0' || item.opd_check == 1"
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-check-circle-outline</v-icon>
                  </v-btn>
                </template>
                <span class="set-font-kanit">{{ ("check") }}</span>
              </v-tooltip>
              <v-tooltip color="#212121" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="gotoSaveLab(item.opd_id)"
                    icon
                    :disabled="
                      item.checklab_add_id == '0' &&
                        item.checklab_edit_id == '0'
                    "
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>fa-vial</v-icon>
                  </v-btn>
                </template>
                <span class="set-font-kanit">
                  {{
                    item.checklab_add_id == "1"
                      ? ("save_lab")
                      : ("lab_results_edit")
                  }}</span
                >
              </v-tooltip>
              <v-tooltip color="#212121" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="editOpd(item.opd_id)"
                    icon
                    :disabled="item.check_edit_id == '0'"
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-pencil-outline</v-icon>
                  </v-btn>
                </template>
                <span class="set-font-kanit">{{ ("edit") }}</span>
              </v-tooltip>
              <v-tooltip color="#212121" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    @click="printLabValue(item)"
                    :disabled="item.print_lab == '0'"
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-printer</v-icon>
                  </v-btn>
                </template>
                <span class="set-font-kanit">{{ ("print_lab") }}</span>
              </v-tooltip>
              <v-tooltip color="#212121" top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="showDialogCancel(item)"
                    icon
                    :disabled="item.check_cancel_id == '0'"
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </template>
                <span class="set-font-kanit">{{ ("cancel") }}</span>
              </v-tooltip>
            </td>
          </tr>
          <tr v-if="dataList.length < 1">
            <td colspan="8" class="text-center">
              {{ ("no_data") }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div class="d-md-flex justify-content-between pt-2 ">
      <span style="font-size: 20px;" v-if="dataList.length > 0"
        >{{ ("showing") }} {{ data.segment + 1 }} {{ ("to") }}
        {{
          data.segment + itemsPerPage > data.count
            ? data.count
            : data.segment + itemsPerPage
        }}
        {{ ("from") }} {{ data.count }} {{ ("list") }}</span
      >
      <v-pagination
        light
        circle
        v-model.trim="page"
        v-if="dataList.length > 0"
        :length="data.count_of_page"
        :total-visible="7"
      ></v-pagination>
    </div>
    <v-dialog v-model.trim="dialog" max-width="650">
      <v-card>
        <v-card-title>
          <h1><v-icon left>mdi-plus</v-icon> {{ ("add_a_check_queue") }}</h1>
        </v-card-title>
        <v-divider class="mt-1"></v-divider>
        <v-card-text>
          <label for="">{{ ("choose_a_checker") }}</label>
          <v-autocomplete
            :items="customerList"
            :filter="customFilter"
            item-text="customer_lname"
            item-value="customer_id_pri"
            :no-data-text="`${('no_data')} !`"
            autofocus
            solo
            v-model.trim="selectCustomer"
          >
            <template v-slot:item="{ item }">
              <v-avatar size="30" class="me-2">
                <img :src="item.customer_image | imageUrl" :alt="item.customer_fname" />
              </v-avatar>
              {{ item.customer_prefix }} {{ item.customer_fname }}
              {{ item.customer_lname }} ({{ item.customer_id }})
            </template>
            <template v-slot:selection="{ item }">
              <v-avatar size="30" class="me-2">
                <img :src="item.customer_image | imageUrl" :alt="item.customer_fname" />
              </v-avatar>
              {{ item.customer_prefix }} {{ item.customer_fname }}
              {{ item.customer_lname }} ({{ item.customer_id }})
            </template>
          </v-autocomplete>

          <label for="">{{ ("select_inspectors") }}</label>
          <v-autocomplete
            :items="doctorList"
            :no-data-text="`${('no_data')} !`"
            class="set-input"
            item-text="user_fullname"
            item-value="user_id"
            :auto-select-first="true"
            solo
            v-model.trim="selectDoctor"
          ></v-autocomplete>
          <label for="">{{ ("select_examination_room") }}</label>
          <v-autocomplete
            :items="roomList"
            class="set-input"
            item-text="room_name"
            item-value="room_id"
            :auto-select-first="true"
            :no-data-text="`${('no_data')} !`"
            solo
            v-model.trim="selectRoom"
          ></v-autocomplete>
          <label for="">{{ ("date") }}</label>
          <v-dialog
            ref="menu1"
            v-model.trim="menu1"
            :return-value.sync="checkq_date"
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="set-font"
                v-model.trim="checkq_date"
                :label="('date')"
                v-bind="attrs"
                solo
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              class="set-font"
              
              v-model.trim="checkq_date"
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu1 = false">
                ยกเลิก
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu1.save(checkq_date)"
              >
                ยืนยัน
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-card-text>
        <v-divider class="mt-0"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="addCheckQ"
            large
            color="primary"
            class="btn rounded-lg elevation-3"
            >{{ ("confirm") }}</v-btn
          >
          <v-btn
            large
            color="error"
            @click="onCancel"
            outlined
            class="rounded-lg elevation-3"
            >{{ ("cancel") }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogEditDoctorAndRoom" max-width="550">
      <v-card>
        <v-card-title>
          {{ ("edit") }}
        </v-card-title>
        <v-card-text>
          <label for="">{{ ("select_inspectors") }}</label>
          <v-autocomplete
            :items="doctorList"
            class="set-input"
            :no-data-text="`${('no_data')} !`"
            item-text="user_fullname"
            item-value="user_id"
            :auto-select-first="true"
            solo
            v-model.trim="selectDoctor"
          ></v-autocomplete>
          <label for="">{{ ("select_examination_room") }}</label>
          <v-autocomplete
            :items="roomList"
            class="set-input"
            :no-data-text="`${('no_data')} !`"
            item-text="room_name"
            item-value="room_id"
            :auto-select-first="true"
            solo
            v-model.trim="selectRoom"
          ></v-autocomplete>
        </v-card-text>
        <v-divider class="mt-0"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="updateDoctorAndRoom"
            class="btn rounded-lg elevation-3"
            color="primary"
            large
          >
            {{ ("save") }}
          </v-btn>
          <v-btn
            @click="dialogEditDoctorAndRoom = false"
            class="rounded-lg elevation-3"
            color="error"
            outlined
            large
          >
            {{ ("cancel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogCancel" max-width="550">
      <v-card>
        <v-card-title>
          <v-icon left>fa-times</v-icon>{{ ("confirm_cancellation") }}
        </v-card-title>
        <v-divider class="mt-0"></v-divider>
        <v-card-text>
          <label
            >{{ ("note_of_cancellation") }}
            <span class="text-danger">*</span></label
          >
          <v-text-field solo v-model.trim="opd_comment"></v-text-field>
        </v-card-text>
        <v-divider class="mt-0"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="confirmCancle"
            large
            :disabled="opd_comment == null || opd_comment == ''"
            class="rounded-lg elevation-3 btn"
            color="primary"
          >
            {{ ("save") }}
          </v-btn>
          <v-btn
            @click="dialogCancel = false"
            outlined
            large
            class="rounded-lg elevation-3"
            color="error"
          >
            {{ ("cancel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  </div>
</template>
<script>
import html2canvas from "html2canvas";
import  jsPDF  from "jspdf";
import api from "@/services/api";
export default {
  components: {
    
  },
  filters: {
    
  },
  data() {
    return {
      menu1: false,
      checkq_date: new Date().toISOString().substr(0, 10),
      dialog: false,
      dataList: [],
      token: "",
      opd_date: new Date().toISOString().substr(0, 10),
      opd_status_id: "",
      opd_check: "",
      searchtext: "",
      opdupload_type: "",
      page: 1,
      data: {},
      itemsPerPage: 10,
      roomList: [],
      selectRoom: "",
      doctorList: [],
      selectDoctor: "",
      shop_id: "",
      shopData: "",
      customerList: [],
      selectCustomer: "",
      dialogEditDoctorAndRoom: false,
      dialogCancel: false,
      opd_comment: "",
      opd_id: "",
      opdData: "",
      dataRoomCheckForSend: "",
    };
  },
  async mounted() {
    this.token = await refreshToken.getRefreshToken();
    this.getCheckQ();
  },
  watch: {
    page() {
      this.getCheckQ();
    },
  },
  methods: {
    printPdf(){
     window.html2canvas = html2canvas;
     const doc = new jsPDF("p","pt","a4");
    doc.html(document.querySelector("#about"), {
      callback: function(pdf){
         pdf.save("pdf.pdf")
      }
    })
    },
    printLabValue(item) {
      let routeData = this.$router.resolve({
        path: "/reports/pdf/lab",
        query: { id: item.opd_id },
      });
      window.open(routeData.href, "_blank");
    },
    createReceipt(id) {
      this.$router.push({
        name: "CreateReceiptByOpd",
        query: { id: id },
      });
    },
    async getCheckById(id) {
      
      this.opdData = data.data;
    },
    detail_receipt(id) {
      this.$router.push({
        name: "Order_detail",
        query: { id: id },
      });
    },
    editOpd(id) {
      this.$router.push({
        path: "/editOpd",
        query: { id: id },
      });
    },
    gotoSaveLab(id) {
      this.$router.push({
        name: "OpdCheckLab",
        query: { id: id },
      });
    },
    showDialogCancel(data) {
      this.opd_id = data.opd_id;
      this.dialogCancel = true;
    },
    async confirmCancle() {
      let body = {
        opd_id: this.opd_id,
        opd_comment: this.opd_comment,
      };
     
      data.response
        ? this.$notify.success({
            title: this.$i18n.t("success"),
            message: this.$i18n.t("cancel_a_check_queue_success"),
          })
        : this.$notify.error({
            title: this.$i18n.t("error"),
            message: data.message,
          });
      this.getCheckQ();
      this.dialogCancel = false;
    },
    async updateDoctorAndRoom() {
      this.opdData.room_id = this.selectRoom;
      this.opdData.user_id = this.selectDoctor;
      
      if (data.response) {
        if (!this.dataRoomCheckForSend.order_id) {
          this.$router.push({
            name: "RoomCheckDetail",
            query: { id: this.opdData.opd_id },
          });
        } else {
          this.$router.push({
            path: "/editOpd",
            query: { id: this.opdData.opd_id },
          });
        }
      } else {
        this.$notify.error({
          title: this.$i18n.t("error"),
          message: data.message,
        });
      }
    },
    async editDoctorAndRoom(item, status) {
      this.dataRoomCheckForSend = item;
      if (status == 1) {
        await this.getDoctors();
        await this.getRoomList();
        this.getCheckById(item.opd_id);
        this.dialogEditDoctorAndRoom = true;
      } else {
        this.$router.push({
          name: "RoomCheckDetail",
          query: { id: item.opd_id },
        });
      }
    },
    async addCheckQ() {
      let body = {
        shop_id_pri: this.shop_id,
        customer_id_pri: this.selectCustomer,
        user_id: this.selectDoctor,
        room_id: this.selectRoom,
        checkq_date: this.checkq_date,
        checkq_type_id: "1",
        opd_type_id: "1",
        lang: this.$i18n.locale,
      };
      
      data.response
        ? this.$notify.success({
            title: this.$i18n.t("success"),
            message: this.$i18n.t("add_a_check_queue_success"),
          })
        : this.$notify.error({
            title: this.$i18n.t("error"),
            message: data.message,
          });
      this.getCheckQ();
      this.dialog = false;
    },
    async openAddQ() {
      await this.getCustomerList();
     
      this.dialog = true;
    },
    detail(id, status) {
      console.log("status : ", status);
      if (status == 0) {
        this.$router.push({
          name: "RoomCheckDetail",
          query: { id: id },
        });
      } else {
        this.$router.push({
          name: "ShowDetailCheck",
          query: { id: id },
        });
      }
    },
    async getCustomerList() {
      let body = {
        searchtext: "",
        
        date_start: "",
        date_end: "",
        customer_status_id: "1",
        active_page: 1,
        per_page: 0,
      };
      let data = await api.getCustomers();
      this.customerList = data.data;
      this.selectCustomer = data.data[0].customer_id_pri;
    },
    async get_shop() {
      let data_shop_response = await apiService.get({
        path: "shop",
        header: this.token,
      });
      this.shop_id = await data_shop_response.data.shop_id_pri;
      this.shopData = await data_shop_response.data;
    },
    async getRoomList() {
      let body_data = {
        searchtext: "",
        room_status_id: 1,
      };
      let dataRoom = await apiService.post({
        path: "room/list",
        body: body_data,
      });
      this.roomList = dataRoom.data;
      this.selectRoom = dataRoom.data[0].room_id;
    },
    async getDoctors() {
      let body_data = {
        role_id: 1,
      };
      let dataDoctors = await apiService.post({
        path: "user/role",
        body: body_data,
      });
      this.doctorList = dataDoctors.data;
      this.selectDoctor = dataDoctors.data[0].user_id;
    },
    onSearch(data) {
      this.opd_date = data.opd_date;
      this.opd_status_id = data.opd_status_id;
      this.opd_check = "";
      this.searchtext = data.searchtext;
      this.opdupload_type = data.opdupload_type;
      this.getCheckQ();
    },
    onCancel() {
      this.dialog = false;
    },
    async getCheckQ() {
      let body_data = {
        opd_date: this.opd_date,
        opd_status_id: this.opd_status_id,
        opd_check: "",
        opdupload_type: this.opdupload_type,
        searchtext: this.searchtext,
        active_page: this.page,
        per_page: this.itemsPerPage,
      };
      let dataCheckQ = await apiService.post({
        path: "check/list",
        body: body_data,
      });
      this.dataList = dataCheckQ.data;
      this.data = dataCheckQ;
    },
    customFilter(item, queryText, itemText) {
      const textOne = item.customer_fname.toLowerCase();
      const textTwo = item.customer_lname.toLowerCase();
      const textThree = item.customer_id.toLowerCase();
      const textFour = item.customer_tel.toLowerCase();
      const searchText = queryText.toLowerCase();
      return (
        textOne.indexOf(searchText) > -1 ||
        textTwo.indexOf(searchText) > -1 ||
        textThree.indexOf(searchText) > -1 ||
        textFour.indexOf(searchText) > -1
      );
    },
    toDetail() {
      this.$router.push("/checkDetail");
    },
  },
};
</script>
