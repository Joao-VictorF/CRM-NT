<template>
  <v-container>
    <v-row justify="end">
      <v-col xl="2" lg="3" md="3" cols="3">
        <router-link to="/nova-cotacao">
          <v-btn color="success">
            <i class="ti-plus"></i>
            Nova cotação
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
    <br>

    <v-row justify="center" :align="loading ? 'center' : 'start'" class="firstRow">
      
      <v-col v-if="loading" cols="3">
        <div class="text-center">
          <v-progress-circular
            indeterminate
            size="100"
            width="4"
            color="light-blue"
          ></v-progress-circular>
        </div>
      </v-col>

      <v-expansion-panels v-else popout>
        <v-expansion-panel
          v-for="cotacao in cotacoesData" :key="cotacao.id"
          hide-actions
        >
          <v-expansion-panel-header>
            <v-row align="center" class="spacer" no-gutters>
              <v-col sm="5" md="3">
                <strong v-html="cotacao.client_request_reference_project"></strong>
              </v-col>
            </v-row>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
          </v-expansion-panel-content>

        </v-expansion-panel>
      </v-expansion-panels>
    </v-row> 
  </v-container>
</template>
<script>
import api from "@/plugins/axios";
import NotificationError from '@/pages/Notifications/ErrorNotification';

export default {
  data() {
    return {
      loading: true,
      cotacoesData: [],
    };
  },
  methods: {
    getCotacoes() {
      const id = localStorage.getItem("userID");
      
      api.get('/users/' + id + '/quotations', {
        headers: {
          "access-token": sessionStorage.getItem("access-token"),
          "client": sessionStorage.getItem("client"),
          "uid": sessionStorage.getItem("uid"),
        }
      })
        .then((res) => {
          this.loading = false;
          sessionStorage.setItem("access-token", res.headers["access-token"]);
          this.cotacoesData = res.data;

          console.log(res.data);
          
        })
        .catch((err) => {
          // this.loading = false;
          this.notifyErrorVue("bottom", "right")
        });
    },
    notifyErrorVue(verticalAlign, horizontalAlign) {
      this.$notify({
        component: NotificationError,
        icon: "ti-thumb-down",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "danger"
      });
    },
  },
  mounted() {
    this.getCotacoes();
  }
};
</script>

<style>
 .firstRow { 
   min-height: calc(100vh - 100px);
 }
</style>
