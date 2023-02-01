<template>
  <div>
    <v-app-bar app color="primary" dense dark height="70">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>เว็บแอปพลิเคชันเพื่อการจัดการข้อมูลคลินิกทั่วไป V{{ version }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon @click="Onclicklogout">
        <v-icon>mdi-logout</v-icon>
      </v-btn> -->

      <!-- <v-avatar >
      <v-icon dark>
        mdi-account-circle
      </v-icon>
    </v-avatar> -->
      <span>{{ this.$store.getters["username"] | capitalize }}</span>
      <!-- <v-icon>mdi-menu-down</v-icon> -->
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="primary" size="30">
              <v-icon dark> mdi-account-circle </v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="primary">
                <v-icon dark> mdi-account-circle </v-icon>
              </v-avatar>
              <h3>{{ user.name }} {{ this.$store.getters["username"] }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <!-- <v-btn depressed rounded text @click="editProfile()"> ดูข้อมูลส่วนตัว </v-btn> -->
              <v-divider class="my-3"></v-divider>

              <v-btn depressed rounded text @click="Onclicklogout">
                LOGOUT <v-icon>mdi-logout</v-icon>
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import api from "@/services/api";
export default {
  name: "Header",
  computed: {
    version() {
      return "1.0";
    },
  },
  data() {
    return {
      // user: {
      //   initials: 'JD',
      //   fullName: 'John Doe',
      //   email: 'john.doe@doe.com',
      // },
      user: {
        user_id: "",
        name: "",
      },
      fullName: null,
    };
  },
  methods: {
    Onclicklogout() {
      this.$store.dispatch("doLogout");
    },
    // async loadDataUser() {
    //   let result = await api.getUsers();
      // let result = await api.getUserprofile()

      // this.mDataArray = result.data
    //   this.fullName = result.data.role_id;
    //   localStorage.setItem("role_id", result.data.role_id);
    // },
    editProfile(){
      this.$router.push('/profile')
    }
  },
  // async mounted() {
    // let result = await api.getUserprofile(this.$route.params.user_id);
    // this.user = result.data;
    // this.loadDataUser();
  // },
};
</script>

<style></style>
