<template>
  <nav class="navbar navbar-expand-lg navbar-light" v-if="showSideBar">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{routeName}}</a>
      <button class="navbar-toggler navbar-burger"
              type="button"
              @click="toggleSidebar"
              :aria-expanded="$sidebar.showSidebar"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>

      <!-- <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item logout-btn">
            <v-btn text small color="error" @click="logout()">
              <v-icon>mdi-logout</v-icon>
              Sair
            </v-btn>
          </li>
        </ul>
      </div> -->
    </div></nav>
</template>

<script>
import api from "@/plugins/axios";

export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    }
  },
  data() {
    return {
      showSideBar: false,
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    checkRoute() {
      if(this.$router.history.current.fullPath.localeCompare("/login") == 0 || this.$router.history.current.fullPath.localeCompare("/first-access?account_confirmation_success=true") == 0 || this.$router.history.current.fullPath.localeCompare("/change-default-password") == 0) {
        this.showSideBar = false;

      } else {
        this.showSideBar = true;
      }
    },
    logout() {
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("firstAccess");
      localStorage.removeItem("userID");

      sessionStorage.removeItem("access-token");
      sessionStorage.removeItem("client");
      sessionStorage.removeItem("uid");

      window.location = "/";

    }
  }, 
  mounted() {
    this.checkRoute();
  }
};
</script>
<style>
  .logout-btn {
    display: flex;
    align-items: center;
  }
</style>
