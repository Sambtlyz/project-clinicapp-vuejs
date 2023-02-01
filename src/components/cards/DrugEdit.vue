<template>
  <v-col cols="12">
    <v-card class="mx-10 pa-5">
      <v-card-actions>
        <v-btn color="primary" @click="$router.back('/drugedit')" outlined>
          ย้อนกลับ
        </v-btn>
        <v-btn color="primary" @click="submit"> บันทึก </v-btn>
        <v-spacer></v-spacer>
        <span
          ><v-icon class="pl-2">mdi-account-multiple</v-icon> แก้ไขข้อมูล</span
        >
      </v-card-actions>
      <v-form @click.prevent="submit" ref="form">
        <v-container>
          <v-row>
            <v-col cols="6">
              <span>ประเภทยา</span>
              <span class="red--text text--lighten-1"> *</span>
              <v-select
                :items="drugtypeslist"
                dense
                solo
                placeholder="เลือกประเภท"
                item-text="drugtype_name"
                item-value="drugtype_id"
                v-model="drug.drugtype_id"
              ></v-select>
              <span>ชื่อยา</span
              ><span class="red--text text--lighten-1"> *</span>
              <v-text-field
                v-model="drug.drug_name"
                outlined
                dense
                required
              ></v-text-field>
              <span>ราคาขาย</span
              ><span class="red--text text--lighten-1"> *</span>
              <v-text-field
                v-model="drug.drug_price"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <span>รหัสยา</span
              ><span class="red--text text--lighten-1"> *</span>
              <v-text-field
                v-model="drug.drug_id"
                outlined
                dense
                required
              ></v-text-field>
              <span>หน่วย</span>
              <span class="red--text text--lighten-1"> *</span>
              <v-text-field
                v-model="drug.drug_unit"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="10">
              <v-form>
                <span>วิธีการใช้</span>
                <v-textarea outlined v-model="drug.drug_direction"></v-textarea>
              </v-form>
            </v-col>
            <v-col cols="6">
              <span>แพทย์</span>
              <span class="red--text text--lighten-1"> *</span>
              <v-select
                :items="items1"
                dense
                v-model="drug.user_fullname"
                solo
                placeholder="เลือกแพทย์"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-col>
</template>

<script>
import api from "@/services/api";
export default {
  data() {
    return {
      drug: {
        drug_id_pri: "",
        drug_id: "",
        drugtype_id: "",
        drug_name: "",
        drug_unit: "",
        drug_price: "",
        user_fullname: "",
        drug_direction: "",
      },
      dialog: false,  
      drugtypeslist:[],
      selectType:"",
      items1: ["แพทย์A", "แพทย์B", "แพทย์C", "แพทย์D"],
    };
  },
  methods: {
    async submit() {
      let formData = new FormData();
      const {
        drug_id_pri,
        drug_id,
        drugtype_id,
        drug_name,
        drug_unit,
        drug_price,
        user_fullname,
        drug_direction,
      } = this.drug;
      formData.append("drug_id_pri", drug_id_pri);
      formData.append("drug_id", drug_id);
      formData.append("drugtype_id", drugtype_id);
      formData.append("drug_name", drug_name);
      formData.append("drug_unit", drug_unit);
      formData.append("drug_price", drug_price);
      formData.append("user_fullname", user_fullname);
      formData.append("drug_direction", drug_direction);
      await api.updateDrug(formData);
      // console.log(formData)
      this.$router.back();
    },
     async loadDrugtypes() {
      let result = await api.getDrugtypes();
      this.mDataArray = result.data;
    },
  },
  async mounted() {
    let result = await api.getDrugById(this.$route.params.drug_id_pri);
    this.drug = result.data;
    // alert(JSON.stringify(result.data))
    

    let datadrugtypes = await api.getDrugtypes() 

      this.drugtypeslist = datadrugtypes.data;
      this.selectType = datadrugtypes.data[0].drugtype_id

    
  },
  
  
};
</script>
