<template>
  <v-container>
    <v-row class="justify-center">
        <v-card style="width: 400px;">
            <v-img src="@/assets/Login_img.jpg" height="200px"/>
            <v-card-text>
              <v-form>
                <!-- <h1 class="text-md-center">เข้าสู่ระบบ</h1><br>
                <h1 class="text-md-center">Project Clinic</h1> -->
                <v-card-title primary-title class="justify-center py-1">
                  เข้าสู่ระบบ
                </v-card-title>
                <v-card-title primary-title class="justify-center py-1">
                  Admin
                </v-card-title>
                <!-- Username -->
                <v-text-field
                  name="username"
                  label="Username"
                  id="username"
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
                />
                <v-row class="justify-space-between px-3 py-3">
                  <v-btn text @click.prevent="$router.back()" color="info">back</v-btn>
                  
                  <v-btn color="info">Login</v-btn>
                </v-row>
              </v-form>
            </v-card-text>
        </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      Showpassword:false
    }
  },
};
</script>

<style>
</style>