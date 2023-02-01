<template>
<v-container>
  <v-col cols="12">
    <v-card class="mx-10 pa-5" outlined>
      <v-card-actions>
        <span
          ><v-icon class="pl-2">mdi-account-multiple</v-icon
          >ประวัติข้อมูลคนไข้</span
        >
      </v-card-actions>
      <v-form>
        <v-container>
          <v-row>
            <h3 class="pl-5">ข้อมูลคนไข้</h3>
            <v-col cols="4" md="2" sm="6" pa-5 pl-3>
              <v-img
                :src="getCustomerImage()"
                :width="width"
                height="200"
                pb-5
                lazy-src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                alt="alt"
              />

              <div class="pt-2">
                <!-- <v-btn color="primary" outlined><input @change="Uploadimage" type="file" name="" id="" /></v-btn> -->

                <input
                  v-show="false"
                  ref="onFileSelected"
                  type="file"
                  @change="onFileSelected"
                  customer_id_pri=""
                />
              </div>
            </v-col>

            <div class="col-sm-9">
              <div class="row m-b-10 m-l-20">
                <div class="col-lg-4">
                  <span>รหัส</span>
                  <h5 class="text-muted m-b-5">{{ customer.customer_id }}</h5>
                </div>
                <div class="col-lg-4">
                  <span>ชื่อ - นามสกุล</span>
                  <h5 class="text-muted m-b-5">
                    {{ customer.customer_prefix }}
                    {{ customer.customer_fname }} {{ customer.customer_lname }}
                  </h5>
                </div>
                <div class="col-lg-4">
                  <span>เลขบัตรประชาชน</span>
                  <h5 class="text-muted m-b-5">
                    {{ customer.customer_idcard }}
                  </h5>
                </div>
              </div>
              <div class="row m-b-10 m-l-20">
                <div class="col-lg-4">
                  <span>เพศ</span>
                  <h5 class="text-muted m-b-5">
                    {{ customer.customer_gender }}
                  </h5>
                </div>
                <div class="col-lg-4">
                  <span>อายุ</span>
                  <h5 class="text-muted m-b-5">
                    {{ customer.customer_birthdate | sum_birthdate }}
                  </h5>
                </div>
                <div class="col-lg-4">
                  <span>กรุ๊ปเลือด</span>
                  <h5 class="text-muted m-b-5">
                    {{ customer.customer_blood }}
                  </h5>
                </div>
              </div>
              <div class="row m-b-10 m-l-20">
                <div class="col-lg-4">
                  <span>แพ้ยา</span>
                  <h5 class="text-muted m-b-5">
                    {{ customer.customer_allergic }}
                  </h5>
                </div>
                <div class="col-lg-4">
                  <span>โรคประจำตัว</span>
                  <h5 class="text-muted m-b-5">
                    {{ customer.customer_disease }}
                  </h5>
                </div>
                <!-- <div class="col-lg-4">
                    <h6 class="text-muted m-b-5">อื่นๆ</h6>
                    <h6>เอ</h6>
                </div> -->
              </div>
            </div>
          </v-row>
        </v-container>
      </v-form>
    </v-card>       
  </v-col>


  <template>
    <v-container>
    <v-card class="mx-10 pa-5" outlined>
      <span
          ><v-icon class="pl-2">mdi-database-outline</v-icon
          >รายการ OPD</span>
      
      <v-data-table :headers="headers" :items="cart" :items-per-page="5">
        <template v-slot:[`cart.order_id`]="{ cart }">
          {{ cart.order_id }}
        </template>

         <template v-slot:[`item.order_date`]="{ item }">
          {{ item.order_date | sumdate }}
        </template>

        <template v-slot:[`item.order_name`]="{ item }">
          {{ item.order_name }}
        </template>
      </v-data-table>
      <v-btn color="primary" @click="$router.back('/customer-edit')" outlined>
          ย้อนกลับ
        </v-btn>
    </v-card>
    </v-container>
  </template>
  </v-container>
</template>

<script>
import api from "@/services/api";
import { sum_birthdate, sumdate } from "@/components/hooks/filter";
export default {
  data() {
    return {
      headers: [
        {
          text: "เลขที่",
          align: "left",
          
          value: "order_id",
        },
        { text: "วันที่", value: "order_date", },
        { text: "รายการตรวจ/ยา", value: "order_name", },
        // { text: "รายการรักษา", value: "", },
        // { text: "แพทย์ผู้ดำเนินการ", value: "", },
      ],
      cart:[],
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

    let dataOrder = await api.getOrderById(this.$route.params.customer_id_pri)
    this.cart = dataOrder.data
    
  },

  methods: {
    getCustomerImage() {
      if (this.customer.customer_image.length > 100) {
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
  filters: {
    sum_birthdate,
    sumdate
  },
};
</script>

<style>
</style>