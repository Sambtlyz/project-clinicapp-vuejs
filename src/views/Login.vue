<template>
<v-parallax
    dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    height="900"
  >
<v-container >
    <v-row  justify="center">
        <v-card style="width: 400px;" >
            <v-img src="@/assets/Login_img.jpg" height="200px"/>
            <v-card-text >
              <v-form @submit.prevent="submit" ref="form">
                <!-- <h1 class="text-md-center">เข้าสู่ระบบ</h1><br>
                <h1 class="text-md-center">Project Clinic</h1> -->
                <v-card-title primary-title class="justify-center py-1">
                  เข้าสู่ระบบ
                </v-card-title>
                <v-card-title primary-title class="justify-center py-1">
                  Project Clinic
                </v-card-title>
                <!-- Username -->
                <v-text-field
                  name="username"
                  label="Username"
                  id="username"
                  :rules="CheckUsername"
                  v-model="Account.username"
                />
                <!-- Password -->
                <v-text-field
                  name="password"
                  label="Password"
                  id="password"
                  :rules="CheckPassword"
                  v-model="Account.password"
                  :append-icon="Showpassword ? 'visibility' :'visibility_off'"
                  :type="Showpassword ? 'text':'password'"
                  @click:append="Showpassword = !Showpassword"
                  counter
                />
                <v-row class="justify-space-between px-3 py-3 ">
                  <!-- <v-btn text @click.prevent="$router.push('/register')" color="info">สมัครผู้ใช้งาน</v-btn> -->
                  <v-btn color="info" type="submit" >Login</v-btn>
                </v-row>
              </v-form>
            </v-card-text>
        </v-card>
    </v-row>
    </v-container>
</v-parallax>
</template>

<script>
import api from "@/services/api";

export default {
  mounted() {
    if (api.isLoggedIn()) {
      this.$router.push("/customer");
    }
  },
  data() {
    return {
      Showpassword:false,
      CheckUsername: [(v) => !!v || "กรุณากรอกชื่อผู้ใช้"],
      CheckPassword: [(v) => !!v || "กรุณากรอกรหัสผ่าน"],
      Account:{
        username:"",
        password:""
      }
    }
  },
  methods: {
    submit(){
      if(this.$refs.form.validate()) {
      this.$store.dispatch({
        type:"doLogin", //name action
        username: this.Account.username,
        password: this.Account.password,
      })
      }
    }
  },
};
</script>

<style>
.bg  {
  background-size: cover;
  background: url('../assets/background_login.png');
  width: 200vh;
  height: 200vw;
  content: '';
  position: fixed;
  background-position: center center;
  background-repeat: repeat;
  background-attachment: fixed;
  -webkit-background-size: cover;
  margin: 0;
  box-sizing: border-box;
  
}
 /* #app {

  background-size: auto;
  background: url('../assets/background_login.png');
  display: block;
} */
</style>