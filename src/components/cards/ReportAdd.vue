<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="800px" height="800" flat>
      <template v-slot:activator="{ on, attrs }">
        <v-row  justify="end" class="mb-2">
        <v-btn
          color="teal"
          outlined
          v-bind="attrs"
          v-on="on"
          @click="getPolicingAdd()"
        >
          <v-icon size="15">add</v-icon>
          เพิ่มรายการตรวจ
        </v-btn>
        </v-row>
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
                    <span>รายการตรวจรักษา</span>
                    <span class="red--text text--lighten-1"> *</span>
                    <v-autocomplete
                      
                      :items="policinglist"
                      item-text="policing_name"
                      item-value="policing_id_pri"
                     v-model="Policingselect"
                      outlined
                      dense
                      solo
                      required
                    >
                    <template v-slot:item="{ item }">
                              <v-row>
                                <v-col
                                  cols="12"
                                  class="d-flex justify-content-between"
                                >
                                  <p>{{ item.policing_name }}</p>
                                  <p>{{ item.policing_id }}</p>
                                </v-col>
                              </v-row>
                            </template>
                    </v-autocomplete>
                    <span>ค่าบริการ</span>
                    <span class="red--text text--lighten-1"> *</span>
                    <v-text-field
                      
                      v-model="Policingselect.policing_cost"
                      suffix="฿"
                      hide-details
                            style="width: 150px"
                            class="mb-2"
                            disabled
                            type="number"
                            solo
                            dense
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
          <v-btn color="primary" > บันทึก </v-btn>
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
      // policing: {
      //   policingtype_id: "",
      //   policing_id: "",
      //   policing_name: "",
      //   policing_cost: "",
      // },
      Policingselect:"",
      dialog: false,
      policinglist: [],
      cartData:[],
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
  async mounted(){
    this.getPolicingList();
  },
  methods: {
  async  getPolicingList(){
      let data = await api.getPolicings()
      this.policinglist = data.data
      this.policing_name = data.data[0].policling_id_pri;
      // this.cartData = data.data
    },
    async getPolicingAdd() {
      await this.getPolicingList();
      this.Policingselect = ""
      this.dialog = true;
    },
    policing(value) {
      this.sum = this.policing.policing_cost
    }
  },

  
};
</script>