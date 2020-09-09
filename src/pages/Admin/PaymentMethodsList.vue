<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col lg="5" md="7" sm="10">
        <v-dialog max-width="600px" v-model="deleteModal" persistent>
          <v-card>
            <v-card-title class="headline" >Tem certeza que deseja excluir essa forma de pagamento?</v-card-title>
            <v-card-text>{{selectedPaymentMethod.description}}</v-card-text>
            <v-card-actions v-if="!loadingDelete">
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="deleteModal = false">Não</v-btn>
              <v-btn color="green darken-1" text @click="deletePaymentMethod()">Sim</v-btn>
            </v-card-actions>
            <div class="text-center" style="margin-bottom: 10px;" v-else>
              <v-progress-circular
                indeterminate
                size="50"
                width="3"
                color="light-blue"
              ></v-progress-circular>
            </div>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <div class="new-div">
       <router-link to="/nova-forma-de-pagamento">
        <v-btn color="success">
          <i class="ti-plus"></i>
          Nova forma de pagamento
        </v-btn>
      </router-link>
     </div>
    <br>

    <v-row justify="center" align-content="start" :align="loading ? 'center' : 'center'" class="firstRow">
      
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

      <v-col lg="10" md="8" sm="12" v-else
      v-for="pm in paymentsData" :key="pm.id">
          <v-card class="pm-card">
            <v-row align="center" class="spacer" no-gutters>
              <v-col cols="10">
                {{pm.description}}
              </v-col>

              <v-col cols="2">
                <v-row>
                  <v-col cols="6">
                    <v-btn
                      color="primary"
                      fab
                      small
                      @click="editPayment(pm)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-col>

                  <v-col cols="6">
                    <v-btn
                      color="red"
                      fab
                      small
                      @click="openDeleteModal(pm)"
                    >
                      <v-icon color="white">mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
        </v-card>
      </v-col>
      
    </v-row> 
  </v-container>
</template>
<script>
import api from "@/plugins/axios";
import NotificationError from '@/pages/Notifications/ErrorNotification';
import DeleteNotification from '@/pages/Notifications/SuccessDeleteNotification';

export default {
  data() {
    return {
      loading: true,
      loadingDelete: false,
      deleteModal: false,
      paymentsData: [],
      selectedPaymentMethod: {
        description: ""
      }
    };
  },
  methods: {
    getPaymentMethods() {
      const id = localStorage.getItem("userID");
      
      api.get('/payment_terms', {
        headers: {
          "access-token": sessionStorage.getItem("access-token"),
          "client": sessionStorage.getItem("client"),
          "uid": sessionStorage.getItem("uid"),
        }
      })
        .then((res) => {
          this.loading = false;
          sessionStorage.setItem("access-token", res.headers["access-token"]);
          this.paymentsData = res.data;
          
        })
        .catch((err) => {
          this.loading = false;
          this.notifyErrorVue('bottom', 'right');
        });
    },
    deletePaymentMethod() {
      this.loadingDelete = true;

      api.delete('/payment_terms/' + this.selectedPaymentMethod.id, {
        headers: {
          "access-token": sessionStorage.getItem("access-token"),
          "client": sessionStorage.getItem("client"),
          "uid": sessionStorage.getItem("uid"),
        }
      })
        .then((res) => {
          this.deleteModal = false;
          this.loadingDelete = false;
          sessionStorage.setItem("access-token", res.headers["access-token"]);
          this.notifySuccessVue('bottom', 'right');

          this.paymentsData = this.paymentsData.filter(item => item.id !== this.selectedPaymentMethod.id);
          
        })
        .catch((err) => {
          console.log(err.response);
          
          this.deleteModal = false;
          this.loadingDelete = false;
          this.notifyErrorVue('bottom', 'right');
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
    notifySuccessVue(verticalAlign, horizontalAlign) {
      this.$notify({
        component: DeleteNotification,
        icon: "ti-thumb-up",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "success"
      });
    },
    openDeleteModal(pm) {
      this.selectedPaymentMethod = pm;
      this.deleteModal = true;
    },
    editPayment(pm) {
      this.$router.push('/editar-forma-de-pagamento/' + pm.id);
    }
  },
  mounted() {
    this.getPaymentMethods();
  }
};
</script>

<style>
 .firstRow { 
  min-height: calc(100vh - 100px);
 }
 .pm-card {
  padding: 0 20px;
 }
 .new-div {
  display: flex;
  justify-content: flex-end;
 }
</style>
