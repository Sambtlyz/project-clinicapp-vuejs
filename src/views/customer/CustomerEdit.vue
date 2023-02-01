<template>
  <v-col cols="12">
    <v-card class="mx-10 pa-2">
      <v-card-actions>
        <v-btn color="primary" @click="$router.back('/customer-edit')" outlined>
          ย้อนกลับ
        </v-btn>
        <v-btn color="primary" @click="submit"> บันทึก </v-btn>
        <v-spacer></v-spacer>
        <span
          ><v-icon class="pl-2">mdi-account-multiple</v-icon> แก้ไขข้อมูล</span
        >
      </v-card-actions>
    </v-card>
    <v-card class="mx-10 pa-5" outlined>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="4" md="2" sm="6" pa-5>
              <v-avatar size="150">
                <v-img
                  :src="getCustomerImage()"
                  pb-5
                  lazy-src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  alt="alt"
                />
              </v-avatar>
              <div class="pt-2">
                <!-- <v-btn color="primary" outlined><input @change="Uploadimage" type="file" name="" id="" /></v-btn> -->
                <v-btn
                  color="primary"
                  @click="$refs.onFileSelected.click()"
                  outlined
                  >อัพโหลดรูปภาพ</v-btn
                >
                <input
                  v-show="false"
                  ref="onFileSelected"
                  type="file"
                  @change="onFileSelected"
                  customer_id_pri=""
                />
              </div>
            </v-col>

            <v-spacer></v-spacer>

            <v-col cols="8" md="2" sm="3">
              <span>รหัสลูกค้า(*XX000*)</span
              ><span class="red--text text--lighten-1"> *</span>
              <v-text-field
                v-model="customer.customer_id"
                dense
                required
                outlined
                mt-3
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="3">
              <span>ชื่อ</span><span class="red--text text--lighten-1"> *</span>
              <v-text-field
                v-model="customer.customer_fname"
                :counter="10"
                dense
                required
                outlined
                mt-3
              ></v-text-field>
              <span>คำนำหน้า</span>
              <v-select
                :items="items1"
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
                :counter="10"
                dense
                required
                outlined
              ></v-text-field>
              <span>เพศ</span>
              <v-select
                :items="items"
                solo
                dense
                v-model="customer.customer_gender"
              ></v-select>
            </v-col>

            <v-col cols="12" md="4">
                    <span >วันเกิด <span class="red--text text--lighten-1">( อายุ:  {{ customer.customer_birthdate | sum_birthdate }}  )</span> </span>
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
                        @input=" selectdate = false"
                        locale="th"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>

            <v-col cols="12" md="4">
              <span>เลขบัตรประชาชน</span
              ><span class="red--text text--lighten-1"> *</span>
              <v-text-field
                v-model="customer.customer_idcard"
                outlined
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
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <span>โรคประจำตัว</span>
              <v-text-field
                v-model="customer.customer_disease"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <span>หมายเหตุ</span>
              <v-text-field
                v-model="customer.customer_comment"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-col>
</template>

<script>
import api from "@/services/api";
import  { sum_birthdate } from "@/components/hooks/filter";
export default {
  data() {
    return {
//        sumdate(string) {
//   if (string != null) {
//     let year = string.substring(0, 4);
//     let sumYear = parseInt(year) + 543;
//     let mount = string.substring(5, 7);
//     let day = string.substring(8, 10);
//     var months_th_mini = [
//       "ม.ค.",
//       "ก.พ.",
//       "มี.ค.",
//       "เม.ย.",
//       "พ.ค.",
//       "มิ.ย.",
//       "ก.ค.",
//       "ส.ค.",
//       "ก.ย.",
//       "ต.ค.",
//       "พ.ย.",
//       "ธ.ค.",
//     ];
//     let date = day + " " + months_th_mini[mount - 1] + " " + sumYear;
//     return date;
//   } else {
//     return string;
//   }
// },
      dialog: false,
      items: ["ชาย", "หญิง"],
      items1: ["นาย", "นางสาว", "นาง", "ด.ช.", "ด.ญ."],
      items2: ["A", "B", "AB", "O"],
      selectdate: false,
      // date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      customer: {
        customer_id: "",
        customer_fname: "",
        customer_lname: "",
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
      customerFile: null,
    };
  },
  async mounted() {
    let result = await api.getCustomerById(this.$route.params.customer_id_pri);
    this.customer = result.data;
    // alert(JSON.stringify(result.data))
  },
  methods: {
    async submit() {
      let formData = new FormData();
      const {
        customer_id_pri,
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
      formData.append("customer_id_pri", customer_id_pri);
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
      if (this.customerFile != null) {
        formData.append("customer_image", this.customerFile);
      }

      await api.updateCustomer(formData);
      this.$router.back();
    },
    getCustomerImage() {
      if (this.customer.customer_image?.length > 100) {
        return this.customer.customer_image;
      } else {
        return this.$options.filters.imageUrl(this.customer.customer_image);
      }
    },
    onFileSelected(event) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // previews image
        this.customer.customer_image = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      // upload image
      this.customerFile = event.target.files[0];
    },
  },
  computed:{
        // calculateAge: function() {
        //   let currentDate = new Date();
        //   let customer_birthdate = new Date("1999-02-01");
        //   let difference = currentDate - customer_birthdate;
        //   let age = Math.floor(difference/31557600000);
        //   return age
        // },    
  }, 
  filters:{
    sum_birthdate
  }
};


</script>

<style>
</style>