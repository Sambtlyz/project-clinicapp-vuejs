<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <span><v-icon class="pl-2">mdi-stethoscope</v-icon> รายการตรวจ</span>
      <v-data-table :search="search" :headers="headers" :items="mDataArray">
        <!-- top section -->
        <template v-slot:top>
          <v-toolbar flat>
            <v-text-field
              v-model="search"
              name="search"
              label="ค้นหารายการตรวจ"
              prepend-icon="search"
              single-line
              hide-details=""
            ></v-text-field>
            <v-spacer></v-spacer>
            <PolicingAdd />
          </v-toolbar>
        </template>

        <!-- ลำดับ -->
        <template v-slot:[`item.policingData`]="{ item }">
          {{ mDataArray.indexOf(item) + 1 }}
        </template>
        
        <!-- หมวดหมู่การตรวจ -->
        <!-- <template v-slot:[`item.policingtype_name`] = "{ item }">
          <td>{{ item.policingtype_name }}</td>
        </template> -->

        <!-- ตัวเลือก -->
        <template v-slot:[`item.options`]="{ item }">
          <v-chip color="info" @click="editItem(item)" small>
          <v-icon class="mr-1"> edit {{ item.options }}</v-icon>แก้ไข</v-chip>
          <v-chip color="error" @click="deleteItem(item)" small><v-icon class="mr-1">delete</v-icon>ลบ</v-chip>
        </template>

        <!-- ราคา -->
        <template v-slot:[`item.checking_cost`]="{ item }">
          <td>{{ item.checking_cost | currency("฿") }}</td>
        </template>
      </v-data-table>


      <!-- Delete Dialog Confirm -->
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
      </v-dialog  >
    </v-card>
  </v-container>
</template>

<script>
import api from "@/services/api";
import PolicingAdd from "@/components/cards/PolicingAdd";
export default {
  data() {
    return {
      mDataArray: [],
      search: "",
      selectType:"",
      policingtypelist: [],
      confirmDeleteDialog: false,
      headers: [
        {
          text: "#",
          align: "left",
          value: "policingData",
        },
        {
          text: "หมวดหมู่การตรวจ",
          value: "policingtype_name",
        },
        {
          text: "รหัสการตรวจ",
          value: "policing_id",
        },
        {
          text: "ชื่อรายการตรวจ",
          value: "policing_name",
        },
        {
          text: "ค่าบริการ",
          value: "policing_cost",
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
    async loadPolicings() {
      let result = await api.getPolicings();
      // this.mDataArray = result.data;

      let data = await api.getPolicingtype();
      // return datatype
      this.policingtypeData = data.data;

       this.mDataArray = result.data.map(item => {
        item.policingtype_name = this.policingtypeData.find(sub => sub.policingtype_id == item.policingtype_id).policingtype_name
        return item 
      })
      
    },
    editItem(item) {
      this.$router.push(`/policingedit/${item.policing_id_pri}`);
      // alert(JSON.stringify(result))
    },
    deleteItem(item) {
      this.deletePolicingID = item.policing_id_pri;
      this.confirmDeleteDialog = true;
    },
    async confirmDelete() {
      await api.deletePolicing(this.deletePolicingID);
      // console.log(loadCustomers)
      this.confirmDeleteDialog = false;
      this.loadPolicings();
    },
  },
  async mounted() {
    this.loadPolicings();
  },
  components: {
    PolicingAdd,
  },
};
</script>

<style></style>
