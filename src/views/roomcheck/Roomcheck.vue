<template>
  <v-container>
    <v-col cols="12">
      <v-card class="mx-10 pa-5" outlined>
        <v-card-actions>
          <span
            ><v-icon class="pl-2">mdi-account-multiple</v-icon>ห้องตรวจ</span
          >
          <!-- <v-spacer></v-spacer> <div class="pt-7 pr-2"><span :v-model="opd.customer_id_pri" >{{customer.customer_id_pri}}</span></div> -->
        </v-card-actions>
        <v-form>
          <v-container>
            <v-row>
              <h3 class="pl-5">ข้อมูลคนไข้</h3>
              <v-col cols="4" md="2" sm="6" pa-5 pl-3>
                <v-img
                  :src="getCustomerImage()"
                  :width="200"
                  height="200"
                  pb-5
                  lazy-src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  alt="alt"
                />

                <div class="pt-2"></div>
              </v-col>
              <!-- <v-col cols="4" md="2" sm="6" pa-5 pl-3>
                <v-img
                  :src="customer.customer_image"
                  :width="200"
                  height="200"
                  pb-5
                  lazy-src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  alt="alt"
                />

              </v-col> -->

              <div class="col-sm-9">
                <div class="row m-b-10 m-l-20">
                  <div class="col-lg-4">
                    <span>รหัส</span>
                    <h5 class="text-muted m-b-5">{{ customer.customer_id }}</h5>
                  </div>
                  <div class="col-lg-4">
                    <span>ชื่อ - นามสกุล</span>
                    <h5 class="text-muted m-b-5">
                      {{ customer.customer_prefix }}
                      {{ customer.customer_fname }}
                      {{ customer.customer_lname }}
                    </h5>
                  </div>
                  <div class="col-lg-4">
                    <span>เลขบัตรประชาชน</span>
                    <h5 class="text-muted m-b-5">
                      {{ customer.customer_idcard }}
                    </h5>
                  </div>
                </div>
                <div class="row m-b-10 m-l-20">
                  <div class="col-lg-4">
                    <span>เพศ</span>
                    <h5 class="text-muted m-b-5">
                      {{ customer.customer_gender }}
                    </h5>
                  </div>
                  <div class="col-lg-4">
                    <span>อายุ</span>
                    <h5 class="text-muted m-b-5">
                      {{ customer.customer_birthdate | sum_birthdate }}
                    </h5>
                  </div>
                  <div class="col-lg-4">
                    <span>กรุ๊ปเลือด</span>
                    <h5 class="text-muted m-b-5">
                      {{ customer.customer_blood }}
                    </h5>
                  </div>
                </div>
                <div class="row m-b-10 m-l-20">
                  <div class="col-lg-4">
                    <span>แพ้ยา</span>
                    <h5 class="text-muted m-b-5">
                      {{ customer.customer_allergic }}
                    </h5>
                  </div>
                  <div class="col-lg-4">
                    <span>โรคประจำตัว</span>
                    <h5 class="text-muted m-b-5">
                      {{ customer.customer_disease }}
                    </h5>
                  </div>

                  <!-- <div class="col-lg-4">
                    <h6 class="text-muted m-b-5">อื่นๆ</h6>
                    <h6>เอ</h6>
                </div> -->
                </div>
              </div>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-card class="mx-10 pa-5" outlined>
        <v-form @submit.prevent="submit" ref="form">
          <v-container>
            <div>
              <v-row no-gutters>
                <v-col cols="12" md="6">
                  <h3 class="ml-3">
                    <v-icon left>mdi-heart</v-icon
                    >{{ "การตรวจข้อมูลเบื้องต้น" }}
                  </h3>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="2" md="1">
                  <div class="pt-6 pr-2">
                    <v-text-field
                      v-model="opd.opd_id"
                      dense
                      disabled
                      outlined
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col cols="6" md="1">
                  <div class="pr-2">
                    <span>เลขที่การตรวจ</span
                    ><v-text-field
                      v-model="opd.opd_code"
                      dense
                      disabled
                      outlined
                    ></v-text-field>
                  </div>
                  <!-- <div class=" pr-2"><span>เลขที่การตรวจ</span><v-text-field v-model="dataOpdgnr.opd_code" dense  disabled outlined></v-text-field></div> -->
                </v-col>
                <!-- <span>{{ this.$route.params.customer_id_pri }}</span> -->
                <!-- <span :v-model="opd.customer_id_pri" >{{customer.customer_id_pri}}</span> -->

                <v-col cols="6" md="1">
                  <span>วันที่การตรวจ</span>
                  <v-menu
                    ref="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="opd.opd_date"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        dense
                        outlined
                        :disabled="true"
                      >
                      </v-text-field>
                    </template>
                  </v-menu>
                </v-col>
              </v-row>

              <v-divider class="mt-0"></v-divider>
              <h4>
                <v-icon small left>fa-circle</v-icon>
                {{ "ข้อมูลทั่วไป" }} ({{ "ซักประวัติโดย" }} )
              </h4>
              <table class="table table-striped mt-5">
                <tbody>
                  <div>
                    <v-form>
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          dense
                          outlined
                          class="pt-6"
                        ></v-text-field>
                      </template>
                    </v-form>
                  </div>

                  <tr>
                    <td>
                      <tr>
                        <td class="set-font-table-td">
                          <v-text-field
                            label="T (อุณหภูมิ) :"
                            dense
                            class="ma-2"
                            v-model="opd.opd_t"
                            hide-details
                            suffix="C."
                          ></v-text-field>
                        </td>
                      </tr>
                    </td>

                    <td>
                      <tr>
                        <td class="set-font-table-td">
                          <v-text-field
                            label="P (อัตราชีพจร) :"
                            dense
                            class="ma-2"
                            v-model="opd.opd_p"
                            hide-details
                            suffix="/min."
                          ></v-text-field>
                        </td>
                      </tr>
                    </td>

                    <td>
                      <tr>
                        <td class="set-font-table-td text-right">
                          <v-text-field
                            label="RR (อัตราการหายใจ) :"
                            dense
                            class="ma-2"
                            v-model="opd.opd_rr"
                            hide-details
                            suffix="/min."
                          ></v-text-field>
                        </td>
                      </tr>
                    </td>

                    <td>
                      <tr>
                        <td class="set-font-table-td text-right">
                          <v-text-field
                            label="BP (ความดันโลหิต) :"
                            dense
                            class="ma-2"
                            v-model="opd.opd_bp"
                            hide-details
                            suffix="/mmHg."
                          ></v-text-field>
                        </td>
                      </tr>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <tr>
                        <td class="set-font-table-td text-right">
                          <v-text-field
                            label="หนัก :"
                            dense
                            class="ma-2"
                            v-model="opd.opd_w"
                            hide-details
                            suffix="กก."
                          ></v-text-field>
                        </td>
                      </tr>
                    </td>

                    <td>
                      <tr>
                        <td class="set-font-table-td text-right">
                          <v-text-field
                            label="สูง :"
                            dense
                            class="ma-2"
                            v-model="opd.opd_h"
                            hide-details
                            suffix="ซม."
                          ></v-text-field>
                        </td>
                      </tr>
                    </td>

                    <td>
                      <tr>
                        <td class="set-font-table-td text-right">
                          <v-text-field
                            label="BMI :"
                            dense
                            class="ma-2"
                            v-model="opd_bmi"
                            hide-details
                            disabled
                          ></v-text-field>
                        </td>
                      </tr>
                    </td>

                    <td>
                      <tr>
                        <td class="set-font-table-td text-right">
                          <v-text-field
                            label="FBS :"
                            dense
                            class="ma-2"
                            v-model="opd.opd_fbs"
                            hide-details
                            suffix="mg/dl"
                          ></v-text-field>
                        </td>
                      </tr>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h4>
                <v-icon small left>fa-circle</v-icon>
                {{ "อาการสำคัญ" }} {{ "/" }} {{ "ประวัติปัจจุบัน" }} {{ "/" }}
                {{ "ประวัติในอดีต" }}
              </h4>
              <table class="table table-striped mt-5">
                <tbody>
                  <tr>
                    <td class="set-font-table-td">
                      <v-text-field
                        label="CC :"
                        dense
                        class="ma-2"
                        v-model="opd.opd_cc"
                        hide-details
                      ></v-text-field>
                    </td>
                    <td class="set-font-table-td">
                      <v-text-field
                        label="HPI :"
                        dense
                        class="ma-2"
                        v-model="opd.opd_hpi"
                        hide-details
                      ></v-text-field>
                    </td>
                    <td class="set-font-table-td text-right">
                      <v-text-field
                        label="PMH :"
                        dense
                        class="ma-2"
                        v-model="opd.opd_pmh"
                        hide-details
                      ></v-text-field>
                    </td>
                  </tr>
                </tbody>
              </table>

              <h4>
                <v-icon small left>fa-circle</v-icon>
                {{ "การตรวจร่างกาย" }}
              </h4>
              <table class="table table-striped mt-5">
                <tbody>
                  <tr>
                    <td class="set-font-table-td">
                      <v-text-field
                        label="PE :"
                        dense
                        class="ma-2"
                        v-model="opd.opd_pe"
                        hide-details
                      ></v-text-field>
                    </td>
                    <td class="set-font-table-td text-right">
                      <v-text-field
                        label="GA :"
                        dense
                        class="ma-2"
                        v-model="opd.opd_ga"
                        hide-details
                      ></v-text-field>
                    </td>
                  </tr>
                </tbody>
              </table>

              <h4>
                <v-icon small left>fa-circle</v-icon>
                {{ "การวินิฉัยโรค" }}
              </h4>
              <table class="table table-striped mt-5">
                <tbody>
                  <tr>
                    <td class="set-font-table-td">
                      <v-text-field
                        label="DX :"
                        dense
                        class="ma-2"
                        v-model="opd.opd_dx"
                        hide-details
                      ></v-text-field>
                    </td>
                  </tr>
                </tbody>
              </table>
              <v-divider class="mt-0"></v-divider>
            </div>
          </v-container>
          <!-- <div class="d-flex flex-row-reverse">
            <div class="mr-3">
              <v-btn
                color="error"
                class="rounded-lg elevation-3"
                large
                @click="$router.back('/roomcheck')"
              >
                <v-icon left>mdi-window-close</v-icon>ยกเลิก
              </v-btn>
            </div>
            <v-btn
              color="primary"
              class="me-2 rounded-lg elevation-3 b-0"
              large
              @click="submit"
            >
              <v-icon left>mdi-content-save</v-icon>บันทึก
            </v-btn>
          </div> -->
        </v-form>
      </v-card>
    </v-col>
    <!-- <v-col cols="12">
      <v-card class="mx-10 pa-5" outlined>
        <v-col cols="12" class="pt-0">
          <h3 class="ml-3"><v-icon left>mdi-heart</v-icon>รายการตรวจ</h3>
          <v-col cols="12">
            <v-text-field
              hide-details
              prepend-icon="search"
              placeholder="Search Product..."
              single-line
              style="width: 250px"
              v-model="searchQuery"
              class="d-none d-sm-flex"
            ></v-text-field>
          </v-col>
          <ReportAdd />

          <v-simple-table dense fixed-header height="470px" class="elevation-1">
            <template v-slot:default>
              <div class="container mx-auto">
                <v-container fluid>
                  <v-row dense>
                    <v-col
                      v-for="item in products"
                      :key="item.id"
                      cols="12"
                      xs="6"
                      sm="4"
                      md="3"
                      lg="2"
                    >
                      <v-skeleton-loader
                        v-if="loadingProducts"
                        type="image"
                      ></v-skeleton-loader>
                      <v-card v-else>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title class="headline">
                              <h6>{{ item.name }}</h6>
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>

                        <v-card-actions>
                          <v-chip class="mr-2" color="red lighten-1" dark>
                            <v-icon left small>euro_symbol</v-icon>
                            {{ parseInt(item.price).toFixed(2) }}
                          </v-chip>
                          <v-spacer></v-spacer>
                          <v-btn icon v-on:click="addToCart(item)">
                            <v-icon>add_shopping_cart</v-icon>
                          </v-btn>
                          <v-btn
                            icon
                            v-on:click="sharewithsheet.visible = true"
                          >
                            <v-icon>mdi-share-variant</v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-fab-transition>
                    <v-btn
                      fab
                      color="red darken-1"
                      v-scroll="onScrollBtn"
                      v-show="showBtnScrollUp"
                      @click="goToTop"
                      dark
                      fixed
                      right
                      bottom
                    >
                      <v-icon>keyboard_arrow_up</v-icon>
                    </v-btn>
                  </v-fab-transition>
                  <v-snackbar
                    v-model="snackbar.visible"
                    bottom
                    :timeout="snackbar.timeout"
                  >
                    {{ snackbar.text }}
                  </v-snackbar>
                  <v-bottom-sheet v-model="sharewithsheet.visible">
                    <v-list>
                      <v-subheader>Share with</v-subheader>
                      <v-list-item
                        @click="sharewithsheet.visible = false"
                        v-for="tile in sharewithRows"
                        :key="tile.title"
                      >
                        <v-list-item-avatar>
                          <v-avatar size="32px" tile>
                            <img :src="tile.img" :alt="tile.title" />
                          </v-avatar>
                        </v-list-item-avatar>
                        <v-list-item-title>{{ tile.title }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-bottom-sheet>
                </v-container>
              </div>

              <thead>
                      <tr>
                        <th class="text-left" style="font-size: 14px">#</th>
                        <th class="text-left" style="font-size: 14px">
                          {{ "รหัส" }}
                        </th>
                        <th
                          class="text-left"
                          width="160px"
                          style="font-size: 14px"
                        >
                          {{ "รายการ" }}
                        </th>
                        <th
                          class="text-center"
                          width="80px"
                          style="font-size: 14px"
                        >
                          {{ "จำนวน" }}
                        </th>
                        <th class="text-right" style="font-size: 14px">
                          {{ "ราคา" }}/{{ "หน่วย" }}
                        </th>

                        <th class="text-right" style="font-size: 14px">
                          {{ "ราคารวม" }}
                        </th>
                        <th class="text-center">
                          {{ "ตัวเลือก" }}
                        </th>
                      </tr>
                    </thead>
            </template>
          </v-simple-table>
        </v-col>
      </v-card>
    </v-col> -->

    <v-col cols="12">
      <v-card class="mx-10 pa-5" outlined>
        <v-row class="no-gutters">
          <v-col cols="12" class="pt-0">
            <!-- <div class="pr-2  justify-end" >
                    <span>เลขที่การตรวจ</span
                    ><v-text-field
                      v-model="cartData.order_id_pri"
                      dense
                      disabled
                      outlined
                      style="width: 230px"
                     
                    ></v-text-field>
                  </div> -->
                  

            <v-simple-table
              dense
              fixed-header
              height="470px"
              class="elevation-1"
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left" style="font-size: 14px">#</th>
                    <th class="text-left" style="font-size: 14px">
                      {{ "รหัส" }}
                    </th>
                    <th class="text-left" width="160px" style="font-size: 14px">
                      {{ "รายการ" }}
                    </th>
                    <th
                      class="text-center"
                      width="80px"
                      style="font-size: 14px"
                    >
                      {{ "จำนวน" }}
                    </th>
                    <th class="text-right" style="font-size: 14px">
                      {{ "ราคา" }}/{{ "หน่วย" }}
                    </th>

                    <th class="text-right" style="font-size: 14px">
                      {{ "ราคารวม" }}
                    </th>
                    <th class="text-right" style="font-size: 14px">
                      {{ "" }}
                    </th>
                    <!-- <th class="text-center" style="font-size: 14px">
                      {{ "ตัวเลือก" }}
                    </th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in cart" :key="index">
                  <!-- <tr v-for="item in cart" :key="item"> -->
                    <!-- <td>{{ item + 1 }}</td> -->
                    <!-- <td>{{ cart.indexOf(item) + 1 }}</td>
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
                    </td> -->
                    <td>{{ cart.indexOf(item) + 1 }}</td>
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
                    <td >{{ item.totalPrice }}</td>
                    <!-- <td class="text-center"><v-chip color="error" class="mr-3" @click="removeOrderCart(item)" small
            ><v-icon >delete</v-icon>ลบ</v-chip
          ></td> -->
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
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <tr>
              <td>
                <h2>
                  <div class="my-1 text-end">
                    ราคารวม {{ cartTotalOrders | formatPrice }} บาท
                  </div>
                </h2>
              </td>
            </tr>
            <!-- <div class="row">
                  <div class="col col-12 col-sm-12 col-md-12 col-lg-6">
                    <table class="table table-striped mt-5">
                      <tbody>
                        <tr>
                          <td class="text-right set-font-table-th">
                            ราคารวม
                          </td>
                          <td class="text-right set-font-table-td">
                             {{ cartTotalOrders | formatPrice }}  บาท
                          </td>
                        </tr>
                       
                      
                        
                      </tbody>
                    </table>
                  </div>
                 
                </div> -->
            <div class="d-flex flex-row-reverse pt-2">
              <div class="mr-3">
                <v-btn
                  color="error"
                  class="rounded-lg elevation-3"
                  large
                  @click="$router.back('/roomcheck')"
                >
                  <v-icon left>mdi-window-close</v-icon>ยกเลิก
                </v-btn>
              </div>
              <v-btn
                color="primary"
                class="me-2 rounded-lg elevation-3 b-0"
                large
                @click="submit"
              >
                <v-icon left>mdi-content-save</v-icon>บันทึก
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
// import { server } from "@/services/constants";
// import axios from "axios";
// import httpClient from "@/services/httpClient";
import api from "@/services/api";
import { sum_birthdate, formatPrice } from "@/components/hooks/filter";
import ReportAdd from "@/components/cards/ReportAdd";

export default {
  data() {
    return {
      headers: [
        {
          text: "เลขที่",
          align: "left",

          value: "datalist",
        },
        { text: "วันที่", value: "" },
        { text: "รายการตรวจ", value: "order_name" },
        { text: "ราคารักษา", value: "order_price" },
        { text: "แพทย์ผู้ดำเนินการ", value: "" },
      ],
      opd_bmi: "",
      statusAdd: 0,
      dataEdit: {},
      totalPrice: 0,
      policingList: [],
      drugList: [],
      data_list: [],
      cartListCheck: [],
      dataOpdgnr: {},
      opdID: "",
      blob_image: "",
      customerData: {},
      Policingselect: "",
      mDataarray: [],
      pageLoaded: false,
      products: null,
      searchQuery: "",
      quantity: null,
      sum: null,
      confirmDeleteDialog: false,
      // cart: [],
      // cartTotalOrders: 0,

      loadingProducts: true,
      // cartData: {},
      // cartData:{},
      cartData: [],
      customer_id_pri: "",

      // customer: {
      //   customer_id: "",
      //   customer_fname: "",
      //   customer_lname: "",
      //   customer_birthdate: "",
      //   customer_prefix: "",
      //   customer_gender: "",
      //   customer_idcard: "",
      //   customer_blood: "",
      //   customer_tel: "",
      //   customer_email: "",
      //   customer_address: "",
      //   customer_district: "",
      //   customer_amphoe: "",
      //   customer_province: "",
      //   customer_zipcode: "",
      //   customer_allergic: "",
      //   customer_disease: "",
      //   customer_comment: "",
      //   customer_image: null,
      // },
      customer:[],
      // customer:{},
      policing_temp: {
        opdpolicing_code: "",
        opdpolicing_name: "",
        opdpolicing_cost: "",
        opd_id: "",
        policing_id_pri: "",
      },
      // order:"",
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
      // drug:{
      //   drug_id:"",
      //   drug_name:"",
      //   drug_price:"",

      // },
      orderList: "",
      opd: {
        opd_id: "",
        opd_code: "",
        customer_id_pri: "",
        opd_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
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
        opd_check: 1,
      },
      customerFile: null,
    };
  },
  async mounted() {
    // let result1 = await api.getCustomerOpd(this.$route.params.opd_id);
    // this.customer = result1.data;

    //***ตัวเดิม params customer_id_pri */
    let result1 = await api.getCustomerById(this.$route.params.opd_id);
    this.customer = result1.data;
    // let result1 = await api.getCustomerById(this.$route.params.opd_id);
    // this.customer = result1.data;

    let result = await api.getOpdById(this.$route.params.opd_id);
    this.opd = result.data;

    let dataOrder = await api.getOrderById(this.$route.params.opd_id)
    this.cart = dataOrder.data

    // let dataorder = await api.getOrderById(this.$route.params.customer_id)
    // this.cartData = dataorder.data

    this.getPolicingList();
    this.getDrugList();
    // this.loadOrderCart();
    this.loadPolicing();

    // this.cartData = localStorage.getItem("cartData")
    //   ? JSON.parse(localStorage.getItem("cartData"))
    //   : [];

    // axios.get("http://localhost:8081/api/v2/order").then((res) => {
    //   this.cartData = res.data;
    // });

    // this.opdID = this.$route.params.opd_id;
    // let result = await api.getOpdById(this.$route.params.opd_id)
    // this.opdID = result.data;
    // this.getOpdgeneral();
  },
  methods: {
    //  async savelistopd(){
    //     // let body = {
    //     //   opd_id: this.opd.opd_id,
    //     //   policing_id_pri: this.policing_id_pri
    //     // };
    //      let body = {
    //       opd_id: this.opd.opd_id,
    //       policing_id_pri: this.policing_id_pri,
    //       opdpolicing_code: this.opdpolicing_code,
    //       opdpolicing_name: this.opdpolicing_name,
    //       opdpolicing_cost: this.opdpolicing_cost,
    //     };
    //     console.log("add list", body)
    //     // let data = await addopdPolicing({
    //     //   path: "policing_temp",
    //     //   body: body
    //     // });
    //     await api.addopdPolicing(body);
    //     data.response
    //       ? this.$notify.success({
    //           title: ("สำเร็จ"),
    //           message: ("เพิ่มข้อมูลสำเร็จ"),
    //         })
    //       : this.$notify.error({
    //           title: ("ผิดพลาด"),
    //           message: data.message,
    //         });
    //         this.getopdPolicing();
    //         this.statusAdd = 0
    //         this.cartListCheck = data.data
    //   },
    // addToCart() {
    //   this.$store.dispatch(
    //     "addOrderCart",
    //     {
    //       order: this.order,
    //     },
    //     (this.order.customer_id_pri = this.customer.customer_id_pri),
    //     (this.order.order_name = this.order.policing_name),
    //     (this.order.order_id_pri = this.order.order_id_pri),
    //     (this.order.order_price = this.order.policing_cost),
    //     (this.order.order_total = this.order.policing_cost),
    //     (this.order.order_amount = this.quantity),
        
    //   );
    //   this.statusAdd = 0;
    // },
   async addToCart() {
      this.$store.dispatch(
        "addOrderCart",{
          order: this.order
        },
        
      );
      this.order.customer_id_pri = this.customer.customer_id_pri;
      this.order.order_name = this.order.policing_name;
      this.order.order_id = this.opd.opd_code
      this.order.order_price = this.order.policing_cost;
      this.order.order_total = this.order.policing_cost;
      this.order.order_amount = this.quantity,
      this.order.order_date = this.opd.opd_date
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
        order_date,
      } = this.order
      formData.append("policing_id_pri" , policing_id_pri);
      formData.append("customer_id_pri" , customer_id_pri);
      formData.append("order_id" , order_id);
      formData.append("order_name" , order_name);
      formData.append("order_price" , order_price);
      formData.append("order_amount" , order_amount);
      formData.append("order_total" , order_total);
      formData.append("order_date" , order_date);
      await api.addOrder(formData);
      console.log("testdata", formData)
      
    },
    async addDrugToCart(){
         this.$store.dispatch(
        "addOrderCart",
        {
          order: this.order,
        }
         );
        this.order.customer_id_pri = this.customer.customer_id_pri;
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
        console.log("dataDrug", formData)
    },
    async removeOrderCart(item){
      this.deleteqOrderID = item.order_id_pri
       this.confirmDeleteDialog = true;
      
    },
    // แบบ vuex
    // async removeOrderCart(item){
    //   this.deleteqOrderID = item.order_id_pri;
    //   this.confirmDeleteDialog = true;
    // },
    async confirmDelete() {
      
      await api.deleteOrder(this.deleteqOrderID);
      this.confirmDeleteDialog = false;
      
    
    },
    // async addToCart(){
    //   this.orderpay.customer_id_pri = this.order.customer_id_pri;
    //   this.orderpay.drug_name = this.order.policing_name;
    //   // this.orderpay.policing_id_pri = this.cart.policing_id_pri;
    //   // this.orderpay.orderpay_id = this.opd.order_code
    //   // this.orderpay.orderpay_price = this.cart.order_price;
    //   // this.orderpay.orderpay_total = this.cartTotalOrders;
    //   let formData = new FormData();
    //   const { 
        
    //     customer_id_pri,
        

    //   } = this.orderpay
    //   formData.append("customer_id_pri" , customer_id_pri);
      
    //   await api.addOrderpay(formData);
    // },
  //  async addToCart(){
  //     this.order.customer_id_pri = this.customer.customer_id_pri;
  //     this.order.order_name = this.order.policing_name;
  //     this.order.order_id = this.order.policing_id
  //     this.order.order_price = this.order.policing_cost;
  //     this.order.order_total = this.order.policing_cost;
  //     this.order.order_amount = this.quantity
  //     this.statusAdd = 0;
  //     let formData = new FormData();
  //     const { 
  //       policing_id_pri,
  //       customer_id_pri,
  //       order_id,
  //       order_name,
  //       order_price,
  //       order_amount,
  //       order_total,
  //     } = this.order
  //     formData.append("policing_id_pri" , policing_id_pri);
  //     formData.append("customer_id_pri" , customer_id_pri);
  //     formData.append("order_id" , order_id);
  //     formData.append("order_name" , order_name);
  //     formData.append("order_price" , order_price);
  //     formData.append("order_amount" , order_amount);
  //     formData.append("order_total" , order_total);
  //     await api.addOrder(formData);
  //     console.log("testdata", formData)
  //   },
  //  async addDrugToCart(){
  //       this.order.customer_id_pri = this.customer.customer_id_pri,
  //       this.order.drug_id_pri = this.order.drug_id_pri,
  //       this.order.order_id = this.order.drug_id
  //       this.order.order_name = this.order.drug_name,
  //       this.order.order_amount = this.quantity,
  //       this.order.order_price = this.order.drug_price,
  //       this.order.order_total = this.sum
  //       this.statusAdd = 0;
  //       let formData = new FormData();
  //       const {
  //         customer_id_pri,
  //         drug_id_pri,
  //         order_id,
  //         order_name,
  //         order_amount,
  //         order_price,
  //         order_total,
  //       } = this.order

  //       formData.append("customer_id_pri", customer_id_pri);
  //       formData.append("drug_id_pri", drug_id_pri);
  //       formData.append("order_id", order_id);
  //       formData.append("order_name", order_name);
  //       formData.append("order_amount", order_amount);
  //       formData.append("order_price", order_price);
  //       formData.append("order_total", order_total);
  //       // await api.addOrder(formData);
  //       console.log("datatest", formData)
  //   },
    // addDrugToCart() {
    //   this.$store.dispatch(
    //     "addOrderCart",
    //     {
    //       order: this.order,
    //     },
    //     this.order.customer_id_pri = this.customer.customer_id_pri,
    //     this.order.drug_id_pri = this.order.drug_id_pri,
    //     this.order.order_name = this.order.drug_name,
    //     this.order.order_amount = this.quantity,
    //     this.order.order_price = this.order.drug_price,
    //     this.order.order_total = this.sum
    //   );
    //   this.statusAdd = 0;
    // },
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

    // async savelistopd() {
    //   this.order.customer_id_pri = this.customer.customer_id_pri
    //   this.order.order_name = this.order.policing_name
    //   this.statusAdd = 0;
    //   let formData = new FormData();
    //   const {  policing_id_pri,order_name, customer_id_pri} = this.order;

    //   formData.append("policing_id_pri", policing_id_pri);
    //   formData.append("order_name", order_name);
    //   formData.append("customer_id_pri", customer_id_pri);

    //   console.log("test", formData);

    //   await api.addOrder(formData);

    //   this.loadPolicing();
    // },
    async savelistopd() {
      this.order.customer_id_pri = this.customer.customer_id_pri;
      this.order.order_name = this.order.policing_name;
      this.statusAdd = 0;
      // let formData = new FormData();
      // const {  policing_id_pri,order_name, customer_id_pri} = this.order;

      // formData.append("policing_id_pri", policing_id_pri);
      // formData.append("order_name", order_name);
      // formData.append("customer_id_pri", customer_id_pri);
      let body = ({
        policing_id_pri: this.policing_id_pri,
        order_name: this.order_name,
        customer_id_pri: this.customer_id_pri,
      } = this.order);
      // this.cartData = body
      localStorage.setItem("cartData", JSON.stringify(body));
      // this.cartData.push(body)
      console.log("datalist", body);
    },
    // async loadOrderCart() {

    //   let data1 = await api.getCustomers();
    //   console.log(' this.mDataArray ',  this.cartData )
    //   let data = await api.getPolicings();
    //   this.datapolicing = data.data

    //   let dataorder = await api.getOrders();
    //   this.dataorder = dataorder.data

    //   this.cartData = data1.data.map(item => {
    //     item.order_name = this.dataorder.find(sub => sub.customer_id_pri == item.customer_id_pri).order_name;

    //     return item;
    //   });

    // },
    async loadPolicing() {
      let data = await api.getOrders();
      this.cartData = data.data;
    },
    getCustomerImage() {
      if (this.customer.customer_image?.length > 100) {
        return this.customer.customer_image;
      } else {
        return this.$options.filters.imageUrl(this.customer.customer_image);
      }
    },

    // onFileSelected(event) {
    //   const reader = new FileReader();
    //   reader.onload = (event) => {
    //     // previews image
    //     this.customer.customer_image = event.target.result;
    //   };
    //   reader.readAsDataURL(event.target.files[0]);
    //   // upload image
    //   this.customerFile = event.target.files[0];
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
    // async getOpdgeneral(){
    //   let data = await api.getOpdById({
    //     path: "opd",
    //     // param:`${this.opdID}/opd_id/${opd_id}`
    //     param:`${this.opdID}`
    //     // param: this.opd_id
    //   });
    //   this.dataOpdgnr = data.data
    //   this.customer_id_pri = data.data.customer_id_pri
    //   this.getCustomer(data.data.customer_id_pri);
    //   console.log("dataopd", data.data)
    //   console.log("dataopd", data.data.customer_id_pri)
    // },

    // async getCustomer(id){
    //   let dataCustomerRes = await api.getCustomers({
    //     path: "customer",
    //     param: id
    //   });
    //   if(dataCustomerRes != null){
    //     this.customer = dataCustomerRes.data[0];
    //     this.blob_image = dataCustomerRes.data[0].customer_image;
    //   } else {
    //     this.customer = null;
    //   }
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
    async submit() {
      this.opd.opd_bmi = this.opd_bmi;
      this.opd.opd_check = this.opd_check;
      let formData = new FormData();
      const {
        opd_id,
        opd_code,
        customer_id_pri,
        opd_date,
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
        opd_check,
      } = this.opd;
      {
        formData.append("opd_id", opd_id);
        formData.append("opd_code", opd_code);
        formData.append("customer_id_pri", customer_id_pri);
        formData.append("opd_date", opd_date);
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
        formData.append("opd_check", opd_check);
        await api.updateOpd(formData);
        // await api.addOpd(formData);

        // this.$router.back();
        // this.$router.push("/report");

        this.$router.push(`/report/${customer_id_pri}`);
      }
    },
    productAddedMessage: function () {
      this.snackbar.visible = true;
      this.snackbar.text = "Product added to your cart";
    },
    // addToCart: function (item) {
    //   let indexProduct = this.cart.findIndex((p) => p.id === item.id);
    //   if (indexProduct > -1) {
    //     let tempProduct = this.cart[indexProduct];
    //     this.cart.splice(indexProduct, 1);
    //     tempProduct.quantity++;
    //     this.cart.push(tempProduct);
    //   } else {
    //     item.quantity = 1;
    //     this.cart.push(item);
    //   }
    //   this.productAddedMessage();
    // },
    // searchProducts: function (query) {
    //   this.searchQuery = query;
    // },
    // addCart: function (products) {
    //   this.cart = products;
    //   localStorage.setItem("cart", JSON.stringify(products));
    // },
    // goToTop: function () {
    //   this.$vuetify.goTo(0);
    // },
    // onScrollBtn: function (event) {
    //   this.showBtnScrollUp =
    //     (window.pageYOffset || event.target.scrollTop || 0) > 40;
    // },
  },
  components: {
    ReportAdd,
  },
  watch: {
    //     async "opd.opd_t"(value) {
    //   this.statusLoadData = false;
    //   this.options.series[0].data[0] = await +value;
    //   this.statusLoadData = true;
    // },
    // async "opd.opd_p"(value) {
    //   this.statusLoadData = false;
    //   this.options.series[0].data[1] = await +value;
    //   this.statusLoadData = true;
    // },
    // async "opd.opd_rr"(value) {
    //   this.statusLoadData = false;
    //   this.options.series[0].data[2] = await +value;
    //   this.statusLoadData = true;
    // },
    // async "opd.opd_bp"(value) {
    //   this.statusLoadData = false;
    //   this.options.series[0].data[3] = await +value;
    //   this.statusLoadData = true;
    // },
    // async opd_bmi(value) {
    //   this.statusLoadData = false;
    //   this.options.series[0].data[4] = await +value;
    //   this.statusLoadData = true;
    // },
    // async "opd.opd_fbs"(value) {
    //   this.statusLoadData = false;
    //   this.options.series[0].data[5] = await +value;
    //   this.statusLoadData = true;
    // },
    "opd.opd_w"(value) {
      if (value) {
        this.opd_bmi =
          value / ((this.opd.opd_h / 100) * (this.opd.opd_h / 100));
        this.opd_bmi = this.opd_bmi.toFixed(2);
      } else {
        this.opd_bmi = "";
      }
    },
    "opd.opd_h"(value) {
      if (value) {
        this.opd_bmi = this.opd.opd_w / ((value / 100) * (value / 100));
        this.opd_bmi = this.opd_bmi.toFixed(2);
      } else {
        this.opd_bmi = "";
      }
    },
    quantity(value) {
      if (this.statusAdd == 1) {
        let sum = this.quantity * +this.order.drug_price;
        this.sum = sum;
      }
    },
    // addDicount(value){
    //   this.cartTotalOrders = this.cart.order_price
    // },
    // cartTotalOrders(value){
    //   let cartTotalOrders = this.cart.order_price *+ this.cart.order_amount

    //   this.cartTotalOrders = cartTotalOrders
    //     // this.cartTotalOrders  = "";
        
    // },
     
    // statusAdd(value) {
    //   if (value == 1) {
    //     this.sum = +this.dataEdit.policing_cost;
    //   }
    // },
    // cart: function () {
    //   this.$emit("addCart", this.cart);
    // },
  },
  computed: {
  //   cartTotalOrders(){
  //     let sum = 0;
  //     this.cart.forEach((item)=> {
  //        sum += item.order.order.price *+ item.order.order_amount;
  //     });

  //    return sum;
  //  }
    //   return total
    // },
    cart() {
      return this.$store.state.cart;
    },
    // cartTotal(){
    //   return this.$store.state.getters.cartTotal;
    // },
    cartTotalOrders() {
      return this.$store.getters.cartTotalOrders;
    },
    
    // subtotalCart: function () {
    //   let sum = 0;
    //   this.cart.map((p) => {
    //     sum += parseInt(p.price) * p.quantity;
    //   });

    //   return sum;
    // },
    // filteredProducts: function () {
    //   return this.products
    //     ? this.products.filter((p) =>
    //         p.name.toLowerCase().match(this.searchQuery.toLowerCase())
    //       )
    //     : this.products;
    // },
  },

  // async mounted() {
  //   this.loadCustomerData();
  // },

  filters: {
    sum_birthdate,
    formatPrice,
  },
};
</script>

<style></style>
