<template>
  <v-col cols="12">
    <v-card class="mx-10 pa-5">
      <v-card-actions>
        <v-btn color="primary" @click="$router.back('/drugedit')" outlined>
          ย้อนกลับ
        </v-btn>
        <v-btn color="primary" @click="submit"> บันทึก </v-btn>
        <v-spacer></v-spacer>
        <span
          ><v-icon class="pl-2">mdi-account-multiple</v-icon> แก้ไขหมวดหมู่</span
        >
      </v-card-actions>
      <v-form @click.prevent="submit" ref="form">
        <v-container>
          <v-row>
            <v-col cols="6">
              <span>หมวดหมู่การตรวจ</span
              ><span class="red--text text--lighten-1"> *</span>
              <v-text-field
                outlined
                dense
                required
                v-model="policingtype.policingtype_name"
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
export default {
  data() {
    return {
      policingtype: {
        policingtype_id: "",
        policingtype_name: "",
      },
    };
  },
  methods: {
    async submit() {
      let formData = new FormData();
      const { policingtype_id, policingtype_name } = this.policingtype;
      formData.append("policingtype_id", policingtype_id);
      formData.append("policingtype_name", policingtype_name);

      await api.updatePolicingtype(formData);
      this.$router.back();
    },
  },
  async mounted() {
    let result = await api.getPolicingtypeById(this.$route.params.policingtype_id);
    this.policingtype = result.data;
    // alert(JSON.stringify(result.data))
  },
};
</script>

<style>
</style>