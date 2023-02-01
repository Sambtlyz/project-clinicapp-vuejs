<template>
  <v-container>
    <v-card>
      <span><v-icon class="pl-2">mdi-pill</v-icon> เพิ่มประเภทของยา</span>
      <v-data-table :search="search" :headers="headers" :items="mDataArray">
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

            <div class="text-center">
              <v-dialog v-model="dialog" max-width="800px" height="800" flat>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="teal" outlined v-bind="attrs" v-on="on">
                    <v-icon size="15">add</v-icon>
                    เพิ่มประเภทของยา
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5"
                    ><v-icon>add</v-icon> เพิ่ม - ประเภทยา</v-card-title
                  >
                  <v-divider></v-divider>
                  <v-col cols="12">
                    <v-card class="mx-10 pa-5" outlined>
                      <v-form @click.prevent="submit" ref="form">
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <span>ประเภทยา</span>
                              <span class="red--text text--lighten-1"> *</span>
                              <v-text-field
                                :rules="RulesCheck"
                                v-model="drugtype.drugtype_name"
                                outlined
                                dense
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-form>
                    </v-card>
                  </v-col>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="submit()"> บันทึก </v-btn>
                    <v-btn color="primary" outlined @click="dialog = false">
                      ยกเลิก
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-toolbar>
        </template>

        <template v-slot:[`item.drugtype_num`]= "{ item}"> 
            {{ mDataArray.indexOf(item) + 1}}
        </template>

        <template v-slot:= "{ item}"> 
            <td>{{item.drugtype_name}}</td>
        </template>

          <!-- เพิ่มเติม -->
        <template v-slot:[`item.options`]="{ item }">
            <v-chip color="info" @click="editItem(item)" small >
            <v-icon   class="mr-1">
              edit {{ item.options }}</v-icon
            >แก้ไข</v-chip>
            <v-chip color="error" @click="deleteItem(item)" small><v-icon class="mr-1" >delete</v-icon>ลบ</v-chip>

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
         
        </template>

        

        
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import api from "@/services/api";
export default {
  data() {
    return {
      dialog: false,
      confirmDeleteDialog: false,
      search: "",
      RulesCheck: [
        v=>!! v || "กรุณากรอกข้อมูล"
      ],
      mDataArray:[],
      headers:[ {text:"#" , align:"left", value:"drugtype_num"}, {text:"ประเภทยา" , value:"drugtype_name"} ,{},{},{},{ text:"ตัวเลือก" , value:"options" , align:"center"}],
      drugtype: {
        drugtype_name: "",
      },
    };
  },
  methods: {
   async submit() {
      let formData = new FormData();
      const { drugtype_name } = this.drugtype;
      if(this.$refs.form.validate()){
       formData.append("drugtype_name",drugtype_name);    
       await api.addDrugtype(formData);
        this.$router.go('/drugtype')
      }
    //   console.log(formData)
    },
    async loadDrugtypes() {
      let result = await api.getDrugtypes();
      this.mDataArray = result.data;
    },
    editItem(item) {
      this.$router.push(`/drugtype-edit/${item.drugtype_id}`);
      // alert(JSON.stringify(result))
    },
    deleteItem(item) {
      this.deleteDrugID = item.drugtype_id;
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
        this.loadDrugtypes();
    },
};
</script>

<style>
</style>