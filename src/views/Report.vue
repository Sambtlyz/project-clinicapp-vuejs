<template>
<div id="report">
  <div class="container-fluid pl-5 pr-5 pt-5 content">
    <v-row>
      <v-col cols="12" md="5" lg="4" class="elevation-1 rounded-lg">
        <v-row class="no-gutters">
          <v-col cols="12" md="7" class="">
            <h1><v-icon>mdi-account</v-icon> ข้อมูลลูกค้า</h1>
          </v-col>
          <v-col cols="12" md="5" class="pt-0 d-flex justify-md-end"> </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="5" lg="4">
            <v-img
              class="elevation-5 rounded-lg m-3 mr-0"
              height="150"
              aspect-ratio="1.7"
              lazy-src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              :src="getCustomerImage()"
            ></v-img>
          </v-col>
          <v-col cols="12" md="7" lg="8" class="py-2">
            <h3>
              <span class="primary--text pointer h3">{{
                customerData.customer_id
              }}</span>
              {{ customerData.customer_prefix }}
              {{ customerData.customer_fname }}
              {{ customerData.customer_lname }}
            </h3>
            <table class="table table-striped table-sm">
              <tbody>
                <tr>
                  <td class="set-font-table-th">เลขบัตรประชาชน :</td>
                  <td class="set-font-table-td">
                    {{ customerData.customer_idcard }}
                  </td>
                </tr>
                <tr>
                  <td class="set-font-table-th">อายุ :</td>
                  <td class="set-font-table-td">
                    {{ customerData.customer_birthdate }}
                  </td>
                </tr>
                <tr>
                  <td class="set-font-table-th">เพศ :</td>
                  <td class="set-font-table-td">
                    {{ customerData.customer_gender }}
                  </td>
                </tr>
                <tr>
                  <td class="set-font-table-th">เบอร์โทรศัพท์ :</td>
                  <td class="set-font-table-td">
                    {{ customerData.customer_tel }}
                  </td>
                </tr>
              </tbody>
            </table>
          </v-col>
          <v-col cols="12" class="pt-0">
            <table class="table table-striped table-sm">
              <tbody>
                <tr>
                  <td class="set-font-table-th">กรุ๊ปเลือด :</td>
                  <td class="set-font-table-td">
                    {{ customerData.customer_blood }}
                  </td>
                </tr>
                <tr>
                  <td class="set-font-table-th">โรคประจำตัว :</td>
                  <td class="set-font-table-td">
                    {{ customerData.customer_allergic }}
                  </td>
                </tr>
                <tr>
                  <td class="set-font-table-th">แพ้ยา :</td>
                  <td class="set-font-table-td">
                    {{ customerData.customer_disease }}
                  </td>
                </tr>
                <tr>
                  <td class="set-font-table-th">เพิ่มเติม :</td>
                  <td class="set-font-table-td">
                    {{ customerData.customer_comment }}
                  </td>
                </tr>
              </tbody>
            </table>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="7" lg="8">
        <v-form @submit="submit" ref="form">
        <v-row>
          <v-col cols="12" md="7" class="pt-0">
            <h1>
              <v-icon>mdi-information-outline</v-icon>
              {{ "ชำระเงิน/สร้างใบเสร็จ" }}
            </h1>
          </v-col>
          <v-col cols="12" md="5" class="pt-0 pb-1 d-flex justify-md-end">
            <v-dialog
              ref="menu1"
              v-model.trim="menu1"
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :label="'วันที่'"
                  v-bind="attrs"
                  prepend-icon="mdi-calendar"
                  solo
                  dense
                  v-model="orderpay.orderpay_date"
                  style="max-width: 250px"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker class="set-font" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu1 = false">
                  ยกเลิก
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu1.save(dateSelectedStart)"
                >
                  ยืนยัน
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col cols="12" class="pl-6 pt-0">
            <v-row class="no-gutters">
              <v-col cols="12" class="pt-0">
                <v-simple-table
                  dense
                  fixed-header
                  height="470px"
                  class="elevation-1"
                >
                  <template v-slot:default>
                <thead >
                  <tr v-if="statusAdd == 0">
                    <th class="text-left blue lighten-3" style="font-size: 14px">#</th>
                    <th class="text-left blue lighten-3" style="font-size: 14px">
                      {{ "รหัส" }}
                    </th>
                    <th class="text-left blue lighten-3" width="160px" style="font-size: 14px">
                      {{ "รายการ" }}
                    </th>
                    <th
                      class="text-center blue lighten-3"
                      width="80px"
                      style="font-size: 14px"
                    >
                      {{ "จำนวน" }}
                    </th>
                    <th class="text-right blue lighten-3" style="font-size: 14px">
                      {{ "ราคา" }}/{{ "หน่วย" }}
                    </th>

                    <th class="text-right blue lighten-3" style="font-size: 14px">
                      {{ "ราคารวม" }}
                    </th>
                    <!-- <th class="text-center blue lighten-3">
                      {{ "ตัวเลือก" }}
                    </th> -->
                  </tr>
                  <tr v-if="statusAdd == 3">
                    <th class="text-left blue lighten-3" style="font-size: 14px">#</th>
                    <th class="text-left blue lighten-3" style="font-size: 14px">
                      {{ "รหัส" }}
                    </th>
                    <th class="text-left blue lighten-3" width="160px" style="font-size: 14px">
                      {{ "รายการ" }}
                    </th>
                    <th
                      class="text-center blue lighten-3"
                      width="80px"
                      style="font-size: 14px"
                    >
                      {{ "จำนวน" }}
                    </th>
                    <th class="text-right blue lighten-3" style="font-size: 14px">
                      {{ "ราคา" }}/{{ "หน่วย" }}
                    </th>

                    <th class="text-right blue lighten-3" style="font-size: 14px">
                      {{ "ราคารวม" }}
                    </th>
                    <th class="text-center blue lighten-3">
                      {{ "ตัวเลือก" }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in cart" :key="index" class="blue lighten-5">
                  <!-- <tr v-for="item in cart" :key="item"> -->
                    <!-- <td>{{ item + 1 }}</td> -->
                    
                    <td >{{ cart.indexOf(item) + 1 }}</td>
                   <td>{{item.order_id}}</td>
                    <td >
                      {{ item.order_name}}
                    </td>
                    <td class="text-center">
                      {{item.order_amount}}
                      </td>
                    <td class="text-right">
                      {{ item.order_price}}
                      </td>
                    <td class="text-right">
                      {{ item.order_total}}
                    </td>
                    
                    <td v-if="statusAdd == 3" class="text-center"><v-chip color="error" class="mr-3" @click="removeOrderCart(item)" small
            ><v-icon >delete</v-icon>ลบ</v-chip
          >
          
          </td>
                    
                    <!-- <td>{{ cart.indexOf(item) + 1 }}</td>
                    <td>
                     {{ item.order.policing_id }} {{ item.order.drug_id }}
                    </td>
                    <td>
                      {{ item.order.policing_name }} {{ item.order.drug_name }}
                    </td>
                    <td class="text-center">{{ item.order.order_amount }}</td>
                    <td class="text-right">
                      {{ item.order.policing_cost }} {{ item.order.drug_price }}
                    </td>
                    <td class="text-right">{{ item.order.order_total }}</td>
                    <td>{{ item.totalPrice }}</td> -->
                  </tr>
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
                  <tr v-if="statusAdd == 1">
                    <td colspan="3">
                      <label style="fonr-size: 0.5rem"> โปรดเลือกยา </label>
                      <v-autocomplete
                        :no-data-text="`${'ไม่มีข้อมูล'} !`"
                        :items="drugList"
                        class="mb-2"
                        :disabled="statusEditDrug"
                        item-value="drug_id_pri"
                        item-text="drug_name"
                        solo
                        dense
                        v-model="order"
                        return-object
                        style="width: 250px"
                        auto-select-first
                        hide-details
                      >
                        <template v-slot:item="{ item }">
                          <v-row>
                            <v-col
                              cols="12"
                              class="d-flex justify-content-between"
                            >
                              <p>{{ item.drug_name }}</p>
                              <p>{{ item.drug_id }}</p>
                            </v-col>
                          </v-row>
                        </template>
                        <template v-slot:selection="{ item }">
                          ({{ item.drug_id }}) {{ item.drug_name }}
                        </template>
                      </v-autocomplete>
                    </td>
                    <td>
                      <label>จำนวน</label>
                      <v-text-field
                        hide-details
                        v-model="quantity"
                        style="width: 90px"
                        class="mb-2"
                        solo
                        type="number"
                        dense
                      ></v-text-field>
                    </td>
                    <td>
                      <label>ราคา</label>
                      <v-text-field
                        hide-details
                        v-model="order.drug_price"
                        style="width: 90px"
                        class="mb-2"
                        disabled
                        type="number"
                        solo
                        dense
                      ></v-text-field>
                    </td>
                    <!-- <td>
                          <label>{{ "discount_unit" }}</label>
                          <v-text-field
                            hide-details
                            style="width: 90px"
                            type="number"
                            class="mb-2"
                            solo
                            v-model="discount"
                            dense
                          ></v-text-field>
                        </td> -->
                    <td>
                      <label>ราคารวม</label>
                      <v-text-field
                        hide-details
                        v-model="sum"
                        style="width: 90px"
                        disabled
                        type="number"
                        class="mb-2"
                        solo
                        dense
                      ></v-text-field>
                    </td>
                    <!-- <td></td> -->
                    <td class="text-right">
                      <v-tooltip color="#212121" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="addDrugToCart()"
                            icon
                            color="success"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                          </v-btn>
                        </template>
                        <span class="set-font-kanit">{{ "confirm" }}</span>
                      </v-tooltip>
                      <v-tooltip color="#212121" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="(statusAdd = 0), (statusEditDrug = false)"
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

                  <tr v-if="statusAdd == 2">
                    <td colspan="3">
                      <label style="fonr-size: 0.5rem">{{
                        "เลือกรายการตรวจ"
                      }}</label>
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
                            style="background-image: linear-gradient(310deg, #17ad37, #98ec2d);"
                            small
                            text-color="white"
                          >
                            ตรวจทั่วไป
                          </v-chip>
                        </template>
                        <template v-slot:selection="{ item }">
                          ({{ item.policing_id }}) ({{ item.policing_name }})
                          <v-chip
                            style="background-image: linear-gradient(310deg, #17ad37, #98ec2d);"
                            small
                            text-color="white"
                          >
                            ตรวจทั่วไป
                          </v-chip>
                        </template>
                      </v-autocomplete>
                    </td>
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
                    <td>
                      <label>จำนวน</label>
                      <v-text-field
                        hide-details
                        style="width: 105px"
                        class="mb-2"
                        disabled
                        type="number"
                        solo
                        dense
                        v-model="quantity"
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
                    <td>
                      <label>ราคาการตรวจ</label>
                      <v-text-field
                        hide-details
                        style="width: 105px"
                        disabled
                        type="number"
                        class="mb-2"
                        v-model="order.policing_cost"
                        solo
                        dense
                      ></v-text-field>
                    </td>
                    <td>
                      <label>ราคารวม</label>
                      <v-text-field
                        hide-details
                        style="width: 105px"
                        disabled
                        type="number"
                        class="mb-2"
                        v-model="order.policing_cost"
                        solo
                        dense
                      ></v-text-field>
                    </td>
                    <!-- <td></td> -->
                    <td colspan="2" class="text-right">
                      <v-tooltip color="#212121" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="addToCart()"
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
                      <!-- <v-btn
                        outlined
                        class="rounded-lg elevation-3 me-2"
                        color="primary"
                        @click="addDrug()"
                      >
                        <v-icon left small>mdi-plus</v-icon>{{ "ยา" }}
                      </v-btn> -->
                      <!-- <v-btn
                        outlined
                        @click="addPolicing()"
                        class="rounded-lg elevation-3 me-2"
                        color="success"
                      >
                        <v-icon left small>mdi-plus</v-icon>{{ "รายการตรวจ" }}
                      </v-btn> -->
                      <v-btn
                        outlined
                        
                        class="rounded-lg elevation-3 me-2"
                        color="warning"
                        @click="paymentEdit()"
                      >
                        <v-icon left small>mdi-playlist-edit</v-icon>แก้ไขข้อมูล
                      </v-btn>
                    </td>
                  </tr>

                  <tr v-if="statusAdd == 3">
                    <td colspan="9">
                      <v-btn
                        outlined
                        class="rounded-lg elevation-3 me-2"
                        color="primary"
                        @click="addDrug()"
                      >
                        <v-icon left small>mdi-plus</v-icon>{{ "ยา" }}
                      </v-btn>
                      <v-btn
                        outlined
                        @click="addPolicing()"
                        class="rounded-lg elevation-3 me-2"
                        color="success"
                      >
                        <v-icon left small>mdi-plus</v-icon>{{ "รายการตรวจ" }}
                      </v-btn>
                      <v-btn
                        outlined
                        
                        class="rounded-lg elevation-3 me-2"
                        color="warning"
                        @click="backtopayment()"
                      >
                        <v-icon left small>mdi-playlist-edit</v-icon>ย้อนกลับ
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
                </v-simple-table>
                <div class="row">
                  <div class="col col-12 col-sm-12 col-md-12 col-lg-6">
                    <table class="table table-striped mt-5">
                      <tbody>
                        
                       
                      
                        
                      </tbody>
                    </table>
                  </div>
                  <div >
                    <table class="table table-striped mt-5">
                      <tbody>
                        
                        <tr>
                          <h4>
                          <td class="text-left">
                            <div class="my-1">มูลค่ารวม :</div>
                          </td>
                          
                          <td class="text-right ">
                            {{ cartTotalOrders | formatPrice }} บาท
                          </td>
                          </h4>
                        </tr>
                        <tr>
                          <h3>
                          <td class="text-left ">
                            รวมยอดที่ต้องชำระ :
                          </td>
                          
                          <td class="text-right ">
                            {{ cartTotalOrders | formatPrice }} บาท
                          </td>
                          </h3>
                        </tr>
                         
                         
                        <!-- <tr>
                          <td class="text-right" colspan="2">
                            <v-btn
                              color="info"
                              outlined
                              class="me-2 rounded-lg elevation-3"
                              @click="createReceiptNow()"
                              >บันทึกฉบับร่าง
                            </v-btn>
                           
                            <v-btn
                              color="warning"
                              class="me-2 btn rounded-lg elevation-3"
                              @click="opendDialogDeposit()"
                              >วางมัดจำ
                            </v-btn>
                            <v-btn
                              color="primary"
                              class="btn rounded-lg elevation-3"
                              @click="openDialogPayment()"
                              >ชำระค่าบริการ
                            </v-btn>
                          </td>
                        </tr> -->
                        
                      </tbody>
                    
                    </table>
                      <div class="pl-5">
                          <v-btn
                              color="warning"
                              class="btn rounded-lg elevation-3 "
                              @click="$router.back()"
                              >ย้อนกลับ
                            </v-btn>
                           <v-btn
                              color="primary"
                              class="btn rounded-lg elevation-3 ml-3"
                              @click="openDialogPayment()"
                              >ชำระค่าบริการ
                            </v-btn>
                            <v-btn
                              color="primary"
                              class="btn rounded-lg elevation-3 ml-3"
                              @click="printPdf()"
                              type="button"
                              >พิมพ์ใบเสร็จ
                            </v-btn>
                        </div>
                  </div>
                 
                </div>
                <!-- <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="addOrderPayReceipt()"
                            icon
                            color="success"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                          </v-btn>
                        </template>
                         <span class="set-font-kanit">ยืนยัน</span> -->
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog_payment" max-width="500">
      <v-card>
        <v-card-title>
          ชำระเงิน
        </v-card-title>
        <v-divider class="mt-1"></v-divider>
        <v-card-text>
         <h3><span>คุณต้องการที่จะชำระเงินจำนวน: {{ cartTotalOrders | formatPrice }} บาท</span></h3>
         <v-text-field
          dense
          solo
          disabled
          class="justify-center"
          style="max-width: 150px"
          v-model="cartTotalOrders"
         ></v-text-field>
        </v-card-text>
        <v-col cols="12" md="5" class="pt-0 pb-1 d-flex justify-md-start">
            <v-dialog
              ref="menu1"
              v-model.trim="menu1"
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                
                <v-text-field
                  label="วันที่"
                  v-bind="attrs"
                  prepend-icon="mdi-calendar"
                  solo
                  dense
                  v-model="orderpay.orderpay_date"
                  style="max-width: 150px"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker class="set-font" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu1 = false">
                  ยกเลิก
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu1.save(dateSelectedStart)"
                >
                  ยืนยัน
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <!-- <v-col cols="12" md="5">
            <v-text-field
              name="name"
              label="label"
              id="id"
              dense
              solo
              v-model="cart.customer_id_pri"
            ></v-text-field>
          </v-col> -->
        <v-divider class="mt-0"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
          
            @click="addOrderPayReceipt()"
            color="primary"
          >
            ยืนยัน
          </v-btn>
          <v-btn color="red" outlined @click="dialog_payment = false">
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
  </div>
  </div>
</template>
<script>
import html2canvas from "html2canvas";
import  { jsPDF }  from "jspdf";
import { font } from "./Sarabun-ExtraLight-normal";
import autoTable from 'jspdf-autotable';
import api from "@/services/api";
import {  formatPrice, sumdate  } from "@/components/hooks/filter";
import Customerdetail from "@/views/customer/Customerdetail";
export default {
  data() {
    return {
      customerId: "",
      menu1: false,
      confirmDeleteDialog: false,
      statusAdd: 0,
      policingList: [],
      drugSelect: "",
      drugList: [],
      Policingselect: "",
      customerData: {},
      // customerData:[],
      sum: null,
      discount: null,
      quantity: null,
      dialog_payment: false,
      cartData: {},
      cart:[],
      customer_image: null,
      orderpay_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      order: {
        policing_id_pri: "",
        order_name: "",
        customer_id_pri: "",
        order_id_pri: "",
        drug_id_pri: "",
        order_total: "",
        order_price: "",
        order_total: "",
        order_amount: "",
      },
      orderpay:{
        orderpay_id_pri:"",
        policing_id_pri:"",
        customer_id_pri:"",
        drug_id_pri:"",
        orderpay_id:"",
        drug_name:"",
        policing_name:"",
        drug_price_total:"",
        policing_price_total:"",
        orderpay_total:"",
        orderpay_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      },
      opd:{
        order_check: "1"
      },
      items: [
        { title: "Item 1", body: "I am item 1 body text" },
        { title: "Item 2", body: "I am item 2 body text" },
        { title: "Item 3", body: "I am item 3 body text" },
        { title: "Item 4", body: "I am item 4 body text" }
      ]
    };
  },
  components: {
    Customerdetail,
  },
  filters: {
    formatPrice,
    sumdate,
  },
  async mounted() {
    let result = await api.getCustomerById(this.$route.params.customer_id_pri);
    this.customerData = result.data;

    // let dataOrder = await api.getOrderById(this.$route.params.customer_id_pri)
    // this.cart = dataOrder.data

    let result1 = await api.getOpdById(this.$route.params.customer_id_pri);
    this.opd = result1.data;

    this.getPolicingList();
    this.getDrugList();
    // this.getOrderlist()
    this.loadlistAll();
    this.getOrderlistId();
    // this.getCustomerdata();
  },
  methods: {
    printPdf(){
   
//      const input = document.getElementById('report');    
// html2canvas(input)
//       .then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF("p","pt","a4");
//         pdf.addImage(imgData, 'PNG', 0, 0);
//         pdf.save("download.pdf");  
//   });
      
    //  window.html2canvas = html2canvas;
     const doc = new jsPDF("p","pt","a4");
    //   // const doc = new jsPDF(); 
  
    // doc.html(document.querySelector("#report"), {
      
    //   callback: function(pdf){
    //      pdf.save("pdf.pdf")
    //   }
    // })
     doc.addFileToVFS("Sarabun-ExtraLight-normal.ttf", font);
     doc.addFont("Sarabun-ExtraLight-normal.ttf", "Sarabun-ExtraLight-normal", "normal");
     doc.setFont("Sarabun-ExtraLight-normal");
     doc.setFontSize(14);

     let width = doc.internal.pageSize.getWidth();
      let data = this.cart.map((cart,i)=>[
      cart.order_name,
      cart.order_amount,
      cart.order_price
   ])
     let content = {
      startY: 100,
      head:[['รายการตรวจ','จำนวน', 'ราคา',]],
      body: data,
      styles:{font:'Sarabun-ExtraLight-normal'}
     }
      doc.autoTable(content)
      
      doc.text("ใบเสร็จรับเงิน", width / 2,25, { align: "center" });
      doc.setFontSize(9);
      doc.text("ชื่อลูกค้า " + this.customerData.customer_prefix +this.customerData.customer_fname +"  "+ this.customerData.customer_lname , 50 , 50);
      doc.text("Date " + this.opd.opd_date , 550,50, { align: "right" });
      doc.text("No. " + this.opd.order_code , 550,70, { align: "right" });
      // doc.setFontSize(9) 
      // doc.text("ชื่อลูกค้า", + this.customerData.customer_fname + "" + this.customerData.customer_lname, 15,20 ,{ align: "center" })

      doc.setFontSize(15) 
      doc.text("ยอดรวมสุทธิ  " + this.cartTotalOrders + ".00"+ " บาท" , 550,500, { align: "right" } )
       
    // doc.text("test" + this.cart.order_name , 15,15)

  
   
    doc.save("INVOICE.pdf")
    this.getOrderlistId();
      
    },
    async removeOrderCart(item){
      this.deleteqOrderID = item.order_id_pri;
      this.confirmDeleteDialog = true;
      
    },
    async confirmDelete() {
      await api.deleteOrder(this.deleteqOrderID);
      this.confirmDeleteDialog = false;
      this.loadlistAll();
      window.location.reload();
    },
    paymentEdit(){
      this.statusAdd = 3;
      
    },
    backtopayment(){
      this.statusAdd = 0;
    },
     async submit(){
      // this.orderpay.customer_id_pri = this.cart.customer_id_pri;
      // this.orderpay.drug_name = this.order.policing_name;
      // this.orderpay.policing_id_pri = this.cart.policing_id_pri;
      // this.orderpay.orderpay_id = this.opd.order_code
      // this.orderpay.orderpay_price = this.cart.order_price;
      // this.orderpay.orderpay_total = this.cartTotalOrders;
      let formData = new FormData();
      const { 
        policing_id_pri,
        customer_id_pri,
        orderpay_id,
        orderpay_total,
        orderpay_date,

      } = this.orderpay
      {
      formData.append("policing_id_pri" , policing_id_pri);
      formData.append("customer_id_pri" , customer_id_pri);
      formData.append("orderpay_id" , orderpay_id);
      formData.append("orderpay_total" , orderpay_total);
      formData.append("orderpay_date" , orderpay_date);
      await api.updateOrderPay(formData);
      console.log("testdata", formData)
      }
     

      // let body = {
      //   customer_id_pri: this.cart.customer_id_pri,
      //   orderpay_id: this.opd.order_code,
      //   orderpay_total: this.cartTotalOrders
      // } = this.orderpay

      // await api.addOrderPay(body);
    },
   async addOrderPayReceipt(){
      this.orderpay.orderpay_total = this.cartTotalOrders
      this.orderpay.customer_id_pri = this.opd.customer_id_pri
      this.orderpay.orderpay_id = this.opd.order_code
      // let data = await api.post({
      //   path: "orderpay"
      // })
      // return data
      let formData = new FormData();
      const {
        customer_id_pri,
        
        orderpay_date,
        orderpay_total,
        orderpay_id
      } = this.orderpay
      {
      formData.append("customer_id_pri", customer_id_pri);
      formData.append("orderpay_total", orderpay_total);
      formData.append("orderpay_date", orderpay_date);
      formData.append("orderpay_id", orderpay_id);
      await api.addOrderpay(formData);
      }
      this.$router.push("/receipt")
      window.location.reload();
    },
     async addToCart(){
      this.order.customer_id_pri = this.customerData.customer_id_pri;
      this.order.order_name = this.order.policing_name;
      this.order.order_id = this.order.policing_id
      this.order.order_price = this.order.policing_cost;
      this.order.order_total = this.order.policing_cost;
      this.order.order_amount = this.quantity
      this.statusAdd = 0;
      let formData = new FormData();
      const { 
        policing_id_pri,
        customer_id_pri,
        order_id,
        order_name,
        order_price,
        order_amount,
        order_total,
      } = this.order
      formData.append("policing_id_pri" , policing_id_pri);
      formData.append("customer_id_pri" , customer_id_pri);
      formData.append("order_id" , order_id);
      formData.append("order_name" , order_name);
      formData.append("order_price" , order_price);
      formData.append("order_amount" , order_amount);
      formData.append("order_total" , order_total);
      await api.addOrder(formData);
      window.location.reload();
      console.log("testdata", formData)
    },
     async addDrugToCart(){
        this.order.customer_id_pri = this.customerData.customer_id_pri;
        this.order.drug_id_pri = this.order.drug_id_pri;
        this.order.order_id = this.opd.opd_code;
        this.order.order_name = this.order.drug_name;
        this.order.order_amount = this.quantity;
        this.order.order_price = this.order.drug_price;
        this.order.order_total = this.sum;
        this.order.order_date = this.opd.opd_date
        this.statusAdd = 0;
        let formData = new FormData();
        const {
          customer_id_pri,
          drug_id_pri,
          order_id,
          order_name,
          order_amount,
          order_price,
          order_total,
          order_date,
        } = this.order

        formData.append("customer_id_pri", customer_id_pri);
        formData.append("drug_id_pri", drug_id_pri);
        formData.append("order_id", order_id);
        formData.append("order_name", order_name);
        formData.append("order_amount", order_amount);
        formData.append("order_price", order_price);
        formData.append("order_total", order_total);
        formData.append("order_date", order_date);
        await api.addOrder(formData);
        window.location.reload();
        console.log("dataDrug", formData)
    },
    getCustomerImage() {
      if (this.customerData.customer_image.length > 100) {
        return this.customerData.customer_image;
      } else {
        return this.$options.filters.imageUrl(this.customerData.customer_image);
      }
    },
    async loadlistAll(){
      

      

      let data1 = await api.getOrders()
      this.cartData = data1.data;
    },
    // async getCustomerdata() {
    //   let datares = await apt.getCustomerById(this.customerId);

    //   customerData = datares.data;
    // },
    async getDrugList() {
      let data = await api.getDrugs();
      this.drugList = data.data;
      this.drug_name = data.data[0].drug_id_pri;
    },
    async getPolicingList() {
      let datapolicingList = await api.getPolicings();
      this.policingList = datapolicingList.data;
      this.policing_name = datapolicingList.data[0].policling_id_pri;

      console.log("policing List", datapolicingList.data);
    },
    // async getOrderlist(){
    //   let data = await api.getOrders()
    //   this.cartData = data.data;
    // },
    async getOrderlistId(){
      let data = await api.getOrderById(this.$route.params.customer_id_pri)
      this.cart = data.data
    },
    
    discount(value) {
      let sum = value * this.amount;
        let sum2 = this.amount * +this.Policingselect.policing_cost;
        this.sum = sum2 - sum;
    },
    statusAdd(value) {
      if (value == 1) {
        this.getDrug();
      } else if (value == 2) {
        this.addPolicing();
      }
    },
     addPolicing() {
      this.statusAdd = 2;
      this.clearData();
      this.quantity = 1;
      this.order = "";
    },
    addDrug() {
      this.statusAdd = 1;
      this.quantity = 1;
      this.clearData();
    },
    clearData() {
      this.sum = 0;
      this.quantity = 0;
    },
    Policingselect(value) {
      this.discount = 0;
      this.amount = 1;
      this.sum = this.Policingselect.policing_cost;
    },
  async  openDialogPayment(){
      this.dialog_payment = true
      this.opd.order_check = this.order_check
      let formData = new FormData()
      const { order_check ,opd_id,} = this.opd;
      {
        formData.append("opd_id", opd_id)
        formData.append("order_check", order_check)
        await api.updateOpd(formData);
      }
    }
    
  },
  computed:{
    // cart() {
    //   return this.$store.state.cart;
    // },
    cartTotalOrders() {
      // return this.$store.getters.cartTotalOrders;

       let total = 0;

    this.cart.forEach(cart => {
        total += cart.order_price * cart.order_amount
    })
    return total;
    },
  },
  watch: {
     quantity(value) {
      if (this.statusAdd == 1) {
        let sum = this.quantity * +this.order.drug_price;
        this.sum = sum;
      }
    },
    discount(value){
      this.statusAdd= 1;
      let sum = value * this.amount;
        let sum2 = this.amount * +this.drugSelect.drug_price;
        this.sum = sum2 - sum;
    },
    drugSelect(value) {
      
      this.amount = 1;
      this.sum = this.drugSelect.drug_price;
    },
  },
};
</script>

<style src="@/views/receipt.scss" lang="scss" ></style>



