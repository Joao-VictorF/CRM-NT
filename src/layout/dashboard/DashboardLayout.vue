<template>
  <div  class="wrapper">
    
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" name="Dashboard" icon="ti-panel"/>
        
        <sidebar-link to="/clients-list" name="Clientes" icon="ti-layout-list-thumb"/>
        <sidebar-link to="/products" name="Produtos" icon="ti-package"/>
        <sidebar-link to="/cotacoes-list" name="Cotações" icon="ti-package"/>
        <sidebar-link to="/payment-methods-list" name="Condição de pagamento" icon="ti-money"/>



        <li class="nav-item logout-btn" style="margin-top: 25px;">
          <v-btn text small color="#e85858" @click="logout()">
            <v-icon>mdi-logout</v-icon>
            Sair
          </v-btn>
        </li>

      </template>
      <mobile-menu>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>

    <!-- <side-bar v-else>
      <template slot="links">
        <sidebar-link to="/dashboard" name="Dashboard" icon="ti-panel"/>
        <sidebar-link to="/products" name="Produtos" icon="ti-package"/>
        <sidebar-link to="/account" name="Perfil" icon="ti-user"/>
      </template>
      <mobile-menu>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar> -->

    

    <div class="main-panel" :class="{'full-width': closedSideBar}">
      <top-navbar ></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

    </div>
  </div>
</template>

<script>
  import TopNavbar from "./TopNavbar.vue";
  import DashboardContent from "./Content.vue";
  import MobileMenu from "./MobileMenu";
  export default {
  components: {
    TopNavbar,
    DashboardContent,
    MobileMenu
  },
  data(){
    return {
      // isAdmin: "",
      closedSideBar: false,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("firstAccess");
      localStorage.removeItem("userID");

      sessionStorage.removeItem("access-token");
      sessionStorage.removeItem("client");
      sessionStorage.removeItem("uid");

      window.location = "/";

    },
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    checkRoute() {
      if(this.$router.history.current.fullPath.localeCompare("/login") == 0 || this.$router.history.current.fullPath.localeCompare("/first-access?account_confirmation_success=true") == 0 || this.$router.history.current.fullPath.localeCompare("/change-default-password") == 0) {
        this.closedSideBar = true;
      }
    },
    // checkAdminPermission() {
    //   this.isAdmin = localStorage.getItem("isAdmin");

    //   if(this.isAdmin) {
    //     if(this.isAdmin.localeCompare("true") == 0 ) {
    //       return true;
    //     } 
    //     return false;
    //   }
    //   return false;
    // }
  }, 
  beforeMount() {
    this.checkRoute();
    // this.checkAdminPermission();
  }
};
</script>

<style scoped>
  .full-width {
    width: 100%;
  }
</style>
