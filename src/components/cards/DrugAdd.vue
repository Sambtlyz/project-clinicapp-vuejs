<template>
  <div class="text-center">
    <v-btn color="teal" outlined @click="drugAdd()">
      <v-icon size="15">add</v-icon>
      เพิ่มยา
    </v-btn>
    <v-dialog v-model="dialog" max-width="800px" height="800" flat>
      <v-card>
        <v-card-title class="text-h5"
          ><v-icon>add</v-icon> เพิ่ม - ยา</v-card-title
        >
        <v-divider></v-divider>
        <v-col cols="12">
          <v-card class="mx-10 pa-5" outlined>
            <v-form @click.prevent="submit" ref="form">
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <span>ประเภทยา</span>
                    <span class="red--text text--lighten-1"> *</span>
                    <v-select
                      solo
                      dense
                      :items="drugtypeslist"
                      item-text="drugtype_name"
                      item-value="drugtype_id"
                      v-model="drug.drugtype_id"
                    >
                    </v-select>

                    <span>ชื่อยา</span
                    ><span class="red--text text--lighten-1"> *</span>
                    <v-text-field
                      v-model="drug.drug_name"
                      :rules="RulesCheck"
                      outlined
                      dense
                      required
                    ></v-text-field>
                    <span>ราคาขาย</span
                    ><span class="red--text text--lighten-1"> *</span>
                    <v-text-field
                      v-model="drug.drug_price"
                      :rules="RulesCheck"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6">
                    <!-- <span>รหัสยา</span
                    ><span class="red--text text--lighten-1"> *</span>
                    <v-text-field
                      v-model="drug.drug_id"
                      :rules="RulesCheck"
                      outlined
                      dense
                      required
                    ></v-text-field> -->
                    <span>หน่วย</span>
                    <span class="red--text text--lighten-1"> *</span>
                    <v-text-field
                      v-model="drug.drug_unit"
                      :rules="RulesCheck"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="10">
                    <v-form>
                      <span>วิธีการใช้</span>
                      <v-textarea
                        outlined
                        v-model="drug.drug_direction"
                      ></v-textarea>
                    </v-form>
                  </v-col>
                  <v-col cols="6">
                    <!-- <span>แพทย์</span>
                    <span class="red--text text--lighten-1"> *</span>
                    <v-select
                      :items="items1"
                      dense
                      v-model="drug.user_fullname"
                      :rules="RulesCheck"
                      solo
                      placeholder="เลือกแพทย์"
                    ></v-select> -->
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
      drug: {
        drug_id: "",
        drugtype_id: "",
        drug_name: "",
        drug_unit: "",
        drug_price: "",
        user_fullname: "",
        drug_direction: "",
      },
      dialog: false,
      isLoading: false,
      items: [],
      selectType: "",
      drugtypeslist: [],
      items1: ["แพทย์A", "แพทย์B", "แพทย์C", "แพทย์D"],
      // value: result,
      //   options: [
      //     'Batman',
      //     'Robin',
      //     'Joker',
      //   ],
      //       customerData : new DataManager({
      //   url: 'https://services.odata.org/V4/Northwind/Northwind.svc/',
      //   adaptor: new ODataV4Adaptor,
      //   crossDomain: true
      // }),
      // query : new Query().from('Customers').select(['ContactName', 'CustomerID']).take(6),
      // fields : { text: 'ContactName', value: 'CustomerID' },
      RulesCheck: [(v) => !!v || "กรุณากรอกข้อมูล"],
    };
  },
  methods: {
    async submit() {
      let formData = new FormData();
      const {
        drug_id,
        drugtype_id,
        drug_name,
        drug_unit,
        drug_price,
        user_fullname,
        drug_direction,
      } = this.drug;
      if (this.$refs.form.validate()) {
        formData.append("drug_id", drug_id);
        formData.append("drugtype_id", drugtype_id);
        formData.append("drug_name", drug_name);
        formData.append("drug_unit", drug_unit);
        formData.append("drug_price", drug_price);
        formData.append("user_fullname", user_fullname);
        formData.append("drug_direction", drug_direction);
        await api.addDrug(formData);
        this.$router.go("/drugadd");
      }
    },

    async loadDrugtypes() {
      let result = await api.getDrugtypes();
      this.mDataArray = result.data;
    },
    async drugAdd() {
      await this.getDrugtypelist();
      this.dialog = true;
    },

    async getDrugtypelist() {
      let datadrugtypes = await api.getDrugtypes();

      this.drugtypeslist = datadrugtypes.data;
      this.selectType = datadrugtypes.data[0].drugtype_id;
    },
  },
  async mounted() {
    this.loadDrugtypes();
  },
  
};
</script>

