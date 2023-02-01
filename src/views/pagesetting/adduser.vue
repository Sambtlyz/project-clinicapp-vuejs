<template>
 
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="900px" height="1200" flat>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="teal" outlined v-bind="attrs" v-on="on" @click="getroleAdd()">
          <v-icon size="15">add</v-icon>
          เพิ่มผู้ใช้ระบบ
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5"
          ><v-icon>add</v-icon>เพิ่ม - ผู้ใช้(user)</v-card-title
        >
        <v-divider></v-divider>
        <v-col cols="12">
          <v-card class="mx-10 pa-5" outlined>
            <v-form @submit.prevent="submit" ref="form">
              <v-container>
                <v-row>
                  <!-- <v-col cols="4" md="2" sm="6" pa-5>
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
                  </v-col> -->

                  <v-spacer></v-spacer>

                  <v-col cols="6" md="5" sm="3">
                    <span>ชื่อผู้ใช้</span
                    ><span class="red--text text--lighten-1"> *</span>
                    <v-text-field
                      v-model="Account.username"
                      
                      dense
                      required
                      outlined
                      mt-3
                    ></v-text-field>

                     <span>รหัสผ่าน</span
                    ><span class="red--text text--lighten-1"> *</span>
                    <v-text-field
                      v-model="Account.password"
                      :append-icon="Showpassword ? 'visibility' :'visibility_off'"
                      :type = " Showpassword ? 'text':'password' "
                      @click:append="Showpassword = !Showpassword"
                      dense
                      required
                      outlined
                      mt-3
                    ></v-text-field>

                    <span>ชื่อ</span
                    ><span class="red--text text--lighten-1"> *</span>
                    <v-text-field
                      v-model="Account.name"
                     
                      dense
                      required
                      outlined
                      mt-3
                    ></v-text-field>

                     <span>เบอร์โทรศัพท์</span
                    ><span class="red--text text--lighten-1"> *</span>
                    <v-text-field
                      v-model="Account.tel"
                      
                      dense
                      required
                      outlined
                      mt-3
                    ></v-text-field>
                    <span>สิทธิ์ผู้ใช้งาน</span>
                    <v-select 
                    dense 
                    outlined
                    :items="rolelist"
                    item-text="role_name"
                    item-value="role_id"
                    v-model="Account.role_id"
                    >

                    </v-select>
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
  </div>
</template>

<script>
import api from "@/services/api"
export default {
    data() {
        return {
            dialog: false,
            Showpassword:false,
            Account:{
              username: "",
              password: "",
              name: "",
              tel: "",
              roid_id: "",
            },
            rolelist:[],
            selectrole: "",
        }
    },
    methods:{
      async loadDatarole(){
        let data = await api.getRole();
        this.data = data.data
      },
      async getroleAdd(){
        await this.getrolelist();
        this.dialog = true;
      },
      async  submit(){
          await api.register(this.Account)
          console.log(Account)
          this.$router.go("/setting")
        },
      async  getrolelist(){
        let datarole = await api.getRole();
        this.rolelist = datarole.data;

        this.selectrole = datarole.data[0].role_id
        }
    },
   async mounted() {
      this.loadDatarole();
    },

}
</script>

<style>

</style>