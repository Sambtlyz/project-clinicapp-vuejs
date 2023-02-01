<template>
  <v-card id="dashcard">
    <v-list-item two-line>
        <v-list-item-avatar  size="60" :color="Cus_bg">
          <v-icon color="white">{{Cus_icon}}</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title >{{title}}</v-list-item-title>
        <v-list-item-subtitle >{{subtitle}}</v-list-item-subtitle>
      </v-list-item-content>

      
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "DashCard",
  props:["title","subtitle","Cus_icon","Cus_bg"],
};
</script>

<style>
</style>