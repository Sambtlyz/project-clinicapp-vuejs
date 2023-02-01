<template>
  <v-row >
    <v-col cols="12" md="5" lg="4">
      <v-img
        class="elevation-5 rounded-lg m-3 mr-0"
        height="150"
        aspect-ratio="1.7"
        :src="customerData.customer_image"
      ></v-img>
    </v-col>
    <v-col cols="12" md="7" lg="8" class="py-2">
      <h3>
        <span
          class="primary--text pointer h3"
        
          >{{ customerData.customer_id }}</span
        >
        {{ customerData.customer_prefix }}
        {{ customerData.customer_fname }}
        {{ customerData.customer_lname }}
        <span> ({{ customerData.customer_nname }}) </span>
      </h3>
      <table class="table table-striped table-sm">
        <tbody>
          <tr>
            <td class="set-font-table-th">{{ ("id_card") }} :</td>
            <td class="set-font-table-td">
              {{ customerData.customer_idcard }}
            </td>
          </tr>
          <tr>
            <td class="set-font-table-th">{{ ("age") }} :</td>
            <td class="set-font-table-td">
              {{ customerData.customer_birthdate  }}
            </td>
          </tr>
          <tr>
            <td class="set-font-table-th">{{ ("gender") }} :</td>
            <td class="set-font-table-td">
              {{ customerData.customer_gender }}
            </td>
          </tr>
          <tr>
            <td class="set-font-table-th">{{ ("telephone_number") }} :</td>
            <td class="set-font-table-td">
              {{ customerData.customer_tel }}
            </td>
          </tr>
        </tbody>
      </table>
    </v-col>
    <v-col cols="12" class="pt-0">
      <table class="table table-striped table-sm">
        <tbody>
          <tr>
            <td class="set-font-table-th">{{ ("blood_type") }} :</td>
            <td class="set-font-table-td">
              {{ customerData.customer_blood }}
            </td>
          </tr>
          <tr>
            <td class="set-font-table-th">{{ ("be_allergic") }} :</td>
            <td class="set-font-table-td">
              {{ customerData.customer_allergic }}
            </td>
          </tr>
          <tr>
            <td class="set-font-table-th">{{ ("congenital_disease") }} :</td>
            <td class="set-font-table-td">
              {{ customerData.customer_disease }}
            </td>
          </tr>
          <tr>
            <td class="set-font-table-th">{{ ("note") }} :</td>
            <td class="set-font-table-td">
              {{ customerData.customer_comment }}
            </td>
          </tr>
        </tbody>
      </table>
    </v-col>
  </v-row>
</template>
<script>

export default {
  props: [
    
    "customerData",
    
  ],
//   filters: {
//     sum_birthdate,
  
//   },
  methods: {
    detail_receipt(id) {
      console.log("receipt id :", id);
      if (this.$route.path == "/order_detail") {
        this.$emit("changeId", id);
      } else {
        this.$router.push({
          name: "Order_detail",
          query: { id: id },
        });
      }
    },
  },
};
</script>
