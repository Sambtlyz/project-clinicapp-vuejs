<template>
<v-app>
<Header v-if="$store.state.isLogged"/>
<Menu v-if="$store.state.isLogged"/>
<Content/>
</v-app>

</template>


<script>
import Header from "@/components/core/Header.vue" // เรียกใช้ไฟล์ จาก Compent ที่ชื่อ ว่า Header
import Menu from "@/components/core/Menu.vue"
import Content from "@/components/core/Content.vue"
export default {
  name : "App", // name component
  components: {  // components ที่เรียกใช้จากการ import เข้ามา
    Header,
    Menu,
    Content,
       
  },
  mounted() {
    this.$store.dispatch({type: "restoreLogin" });
  },

};
</script>

<style>

#app {
  font-family: 'Kanit', sans-serif;
  background-color: #e9edf2;
  
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}


::webkit-page{
  background: #e9edf2;
}
</style>