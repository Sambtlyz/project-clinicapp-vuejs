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
          ><v-icon class="pl-2">mdi-account-multiple</v-icon> แก้ไขประเภทยา</span
        >
      </v-card-actions>
      <v-form @click.prevent="submit" ref="form">
        <v-container>
          <v-row>
            <v-col cols="6">
              <span>ประเภทยา</span
              ><span class="red--text text--lighten-1"> *</span>
              <v-text-field
                outlined
                dense
                required
                v-model="drugtype.drugtype_name"
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
      drugtype: {
        drugtype_id: "",
        drugtype_name: "",
      },
    };
  },
  methods: {
    async submit() {
      let formData = new FormData();
      const { drugtype_id, drugtype_name } = this.drugtype;
      formData.append("drugtype_id", drugtype_id);
      formData.append("drugtype_name", drugtype_name);

      await api.updateDrugtype(formData);
      this.$router.back();
    },
  },
  async mounted() {
    let result = await api.getDrugtypeById(this.$route.params.drugtype_id);
    this.drugtype = result.data;
    // alert(JSON.stringify(result.data))
  },
};
</script>

<style>
</style>