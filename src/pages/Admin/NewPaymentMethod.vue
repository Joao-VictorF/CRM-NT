<template>
  <v-container>
    <v-form  ref="form" v-model="valid" lazy-validation>
      <v-row justify="center">
        <v-col v-if="loadingData" cols="3">
          <div class="text-center">
            <v-progress-circular
              indeterminate
              size="100"
              width="4"
              color="light-blue"
            ></v-progress-circular>
          </div>
        </v-col>

        <v-col v-else lg="6" md="8" sm="6" cols="12">
          <v-text-field
            v-model="payment_term.description"
            :rules="[rules.required]"
            label="Descrição da forma de pagamento"
            hint="Exemplo: A vista 10% de desconto"
            persistent-hint
            required
            outlined
            dense
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row v-if="!loadingData" justify="center">
        <v-col lg="4" md="6" sm="6" cols="12" class="btnCol">
          <v-btn
            :disabled="!valid || loading"
            color="success"
            class="createBtn"
            @click="isEditing ? editPaymentMethod() : createPaymentMethod()"
            block
          >
            <v-progress-circular
              v-if="loading"
              indeterminate
              size="25"
              width="3"
              color="white">
            </v-progress-circular>
            <span v-else>Salvar</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import api from "@/plugins/axios";
import NotificationSuccess from '@/pages/Notifications/SuccessPMNotification';
import NotificationError from '@/pages/Notifications/ErrorNotification';
import UpdateNotification from '@/pages/Notifications/UpdateNotification';

export default {
  data() {
    return {
      loading: false,
      loadingData: false,
      isEditing: false,
      valid: true,
      payment_id: 0,
      payment_term: {
        description: "",
      },
      rules: {
        required: value => !!value || 'Este campo é obrigatório.',
      },
    };
  },
  methods: {
    createPaymentMethod() {
      if(this.$refs.form.validate()) {
        this.loading = true;

        api.post('/payment_terms', this.payment_term, 
        {
          headers: {
            "access-token": sessionStorage.getItem("access-token"),
            "client": sessionStorage.getItem("client"),
            "uid": sessionStorage.getItem("uid"),
          }
        })
          .then((res) => {
            this.loading = false;
            
            sessionStorage.setItem("access-token", res.headers["access-token"]);
            this.notifySuccessVue('bottom', 'right');
          })
          .catch((err) => {
            this.notifyErrorVue('bottom', 'right');
          });
      }
    },
    editPaymentMethod() {
      if(this.$refs.form.validate()) {
        this.loading = true;

        api.put('/payment_terms/' + this.payment_id, { "payment_term": { "description" :this.payment_term.description }},
        {
          headers: {
            "access-token": sessionStorage.getItem("access-token"),
            "client": sessionStorage.getItem("client"),
            "uid": sessionStorage.getItem("uid"),
          }
        })
          .then((res) => {
            this.loading = false;
            
            sessionStorage.setItem("access-token", res.headers["access-token"]);
            this.notifyUpdateVue('bottom', 'right');
          })
          .catch((err) => {
            this.notifyErrorVue('bottom', 'right');
          });
      }
    },
    getPaymentMethod() {
      this.loadingData = true;

      api.get('/payment_terms/' + this.payment_id, 
      {
        headers: {
          "access-token": sessionStorage.getItem("access-token"),
          "client": sessionStorage.getItem("client"),
          "uid": sessionStorage.getItem("uid"),
        }
      })
        .then((res) => {
          this.loadingData = false;
          this.isEditing = true;
          this.payment_term = res.data;
          sessionStorage.setItem("access-token", res.headers["access-token"]);
        })
        .catch((err) => {
          this.loadingData = false;
          this.notifyErrorVue('bottom', 'right');
        });
    },
    notifySuccessVue(verticalAlign, horizontalAlign) {
      this.$notify({
        component: NotificationSuccess,
        icon: "ti-thumb-up",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "success"
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
    notifyUpdateVue(verticalAlign, horizontalAlign) {
      this.$notify({
        component: UpdateNotification,
        icon: "ti-thumb-up",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "success"
      });
    }
  },
  mounted() {
    this.payment_id = this.$route.params.id;
    if(this.payment_id > 0) {
      this.getPaymentMethod();
    }
  }
}
</script>

<style>

  
</style>