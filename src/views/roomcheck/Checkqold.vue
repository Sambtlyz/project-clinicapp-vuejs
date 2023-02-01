<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <span
        ><v-icon class="pl-2">mdi-account-multiple</v-icon> ข้อมูลลูกค้า</span
      >
      <v-spacer></v-spacer>
      <v-data-table :search="search" :headers="headers" :items="mDataArray">
        <!-- top section -->
        <template v-slot:top>
          <v-toolbar flat>
            <v-text-field
              v-model="search"
              name="search"
              label="ค้าหารายชื่อลูกค้า"
              prepend-icon="search"
              single-line
              hide-details=""
            ></v-text-field>

            <v-spacer></v-spacer>

            
          </v-toolbar>
        </template>


        <template v-slot:[`item.customerData`]="{ item }">
          {{ mDataArray.indexOf(item) + 1 }}
        </template>
        <!-- รูปโปรไฟล์ -->
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
        <!-- ชื่อ-นามสกุล -->
        <template v-slot:[`item.customer_fname`]="{ item }">
          <td>
            {{ item.customer_prefix }} {{ item.customer_fname }}
            {{ item.customer_lname }}
          </td>
        </template>
        <!-- เพศ -->
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
        
      
        <!-- เพิ่มเติม -->
        <template v-slot:[`item.options`]="{ item }">
         
          <v-chip color="info" @click="roomcheck(item)" small>
            <v-icon class="mr-2">mdi-file-document</v-icon>
            ตรวจ</v-chip
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
import CustomerAdd from "@/components/cards/CustomerAdd";

import { sumdate } from "@/components/hooks/filter"


import api from "@/services/api";

export default {
  name: "Customer",
  data() {
    return {
      search: "",
      items: [{ title: "แก้ไข" }, { title: "ลบ" }],

      mDataArray: [],
      deleteCustomerID: "",
      confirmDeleteDialog: false,
      headers: [
        {
          text: "#",
          align: "left",
          sortable: false,
          value: "customerData",
        },
        { text: "รูปภาพ", value: "customer_image", align: "start" },
        { text: "รหัสลูกค้า", value: "customer_id", align: "start" },
        { text: "ชื่อ-นามสกุล", value: "customer_fname", align: "start" },
        { text: "เลขบัตรประชาชน", value: "customer_idcard", align: "center" },
        { text: "เพศ", value: "customer_gender" },
      

        { text: "เพิ่มเติม", value: "options", align: "center" },
      ],
    };
  },
  methods: {
    roomcheck(item){
      this.$router.push(`/roomcheck/${item.customer_id_pri}`)
    },
  
    deleteItem(item) {
      this.deleteCustomerID = item.customer_id_pri;
      this.confirmDeleteDialog = true;
    },
    async confirmDelete() {
      await api.deleteCustomer(this.deleteCustomerID);
      // console.log(loadCustomers)
      this.confirmDeleteDialog = false;
      this.loadCustomers();
    },
    async loadCustomers() {
      let result = await api.getCustomers();
      this.mDataArray = result.data;
    },
  },
  components: {
    CustomerAdd,
  },

  async mounted() {
    this.loadCustomers();
  },
  filters: {
    sumdate
  },
  
};
</script>

<style>
.v-data-table-headers th {
  white-space: nowrap;
}
</style>