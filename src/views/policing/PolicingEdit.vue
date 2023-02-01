<template>
  <v-col cols="12">
    <v-card class="mx-10 pa-5" outlined>
      <v-card-actions>
        <v-btn color="primary" @click="$router.back('/customer-edit')" outlined>
          ย้อนกลับ
        </v-btn>
        <v-btn color="primary" @click="submit"> บันทึก </v-btn>
        <v-spacer></v-spacer>
        <span
          ><v-icon class="pl-2">mdi-account-multiple</v-icon> แก้ไขข้อมูล    <h1>{{ policing.policingtype_name }}</h1></span
        >
      </v-card-actions>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-form @click.prevent="submit" ref="form">
                <v-col cols="6">
                  <span>หมวดหมู่การตรวจ</span>
                  <span class="red--text text--lighten-1"> *</span>
                  <v-select
                    v-model="policing.policingtype_id"
                    :items="policingtypelist"
                    item-text="policingtype_name"
                    item-value="policingtype_id"
                    placeholder="เลือกประเภท"
                    dense
                    solo
                  ></v-select>
                </v-col>
                <!-- <v-col cols="6">
                  <span>หมวดหมู่การตรวจ</span>
                  <span class="red--text text--lighten-1"> *</span>
                  <v-select
                    v-model="policing.policingtype_id"
                    :items="items1"
                    
                    placeholder="เลือกประเภท"
                    dense
                    solo
                  ></v-select>
                </v-col> -->
                <v-col cols="6">
                  <span>รหัสการตรวจ</span>
                  <v-text-field
                    v-model="policing.policing_id"
                    
                    dense
                    solo
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <span>รายการตรวจ</span>
                  <span class="red--text text--lighten-1"> *</span>
                  <v-text-field
                    v-model="policing.policing_name"
                   
                    dense
                    solo
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <span>ค่าบริการ</span>
                  <span class="red--text text--lighten-1"> *</span>
                  <v-text-field
                    v-model="policing.policing_cost"
                    
                    dense
                    solo
                    required
                    suffix="฿"
                    label="0.00"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-form>
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
      policing: {
        policing_id_pri: "",
        policingtype_id: "",
        policing_id: "",
        policing_name: "",
        policing_cost: "",
      },
      dialog: false,
      policingtypelist:[],
      selectType:"",
      items1: ["แพทย์A", "แพทย์B", "แพทย์C", "แพทย์D"],
    };
  },
  methods: {
    async submit() {
      let formData = new FormData();
      const {
        policing_id_pri,
        policingtype_id,
        policing_id,
        policing_name,
        policing_cost,
      } = this.policing;
      //   if (this.$refs.form.validate()) {
      formData.append("policing_id_pri", policing_id_pri);
      formData.append("policingtype_id", policingtype_id);
      formData.append("policing_id", policing_id);
      formData.append("policing_name", policing_name);
      formData.append("policing_cost", policing_cost);
      await api.updatePolicing(formData);
      // console.log(formData)
      this.$router.back();
      //   }
    },
    async loadPolicingtypes() {
      let result = await api.getPolicingtype();
      this.mDataArray = result.data;
    },
  },
  async mounted() {
    let result = await api.getPolicingById(this.$route.params.policing_id_pri);
    this.policing = result.data;
    // alert(JSON.stringify(result.data))
    

    let datapolicingtype = await api.getPolicingtype();

    this.policingtypelist = datapolicingtype.data;
    this.selectType = datapolicingtype.data[0].policingtype_id;
  },
};
</script>
