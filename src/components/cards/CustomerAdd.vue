<template>
  <!-- Add customer -->
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="1200px" height="1200" flat>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="teal" outlined v-bind="attrs" v-on="on">
          <v-icon size="15">add</v-icon>
          เพื่มลูกค้า
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5"
          ><v-icon>add</v-icon>เพิ่ม - ลูกค้า</v-card-title
        >
        <v-divider></v-divider>
        <v-col cols="12">
          <v-card class="mx-10 pa-5" outlined>
            <v-form @submit.prevent="submit" ref="form">
              <v-container>
                <v-row>
                  <v-col cols="4" md="2" sm="6" pa-5>
                    <v-avatar size="150">
                      <img
                        v-if="imageURL"
                        :src="imageURL"
                        pb-5
                        lazy-src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                        alt="alt"
                      />
                    </v-avatar>
                    <div class="pt-2">
                      <!-- <v-btn color="primary" outlined><input @change="Uploadimage" type="file" name="" id="" /></v-btn> -->
                      <v-btn
                        color="primary"
                        @click="$refs.Uploadimage.click()"
                        outlined
                        >อัพโหลดรูปภาพ</v-btn
                      >
                      <input
                        v-show="false"
                        ref="Uploadimage"
                        type="file"
                        @change="Uploadimage"
                        customer_id_pri=""
                      />
                    </div>
                  </v-col>

                  <v-spacer></v-spacer>

                  <!-- <v-col cols="8" md="2" sm="3">
                    <span>รหัสลูกค้า</span
                    ><span class="red--text text--lighten-1"> *</span>
                    <v-text-field
                      v-model="customer.customer_id"
                      :rules="RulesCheck"
                      dense
                      required
                      outlined
                      mt-3
                    ></v-text-field>
                  </v-col> -->

                  <v-col cols="12" md="4" sm="3">
                    <span>ชื่อ</span
                    ><span class="red--text text--lighten-1"> *</span>
                    <v-text-field
                      v-model="customer.customer_fname"
                      :rules="RulesCheck"
                      dense
                      required
                      outlined
                      mt-3
                    ></v-text-field>
                    <span>คำนำหน้า</span>
                    <v-select
                      :items="items1"
                      placeholder="เลือกคำนำหน้า"
                      solo
                      dense
                      v-model="customer.customer_prefix"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="4">
                    <span>นามสกุล</span
                    ><span class="red--text text--lighten-1"> *</span>
                    <v-text-field
                      v-model="customer.customer_lname"
                      :rules="RulesCheck"
                      dense
                      required
                      outlined
                    ></v-text-field>
                    <span>เพศ</span>
                    <v-select
                      :items="items"
                      placeholder="เลือกเพศ"
                      solo
                      dense
                      v-model="customer.customer_gender"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="4">
                    <span>วันเกิด</span>
                    <v-menu
                      v-model="selectdate"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="customer.customer_birthdate"
                          dense
                          outlined
                          required
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="customer.customer_birthdate"
                        @input="selectdate = false"
                        locale="th"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="12" md="4">
                    <span>เลขบัตรประชาชน</span
                    ><span class="red--text text--lighten-1"> *</span>
                    <v-text-field
                      v-model="customer.customer_idcard"
                      :rules="maxRules"
                      outlined
                      type="number"
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <span>เบอร์โทรศัพท์</span>
                    <v-text-field
                      v-model="customer.customer_tel"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <span>กรุ๊ปเลือด</span>
                    <v-select
                      :items="items2"
                      placeholder="เลือกกรุ๊ปเลือด"
                      solo
                      dense
                      v-model="customer.customer_blood"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <span>Email</span>
                    <v-text-field
                      v-model="customer.customer_email"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <span>ที่อยู่</span>
                    <v-text-field
                      v-model="customer.customer_address"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <span>ตำบล</span>
                    <v-text-field
                      v-model="customer.customer_district"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4" sm="6">
                    <span>อำเภอ</span>
                    <v-text-field
                      v-model="customer.customer_amphoe"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <span>จังหวัด</span>
                    <v-text-field
                      v-model="customer.customer_province"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <span>รหัสไปรษณี</span>
                    <v-text-field
                      v-model="customer.customer_zipcode"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <span>แพ้ยา</span>
                    <v-text-field
                      v-model="customer.customer_allergic"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <span>โรคประจำตัว</span>
                    <v-text-field
                      v-model="customer.customer_disease"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <span>หมายเหตุ</span>
                    <v-text-field
                      v-model="customer.customer_comment"
                      outlined
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="submit"> บันทึก </v-btn>
                    <v-btn color="primary" outlined @click="dialog = false">
                      ยกเลิก
                    </v-btn>
                  </v-card-actions>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-col>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from "@/services/api";
export default {
  name: "CustomerCard",
  data() {
    return {
      dialog: false,
      items: ["ชาย", "หญิง"],
      items1: ["นาย", "นางสาว", "นาง", "ด.ช.", "ด.ญ."],
      items2: ["A", "B", "AB", "O"],
      RulesCheck: [(v) => !!v || "กรุณากรอกข้อมูล"],
      maxRules: [
        (v) => !!v || "กรุณากรอกเลขบัตรประชาชน",
        (v) =>
          (v && v.length <= 13) ||
          "!!!!ต้องมีอักษรไม่เกิน 13 ตัว",
      ],
      selectdate: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      customer: {
        customer_id: "",
        customer_fname: "",
        customer_fname: "",
        customer_birthdate: "",
        customer_prefix: "",
        customer_gender: "",
        customer_idcard: "",
        customer_blood: "",
        customer_tel: "",
        customer_email: "",
        customer_address: "",
        customer_district: "",
        customer_amphoe: "",
        customer_province: "",
        customer_zipcode: "",
        customer_allergic: "",
        customer_disease: "",
        customer_comment: "",
        customer_image: null,
      },
      imageURL: null,
    };
  },

  methods: {
    cancel() {
      this.$router.back("/customer");
    },
    Uploadimage(event) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // preview image
        this.imageURL = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      // upload image
      this.customer.customer_image = event.target.files[0];
    },
    async submit() {
      let formData = new FormData();
      const {
        customer_id,
        customer_fname,
        customer_lname,
        customer_birthdate,
        customer_prefix,
        customer_gender,
        customer_idcard,
        customer_blood,
        customer_tel,
        customer_email,
        customer_address,
        customer_district,
        customer_amphoe,
        customer_province,
        customer_zipcode,
        customer_allergic,
        customer_disease,
        customer_comment,
      } = this.customer;
      if (this.$refs.form.validate()) {
        formData.append("customer_id", customer_id);
        formData.append("customer_fname", customer_fname);
        formData.append("customer_lname", customer_lname);
        formData.append("customer_birthdate", customer_birthdate);
        formData.append("customer_prefix", customer_prefix);
        formData.append("customer_gender", customer_gender);
        formData.append("customer_idcard", customer_idcard);
        formData.append("customer_blood", customer_blood);
        formData.append("customer_tel", customer_tel);
        formData.append("customer_email", customer_email);
        formData.append("customer_address", customer_address);
        formData.append("customer_district", customer_district);
        formData.append("customer_amphoe", customer_amphoe);
        formData.append("customer_province", customer_province);
        formData.append("customer_zipcode", customer_zipcode);
        formData.append("customer_allergic", customer_allergic);
        formData.append("customer_disease", customer_disease);
        formData.append("customer_comment", customer_comment);
        formData.append("customer_image", this.customer.customer_image);
        await api.addCustomer(formData);
        // console.log(formData);
        // alert(JSON.stringify(customer_birthdate))

        this.$router.go("/customer");
      }
    },
  },
};
</script>

<style>
</style>