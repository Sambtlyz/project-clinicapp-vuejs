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
            <!-- Add customer -->
            <div class="text-center">
              <v-dialog v-model="dialog" max-width="800px" height="800" flat>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="teal" outlined v-bind="attrs" v-on="on">
                    <v-icon size="15">add</v-icon>
                    เพิ่มยา
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5"
                    ><v-icon>add</v-icon> เพิ่ม - ยา</v-card-title
                  >
                  <v-divider></v-divider>
                  <v-col cols="12">
                    <v-card class="mx-10 pa-5" outlined>
                      <v-form v-model="valid">
                        <v-container>
                          <v-row>
                            <v-col cols="6" >
                              <span>ประเภทยา</span>
                              <span class="red--text text--lighten-1"> *</span>
                              <v-select :items="items"  dense></v-select>
                               <span>ชื่อยา</span
                              ><span class="red--text text--lighten-1"> *</span>
                              <v-text-field
                                v-model="lastname"
                                :rules="nameRules"
                                dense
                                required
                                
                              ></v-text-field>
                              <span>ราคาขาย</span
                              ><span class="red--text text--lighten-1"> *</span>
                              <v-text-field
                                v-model="cardnumber"
                                :rules="cardnumberRules"
                                
                                dense
                                required
                              ></v-text-field>
                            </v-col>

                            <v-col cols="6" >
                              <span>รหัสยา</span
                              ><span class="red--text text--lighten-1"> *</span>
                              <v-text-field
                                v-model="lastname"
                                :rules="nameRules"
                                dense
                                required
                                
                              ></v-text-field>
                              <span>หน่วย</span>
                              <span class="red--text text--lighten-1"> *</span>
                              <v-text-field
                                v-model="lastname"
                                :rules="nameRules"
                                dense
                                required
                                
                              ></v-text-field>
                            </v-col>
                            <v-col cols="10" >
                              <span>วิธีการใช้</span>
                              <v-text-field
                                v-model="cardnumber"
                                :rules="cardnumberRules"
                                required
                              ></v-text-field>
                              </v-col>    
                              <v-col cols="6" >  
                              <span>แพทย์</span>
                              <span class="red--text text--lighten-1"> *</span>
                              <v-select :items="items1"  dense></v-select>             
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-form>
                    </v-card>
                  </v-col>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="dialog = false" >
                      บันทึก
                    </v-btn>
                    <v-btn color="primary" outlined @click="dialog = false" >
                      ยกเลิก
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-toolbar>
        </template>

        <!-- Table tr section -->
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.drug_id_pri }}</td>
            <td>{{ item.drug_id }}</td>
            <td>{{ item.drugtype_id }}</td>
            <td>{{ item.drug_price }}</td>
            <td>{{ item.drug_total }}</td>
            <td>{{ item.drug_unit }}</td>
            <td>
              <v-chip color="success" dark>{{ item.status }}</v-chip>
            </td>
            <td>
              <v-icon class="mr-2"> edit </v-icon>

              <v-icon class="mr-2">delete</v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import Axios from "axios";
export default{
  data(){
    return{
      items:["ยาสามัญประจำบ้าน","ยาแผนโบราณ","ยาแผนปัจจุบัน","ยาอันตราย","ยาควบคุมพิเศษ","ยาสมุนไพร","ยาบรรจุเสร็จ","ยาใช้ภายใน","ยาใช้เฉพาะที่"],
      items1:["แพทย์A","แพทย์B","แพทย์C","แพทย์D"],
      mDataArray:[],
      dialog: false,
      search:"",
      headers:[
        {
          text:"#",
          align:"left"
        },
        {
          text:"รหัส"
        },
        {
          text:"ประเภท"
        },
        {
          text:"ราคาขาย"
        },
        {
          text:"คงเหลือ"
        },
        {
          text:"หน่วย"
        },
        {
          text:"สถานะ"
        },
        {
          text:"ตัวเลือก"
        },
      ],
    };
  },

  mounted() {
    console.log("drugs is running ");
    Axios.get("http://localhost:8081/api/v2/drug").then((result) => {
      console.log(JSON.stringify(result.data)), (this.mDataArray = result.data);
    });
  },
  methods: {},
};
</script>

<style>

</style>