<template>
  <v-container>
    <v-row class="justify-center pt-10" >
        <v-card style="width: 400px;">
            <v-img src="@/assets/Login_img.jpg" height="200px"/>
            <v-card-text>
              <v-form @submit.prevent="submit">
                <!-- <h1 class="text-md-center">เข้าสู่ระบบ</h1><br>
                <h1 class="text-md-center">Project Clinic</h1> -->
                <v-card-title primary-title class="justify-center py-1">
                  Register
                </v-card-title>
                <v-card-title primary-title class="justify-center py-1">
                  Project Clinic
                </v-card-title>
                <!-- Username -->
                <v-text-field
                  name="username"
                  label="Username"
                  id="username"
                  v-model="Account.username"
                  :rules="usernameRules"
                />
                <!-- Password -->
                <v-text-field
                  name="password"
                  label="Password"
                  id="password"
                  :append-icon="Showpassword ? 'visibility' :'visibility_off'"
                  :type="Showpassword ? 'text':'password'"
                  @click:append="Showpassword = !Showpassword"
                  counter
                  v-model="Account.password"
                  :rules="passwordRules"
                />

                <v-select
                label="เลือกสิทธิ์"
                :items="items"

                >
                  
                </v-select>

                <!-- <span>{{Account}}</span>    -->
                <v-row class="justify-space-between px-3 py-3 ">
                  <v-btn text @click.prevent="$router.back('/')" color="info">back</v-btn>
                  <v-btn type="submit" color="info">Confirm</v-btn>
                </v-row>
              </v-form>
            </v-card-text>
        </v-card>
    </v-row>
  </v-container>
</template>

<script>
import api from '@/services/api'
export default {
    data() {
    return {
      Showpassword:false,
      Account:{
        username:"",
        password:""
      },
      items:[
        'แพทย์',
        'พนักงาน'
      ],
      usernameRules:[v1=>!! v1 || "โปรดกรอกชื่อผู้ใช้"],
      passwordRules:[v1=>!! v1 || "โปรดกรอกพาสเวิร์ด",v2=> /(?=.*)[A-Za-z\d]{6,}$/.test(v2) || "ต้องระบุอักษรอย่างน้อย 6 ตัวอักษร" ]
    }
  },
  methods: {
       async submit(){
         await api.register(this.Account)
        }
      },
};
</script>

<style>
</style>