<template>
  <!-- <v-navigation-drawer app permanent>
    <router-link to="/dashboard" exact>
      <v-img src="@/assets/logo-icon.png" class="logo-1" />
      <v-img src="@/assets/logo-text.png" class="logo-2" />
    </router-link>
    <hr />
    <v-list>
      <v-list-item-group v-model="selectMenu" mandatory color="primary">
        <v-list-item
          v-for="([icon, title, route], index) in menus"
          :key="index"
          @click="onClickmenu(route)"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            {{ title }}
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    
  </v-navigation-drawer> -->

   <v-navigation-drawer
    :value="isDrawerOpen"
    app
    floating
    width="260"
    class="app-navigation-menu"
    :right="$vuetify.rtl"
   
  >
    <!-- Navigation Header -->
    <div class="vertical-nav-header d-flex items-center ps-6 pe-5 pt-5 pb-2">
      <router-link
        to="/"
        class="d-flex align-center text-decoration-none"
      >
        <v-img
          
          max-height="30px"
          max-width="30px"
          alt="logo"
          contain
          eager
          class="app-logo me-3"
        ></v-img>
        <v-slide-x-transition>
          <h2 class="app-title text--white">
            PROJECT CLINIC 
          </h2>
        </v-slide-x-transition>
      </router-link>
    </div>

    <!-- Navigation Items -->
    <v-list
      expand
      shaped
      class="vertical-nav-menu-items pr-5"
    >
      <nav-menu-link
        title="ภาพรวม"
        :to="{ name:'dashboard' }"
        :icon="icons.mdiViewDashboardOutline"
      ></nav-menu-link>
      <nav-menu-link
        title="ลูกค้า"
        :to="{ name: 'customer' }"
        :icon="icons.mdiAccountMultipleOutline"
      ></nav-menu-link>
      <nav-menu-link
        title="ชำระเงิน"
        :to="{ name:'receipt'}"
        :icon="icons.mdiFileMultipleOutline"
      >
      </nav-menu-link>
      <nav-menu-link
        title="ห้องตรวจ"
        :to="{ name:'checkq' }"
        :icon="icons.mdiHospitalBoxOutline"
        
      ></nav-menu-link>
      <nav-menu-group
        title="ยาเวชภัณฑ์"
        :icon="icons.mdiPill"

      >
        <nav-menu-link
          title="คลังยา"
          :to="{ name: 'drug'   }"
         
        ></nav-menu-link>
        <nav-menu-link
          title="เพิ่มประเภทยา"
          :to="{ name:'drugtype' }"
         
        ></nav-menu-link>
      </nav-menu-group>
     
      
      
      <nav-menu-group
        title="การตรวจ"
        :icon="icons.mdiHeartOutline"
        
      >
        <nav-menu-link
          title="รายการตรวจ"
          :to="{ name: 'policing'   }"
         
        ></nav-menu-link>
        <nav-menu-link
          title="เพิ่มหมวดหมู่การตรวจ"
          :to="{ name:'policingtype' }"
          
        ></nav-menu-link>
      </nav-menu-group>
       <nav-menu-link
        title="นัดหมาย"
        :to="{ name:'appointment' }"
        :icon="icons.mdiCalendarOutline"
        
      ></nav-menu-link>
      <!-- <nav-menu-link
        title="เพิ่มห้องตรวจ"
        :to="{ name:'roomadd' }"
        :icon="icons.mdiHospitalBox"
        
      ></nav-menu-link> -->
      
      
        <!-- <nav-menu-group
        title="ตั้งค่าระบบ"
        :icon="icons.mdiCog"
        
      >
        <nav-menu-link
          title="จัดการผู้ใช้"
          :to="{ name: 'setting'   }"
         
        ></nav-menu-link>
        
      </nav-menu-group> -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {
  mdiViewDashboardOutline,
  mdiAccountMultipleOutline,
  mdiFileMultipleOutline,
  mdiCalendarOutline,
  mdiPill,
  mdiHeartOutline,
  mdiHospitalBoxOutline,
  mdiPillar,
  mdiHeartPlusOutline,
  mdiHospitalBox,
  mdiCog
} from '@mdi/js'
import NavMenuGroup from '../components/NavMenuGroup.vue'
import NavMenuLink from '../components/NavMenuLink.vue'
export default {
  // methods: {
  //   onClickmenu(link) {
  //     this.$router.push(link).catch((err) => {}); //ดักการคลิกซ้ำการเปลี่ยนหน้าlink
  //   },
  // },
  // mounted() {
  //   // method ที่ต้องเช็คว่า route ของเราอยู่ที่ลิ้งไหนเพื่อทำการ รีเฟรส
  //   this.selectMenu = this.menus.findIndex(
  //     (menu) => menu[2] == this.$route.path
  //   );
  // },

  data() {
    return {
      selectMenu: 0,
      admins: [
        [ "mdi-account-multiple-outline","Management","/policing"],
        [ "mdi-account-circle","Admin"],
      ],
      menus: [
        ["mdi-view-dashboard", "ภาพรวม", "/dashboard"],
        ["mdi-account-multiple", "ลูกค้า", "/customer"],
        ["mdi-file-multiple", "ชำระเงิน", "/receipt"],
        ["mdi-calendar", "นัดหมาย", "/appointment"],
        ["mdi-pill", "คลังยา", "/drug"],
        ["mdi-heart", "การตรวจ", "/checkq"],
        ["mdi-hospital", "รายการตรวจ", "/policing"],
        
        // ["mdi-file", "About", "/about"],
        [],
        // ["mdi-account-plus","เพิ่มผู้ใช้ระบบ",""],
        ["mdi-pill","เพิ่มประเภทของยา","/drugtype"],
        ["mdi-heart-pulse","เพิ่มหมวดหมู่การตรวจ","/policingtype"]
        ["mdi-heart-pulse","เพิ่มหมวดหมู่การตรวจ","/policingtype"]
      ],
       icons: {
        mdiViewDashboardOutline,
        mdiAccountMultipleOutline,
        mdiFileMultipleOutline,
        mdiCalendarOutline,
        mdiPill,
        mdiHeartOutline,
        mdiHospitalBoxOutline,
        mdiPillar,
        mdiHeartPlusOutline,
        mdiHospitalBox,
        mdiCog
        
      },
    };
  },
  // watch: {
  //   $route(to, from) {
  //     this.path = this.menus.findIndex((menu) => menu[2] == to.path);
  //   },
  // },
  props: {
    isDrawerOpen: {
      type: Boolean,
      default: null,
    },
  },
  components:{
    NavMenuGroup,
    NavMenuLink
  },
  setup() {
    return {
     
    }
  },
};
</script>



<style lang="scss" scoped>
.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
}

// ? Adjust this `translateX` value to keep logo in center when vertical nav menu is collapsed (Value depends on your logo)
.app-logo {
  transition: all 0.18s ease-in-out;
  .v-navigation-drawer--mini-variant & {
    transform: translateX(-4px);
  }
}

.app-navigation-menu {
  .v-list-item {
    &.vertical-nav-menu-link {
      ::v-deep .v-list-item__icon {
        .v-icon {
          transition: none !important;
        }
      }
    }
  }
}

// You can remove below style
// Upgrade Banner
.app-navigation-menu {
  .upgrade-banner {
    position: absolute;
    bottom: 13px;
    left: 50%;
    transform: translateX(-50%);
  }
}
