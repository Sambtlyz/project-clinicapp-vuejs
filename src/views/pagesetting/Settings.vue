<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <span
        ><v-icon class="pl-2">mdi-account-multiple</v-icon> จัดการผู้ใช้</span
      >
      <v-spacer></v-spacer>
      <v-data-table :headers="headers" :items="mDataArray">
        <!-- top section -->
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <Adduser />
          </v-toolbar>
        </template>

        <template v-slot:[`item.roleData`]="{ item }">
          {{ mDataArray.indexOf(item) + 1 }}
        </template>
        <!-- รูปโปรไฟล์ -->
        <!-- <template v-slot:[`item.customer_image`]="{ item }">
          <td>
            <v-avatar size="40">
              <v-img
                :src="item.customer_image | imageUrl"
                lazy-src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                aspect-ratio="1"
                max-width="50"
                max-height="50"
              ></v-img>
            </v-avatar>
          </td>
        </template> -->

        <!-- <template v-slot:[`item.username`]="{ item }">
          <td>
            {{ item.username }} 
            
          </td>
        </template> -->

        <!-- เพิ่มเติม -->
        <template v-slot:[`item.options`]="{ item }">
          <!-- <v-chip @click="editItem(item)" color="info" small>
            <v-icon class="mr-2"> edit {{ item.options }}</v-icon>
            แก้ไข</v-chip
          >
          <v-chip color="error" @click="deleteItem(item)" small>
            <v-icon class="mr-2">delete</v-icon>
            ลบ</v-chip
          > -->

          <!-- <v-tooltip
              v-if="
                (user_role_id < item.role_id &&
                  user_profile_type <= item.user_type_id) ||
                  user_profile_type == 1 ||
                  user_profile_id == item.user_id
              "
              top
            > -->
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="editUser(item)"
              >
                <v-icon>mdi-pencil-outline</v-icon>
              </v-btn>
            </template>
            <span class="set-font-kanit">แก้ไขข้อมูลผู้ใช้</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="editPassword(item)"
              >
                <v-icon>mdi-lock-reset</v-icon>
              </v-btn>
            </template>
            <span class="set-font-kanit">เปลี่ยนรหัสผ่าน</span>
          </v-tooltip>
        </template>
      </v-data-table>

      <!-- ลบข้อมูล -->
      <!-- <v-dialog v-model="confirmDeleteDialog" max-width="300">
        <v-card>
         
          <v-card-title class="body"> คุณต้องการที่จะลบหรือไม่? </v-card-title>
          <v-card-actions>
            <v-btn class="primary" @click="confirmDelete()">ตกลง</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="error" @click="confirmDeleteDialog = false"
              >ยกเลิก</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog> -->
    </v-card>
    
    <!-- <div class="text-center">
    <v-dialog v-model="dialog" max-width="900px" height="1200" flat>
      <v-card>
        <v-card-title class="text-h5"
          ><v-icon>add</v-icon>แก้ไข - ผู้ใช้(user)</v-card-title
        >
        <v-divider></v-divider>
        <v-col cols="12">
          <v-card class="mx-10 pa-5" outlined>
            <v-form @submit.prevent="submit" ref="form">
              <v-container>
                <v-row>
                 

                  <v-spacer></v-spacer>

                  <v-col cols="6" md="5" sm="3">
                    <span>ชื่อผู้ใช้</span
                    ><span class="red--text text--lighten-1"> *</span>
                    <v-text-field
                      disabled
                      v-model="user.username"
                      dense
                      required
                      outlined
                      mt-3
                    ></v-text-field>

                    <span>รหัสผ่าน</span
                    ><span class="red--text text--lighten-1"> *</span>
                    <v-text-field
                    
                      v-model="user.password"
                      dense
                      required
                      outlined
                      mt-3
                    ></v-text-field>

                    <span>โทร</span
                    ><span class="red--text text--lighten-1"> *</span>
                    <v-text-field
                    
                      v-model="user.tel"
                      dense
                      required
                      outlined
                      mt-3
                    ></v-text-field>

                    <span>ชื่อ</span
                    ><span class="red--text text--lighten-1"> *</span>
                    <v-text-field
                    
                      v-model="user.name"
                      dense
                      required
                      outlined
                      mt-3
                    ></v-text-field>

                    <span>สิทธิ์</span>
              <span class="red--text text--lighten-1"> *</span>
              <v-select
                :items="datarole"
                dense
                solo
                placeholder="เลือกประเภท"
                item-text="role_name"
                item-value="role_id"
                v-model="user.role_id"
              ></v-select>
                    
                     
                  </v-col>
                  <v-spacer></v-spacer>
                 
                </v-row>
                 <v-card-actions class="justify-center">
                    
                    
                    <v-btn color="primary" @click="submit"> บันทึก </v-btn>
                    <v-btn color="primary" outlined @click="dialog = false">
                      ยกเลิก
                    </v-btn>
                    
                  </v-card-actions>
              </v-container>
            </v-form>
          </v-card>
        </v-col>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div> -->


  <div class="text-center">
    <v-dialog v-model="dialogPassword" max-width="900px" height="1200" flat>
      <v-card>
        <v-card-title class="text-h5"
          ><v-icon>add</v-icon>แก้ไข - ผู้ใช้(user)</v-card-title
        >
        <v-divider></v-divider>
        <v-col cols="12">
          <v-card class="mx-10 pa-5" outlined>
            <v-form @Editpassword.prevent="Editpassword" ref="form">
              <v-container>
                <v-row>
                 

                  <v-spacer></v-spacer>

                  <v-col cols="6" md="5" sm="3">
                    <span>ชื่อผู้ใช้</span
                    ><span class="red--text text--lighten-1"> *</span>
                    <v-text-field
                      disabled
                      v-model="user.username"
                      dense
                      required
                      outlined
                      mt-3
                    ></v-text-field>

                    <span>รหัสผ่าน</span
                    ><span class="red--text text--lighten-1"> *</span>
                    <v-text-field
                    
                     v-model="Updatepassword.password"
                      dense
                      required
                      outlined
                      mt-3
                    ></v-text-field>

                    
                     
                  </v-col>
                  <v-spacer></v-spacer>
                 
                </v-row>
                 <v-card-actions class="justify-center">
                    
                    
                    <v-btn color="primary" @click="Editpassword()"> บันทึก </v-btn>
                    <v-btn color="primary" outlined @click="dialogPassword = false">
                      ยกเลิก
                    </v-btn>
                    
                  </v-card-actions>
              </v-container>
            </v-form>
          </v-card>
        </v-col>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>


  </v-container>
</template>
<script>
import api from "@/services/api";
import Adduser from "./adduser";
export default {
  data() {
    return {
      mDataArray: [],
      datarole: {},
      dialog: false,
      dialogPassword: false,
      user: { nam: "", usernam: "" , password:"", tel:"", role_id:""} ,
      Updatepassword: { password:""},
      headers: [
        { text: "#", value: "roleData" },
        { text: "username", value: "username" },
        { text: "สิทธิ์", value: "role_name" },
        { text: "ชื่อ", value: "name" },
        { text: "โทร", value: "tel" },
        { text: "เพิ่มเติม", value: "options", align: "center" },
      ],
    };
  },
  methods: {
    async loadDataUser() {
      let result = await api.getUsers();
      // this.mDataArray = result.data

      let result1 = await api.getRole();
      this.datarole = result1.data;

      this.mDataArray = result.data.map((item) => {
        item.role_name = this.datarole.find(
          (sub) => sub.role_id == item.role_id
        ).role_name;

        return item;
      });
    },
    // editItem(item){
    //   this.$router.push(`/edituser/${item.user_id}`);
    // }

    // editUser(user) {
    //   this.$store.dispatch("udpate_status_edit_user", user);
    // },
    editUser(item) {
      this.user = item;
      this.dialog = true;
      console.log(item);
    },
    editPassword(item){
      this.user = item;
      this.dialogPassword = true
      console.log(item);
    },
   async Editpassword(){
      await api.updatePassword(this.Updatepassword)
    }
  },
  async mounted() {
    this.loadDataUser();
  },
  components: {
    Adduser,
  },
};
</script>


<style>
</style>