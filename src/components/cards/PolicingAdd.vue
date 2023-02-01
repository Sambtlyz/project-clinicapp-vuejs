<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="800px" height="800" flat>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="teal"
          outlined
          v-bind="attrs"
          v-on="on"
          @click="getPolicingtypeAdd()"
        >
          <v-icon size="15">add</v-icon>
          เพิ่มรายการตรวจ
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5"
          ><v-icon>add</v-icon> เพิ่ม - รายการตรวจ</v-card-title
        >
        <v-divider></v-divider>
        <v-col cols="12">
          <v-card class="mx-10 pa-5" outlined>
            <v-form @click.prevent="submit" ref="form">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <span>หมวดหมู่การตรวจ</span>
                    <span class="red--text text--lighten-1"> *</span>
                    <v-select
                      :rules="RulesCheck"
                      :items="policingtypelist"
                      item-text="policingtype_name"
                      item-value="policingtype_id"
                      v-model="policing.policingtype_id"
                      outlined
                      dense
                      solo
                      required
                    ></v-select>
                    <!-- <span>รหัสการตรวจ</span>
                    <v-text-field
                      v-model="policing.policing_id"
                      :rules="RulesCheck"
                      dense
                      solo
                      required
                    ></v-text-field> -->
                    <span>ชื่อรายการตรวจ</span>
                    <span class="red--text text--lighten-1"> *</span>
                    <v-text-field
                      v-model="policing.policing_name"
                      :rules="RulesCheck"
                      dense
                      solo
                      required
                    ></v-text-field>
                    <span>ค่าบริการ</span>
                    <span class="red--text text--lighten-1"> *</span>
                    <v-text-field
                      v-model="policing.policing_cost"
                      :rules="RulesCheck"
                      dense
                      solo
                      required
                      suffix="฿"
                      label="0.00"
                      outlined
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
</template>

<script>
import api from "@/services/api";
export default {
  data() {
    return {
      policing: {
        policingtype_id: "",
        policing_id: "",
        policing_name: "",
        policing_cost: "",
      },
      dialog: false,
      policingtypelist: [],
      selectType: "",
      items: [
        "Botox",
        "Laboratory",
        "กายภาพ",
        "ตรวจการได้ยิน",
        "ตรวจทั่วไป",
        "ตรวจสภาพผม",
        "ตรวจสภาพผม",
        "ตรวจภายใน",
        "ตรวจเลือด",
      ],
      RulesCheck: [(v) => !!v || "กรุณากรอกข้อมูล"],
    };
  },
  methods: {
    async submit() {
      let formData = new FormData();
      const { policingtype_id, policing_id, policing_name, policing_cost } =
        this.policing;
      if (this.$refs.form.validate()) {
        formData.append("policingtype_id", policingtype_id);
        formData.append("policing_id", policing_id);
        formData.append("policing_name", policing_name);
        formData.append("policing_cost", policing_cost);
        await api.addPolicing(formData);
        // console.log(formData)
        this.$router.go("/policingadd");
      }
    },
    async loadPolicingtype() {
      let result = await api.getPolicingtype();
      this.mDataArray = result.data;

      // let data = await api.getPolicingtypelist();
      // this.dataType = data.data

     
    },
    async getPolicingtypeAdd() {
      await this.getPolicingtypelist();
      this.dialog = true;
    },
    async getPolicingtypelist() {
      let dataPolicingtype = await api.getPolicingtype();
      this.policingtypelist = dataPolicingtype.data;

      this.selectType = dataPolicingtype.data[0].policingtype_id;
    },
  },

  async mounted() {
    this.loadPolicingtype();
  },
};
</script>
