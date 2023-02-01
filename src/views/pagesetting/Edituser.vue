<template>
  <div>
    <v-dialog v-model.trim="dialog" max-width="800px">
      <v-card>
        <v-card-title>
          <h2>
            <v-icon class="me-2 align-middle">mdi-plus-circle</v-icon
            >{{ ("edit") }}{{ ("user") }}
          </h2>
        </v-card-title>
        <v-divider class="my-1"></v-divider>
        <v-card-text>
          <div class="row">
            <div class="col col-12 pb-0">
              <div class="row p-0 m-0">
                <div class="col col-12 col-sm-12 col-md-6 p-0 m-0">
                  <div align="center">
                    <v-avatar size="120" color="#9E9E9E">
                      <img :src="blob_image" />
                    </v-avatar>
                    <div align="center">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="primary"
                            class="ma-2 white--text"
                            v-bind="attrs"
                            x-small
                            v-on="on"
                            @click="showSelectImage"
                            fab
                          >
                            <v-icon dark>
                              mdi-cloud-upload
                            </v-icon>
                          </v-btn>
                        </template>
                        <span>อัพโหลดรูปภาพ</span>
                      </v-tooltip>
                      <!-- <input type="file" @change="previewFiles" /> -->
                    </div>
                  </div>
                </div>
                <div class="col col-12 col-sm-12 col-md-6 p-0 m-0">
                  <div class="row p-0 m-0">
                    <div class="col col-12 p-0 m-0">
                      <v-select
                        :items="roleData"
                        :label="('role')"
                        
                        item-value="value"
                        v-model.trim="roleSelect"
                      ></v-select>
                    </div>
                    <div class="col col-12 p-0 m-0">
                      <v-text-field
                        :label="('clinic')"
                      
                        disabled
                      ></v-text-field>
                    </div>
                    <div class="col col-12 p-0 m-0">
                      <v-select
                        :items="userTypeList"
                        :label="('type')"
                        item-text="th"
                        disabled
                        item-value="value"
                        v-model.trim="userTypeSelect"
                      ></v-select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col col-12 ">
              <div class="row">
                <div class="col col-12 col-sm-12 col-md-6 text-center py-0">
                  <v-text-field
                    :label="('username')"
                    v-model.trim="username"
                    disabled
                  ></v-text-field>
                </div>
                <!-- <div class="col col-12 col-sm-12 col-md-6 text-center py-0">
                  <v-text-field
                    v-model.trim="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    :label="$t('password')"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </div> -->
                <div class="col col-12 col-sm-12 col-md-6 text-center py-0">
                  <v-text-field
                    :label="('name')"
                    v-model.trim="name"
                  ></v-text-field>
                </div>
                <div class="col col-12 col-sm-12 col-md-6 text-center py-0">
                  <v-text-field
                    :label="$t('email')"
                    v-model.trim="email"
                  ></v-text-field>
                </div>
                <div class="col col-12 col-sm-12 col-md-6 text-center py-0">
                  <div class="row p-0 m-0 ">
                    <div class="col col-12 col-sm-12 col-md-6 py-0">
                      <v-text-field
                        :label="('tel')"
                        type="number"
                        v-model.trim="tel"
                        disabled
                      ></v-text-field>
                    </div>
                    <div class="col col-12 col-sm-12 col-md-6 py-0">
                      <v-text-field
                        :label="('license_number')"
                        
                      ></v-text-field>
                    </div>
                  </div>
                </div>
                <div class="col col-12 col-sm-12 col-md-6 text-center py-0">
                  <v-textarea
                    rows="2"
                    :label="('address')"
                    
                  ></v-textarea>
                </div>
                <div class="col col-12 col-sm-12 col-md-6 text-center py-0">
                  <v-textarea
                    rows="2"
                    :label="('comment')"
                    
                  ></v-textarea>
                </div>
                <div class="col col-12">
                  <div class="row">
                    <div
                      class="col col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4"
                    >
                      <v-text-field
                        :label="('percent_commission_drug')"
                       
                        type="number"
                      ></v-text-field>
                    </div>
                    <div
                      class="col col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4"
                    >
                      <v-text-field
                        :label="('percent_commission_equipment')"
                        type="number"
                        
                      ></v-text-field>
                    </div>
                    <div
                      class="col col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4"
                    >
                      <v-text-field
                        :label="('precent_commission_course')"
                        type="number"
                        
                      ></v-text-field>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="btn rounded-lg elevation-3"
            large
            @click="updateUser()"
            >{{ ("save") }}</v-btn
          >
          <v-btn
            color="error"
            class="rounded-lg elevation-3"
            large
            outlined
            @click="dialog = false"
          >
            {{ ("cancel") }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import { mapState } from "vuex";

export default {
  data() {
    return {
      show1: false,
      blob_image: "",
      dialog: false,
      name: "",
      username: "",
      comment: "",
      email: "",
      roleSelect: "",
      address: "",
      clinic: localStorage.getItem("shop_name"),
      userTypeSelect: "",
      userTypeList: [],
      user_image: "",
      password: "",
      tel: "",
      licenseNumber: "",
      commissionDrug: 0,
      commissionEquipment: 0,
      commissionCourse: 0,
      user_image_current: "",
      rules: {
        required: (value) => !!value || "Required !",
        min: (v) => v.length >= 8 || "อย่างน้อย 8 ตัวอักษร",
      },
      roleData: [],

      user_id: "",
    };
  },
  // async mounted() {
  //   this.roleData = role_list.data;
  //   this.userTypeList = user_type.data;
  // },
  computed: mapState({
    data_edit_user: (state) => state.data_edit_user,
  }),
  watch: {
    data_edit_user(val) {
      this.mapData(val);
    },
    roleSelect() {
      console.log("role select log", this.roleSelect);
    },
  },
  methods: {
    // async checkUser() {
    //   let checkUserResponse = await apiService.get({
    //     path: "user/checkusername",
    //     param: `${this.username}/${this.tel}`,
    //   });
    //   if (checkUserResponse.data) {
    //     this.updateUser();
    //   } else {
    //     this.$notify.error({
    //       title: "Username/เบอร์โทรซ้ำ",
    //       message: "กรุณาตรวจสอบอีกครั้ง",
    //     });
    //   }
    // },
    async mapData(userData) {
      let userDataResponse = await getUsers.get({
        path: "login",
        param: userData.user_id,
      });
      let user = userDataResponse.data;
      this.user_id = user.user_id;
      this.username = user.username;
      this.password = user.password;
      this.name = user.user_fullname;
      this.tel = user.user_tel;
     
      this.dialog = true;
      // role_list.data.forEach((item) => {
      //   if (item.value == user.role_id) {
      //     this.roleSelect = +user.role_id;
      //   }
      // });
      // user_type.data.forEach((item) => {
      //   if (item.value == user.user_type_id) {
      //     this.userTypeSelect = item;
      //   }
      // });
      // console.log("roleSelect", this.roleSelect);
      // console.log("user.role_id", user.role_id);
    },
    async updateUser() {
      let formData = new FormData();
      formData.append("user_id", this.user_id);
      formData.append("user_image", this.user_image);
      formData.append("username", this.username);
      formData.append("user_email", this.email);
      formData.append("user_fullname", this.name);
      formData.append("user_address", this.address);
      formData.append("user_tel", this.tel);
     

      let udpateUserResponse = await apiService.post({
        path: "user/edit",
        body: formData,
      });

      if (udpateUserResponse.response == true) {
        this.$notify.success({
          title: "แก้ไขข้อมูลเรียบร้อย",
          message: "แก้ไขข้อมูลผู้ใช้งานเรียบร้อย",
        });
        this.$emit("update_user_success", udpateUserResponse.response);
        this.dialog = false;
      } else {
        this.$notify.error({
          title: "ผิดพลาด",
          message: udpateUserResponse.message,
        });
      }
    },

    showSelectImage() {
      this.$refs.selectImage.click();
    },
   
  },
};
</script>
