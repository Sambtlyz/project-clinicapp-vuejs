<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <span
        ><v-icon class="pl-2">mdi-pill</v-icon>  คลังยา</span
      >
      <v-data-table :search="search" :headers="headers" :items="mDataArray">
        <!-- top section -->
        <template v-slot:top>
          <v-toolbar flat>
            <v-text-field
              v-model="search"
              name="search"
              label="ค้นหารายชื่อยา"
              prepend-icon="search"
              single-line
              hide-details=""
            ></v-text-field>
            <v-spacer></v-spacer>
          <DrugAdd />
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


        <template v-slot:[`item.drugData`]= "{ item}"> 
            {{ mDataArray.indexOf(item) + 1}}
        </template>

        <!-- <template v-slot:[`item.drugtype_id`]= "{ item}">
          {{ item.drugtype_name}}
        </template> -->

          <!-- สถานะ -->
        <template v-slot:[`item.drug_status_id`]="{ item }">
          <v-chip
            color="success"
            small
            class="text-white"
            label
            v-if="item.drug_status_id == '1'"
          >
            <v-icon left class="text-white">mdi-check</v-icon>
            ปกติ
          </v-chip>
          <v-chip color="error" class="text-white" small label v-else>
            <v-icon left class="text-white">mdi-minus-circle</v-icon>
            ระงับ</v-chip
          >
        </template>

        <!-- เพิ่มเติม -->
        <template v-slot:[`item.options`]="{ item }">
            <v-chip color="info" @click="editItem(item)" small >
            <v-icon   class="mr-1">
              edit {{ item.options }}</v-icon
            >แก้ไข</v-chip>
           <!-- <v-chip color="primary" small> <v-icon class="mr-1" >mdi-format-align-justify</v-icon>เพิ่มเติม</v-chip> -->
            <v-chip color="error" @click="deleteItem(item)" small><v-icon class="mr-1" >delete</v-icon>ลบ</v-chip>
         
        </template>

        <!-- ราคา -->
        <template v-slot:[`item.drug_price`]="{ item }">
            <td>{{ item.drug_price | currency("฿")    }}</td>
        </template>
        <!-- หน่วยและคงเหลือ -->
        <!-- <template v-slot:[`item.drug_total` ``]="{ item }">
          <td> {{item.drug_unit}}</td>
        </template> -->

        

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
import DrugAdd from "@/components/cards/DrugAdd";
export default {
  data(){
    return{
      // items:["ยาสามัญประจำบ้าน","ยาแผนโบราณ","ยาแผนปัจจุบัน","ยาอันตราย","ยาควบคุมพิเศษ","ยาสมุนไพร","ยาบรรจุเสร็จ","ยาใช้ภายใน","ยาใช้เฉพาะที่"],
      // items1:["แพทย์A","แพทย์B","แพทย์C","แพทย์D"],
      mDataArray:[],
      search:"",
      drugtypeData:{},
      confirmDeleteDialog: false,
      headers:[
        {
          text:"#",
          align:"left" , value:"drugData"
        },
        {
          text:"รหัสยา", value:"drug_id"
        },
        {
          text:"ชื่อยา", value:"drug_name"
        },
        {
          text:"ประเภท", value:"drugtype_name"
        },
        {
          text:"ราคาขาย", value:"drug_price"
        },
        // {
        //   text:"คงเหลือ", value:"drug_total" 
        // },
        {
          text:"หน่วย", value:"drug_unit"
        },
        {
          text:"สถานะ", value:"drug_status_id"
        },
        {
          text:"ตัวเลือก", value:"options", align:"center"
        },
      ]
    }
  },
  methods: {
    async loadDrugs() {
      let result = await api.getDrugs();
    //  this.mDataArray = result.data
      console.log(' this.mDataArray ',  this.mDataArray )
      let data = await api.getDrugtypes();
      this.drugtypeData = data.data;

       this.mDataArray = result.data.map(item => {
         console.log('item.drugtype_id ' , item.drugtype_id )
        item.drugtype_name = this.drugtypeData.find(sub => sub.drugtype_id == item.drugtype_id).drugtype_name
        return item ;
      });

      console.log(' this.drugtypeData  ', this.drugtypeData  )

    },
    editItem(item) {
      this.$router.push(`/drugedit/${item.drug_id_pri}`);
      // alert(JSON.stringify(result))
    },
    deleteItem(item) {
      this.deleteDrugID = item.drug_id_pri;
      this.confirmDeleteDialog = true;
    },
    async confirmDelete() {
      await api.deleteDrug(this.deleteDrugID);
      // console.log(loadCustomers)
      this.confirmDeleteDialog = false;
      this.loadDrugs();
    },
  },
   async mounted() {
    this.loadDrugs();
  },
  components:{
    DrugAdd,
  }
}
</script>

<style>

</style>