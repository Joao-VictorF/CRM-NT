<template>
  <v-container>
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

      <v-form v-else>
        <v-row justify="center">
          <!-- Nome Fisico e Fantasia -->
          <v-col lg="6" md="6" sm="6" cols="12">
            <v-text-field readonly
              v-model="client.name"
              label="Nome completo"
              outlined
              dense
            ></v-text-field>
          </v-col>

          <v-col lg="6" md="6" sm="6" cols="12">
            <v-text-field readonly
              v-model="client.fantasy_name"
              label="Nome fantasia"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <!--  -->


          <!-- CNPJ e Inscrição Estadual -->
          <v-col lg="6" md="6" sm="6" cols="12">
            <v-text-field readonly
              v-model="client.cnpj"
              label="CNPJ"
              outlined
              dense
            ></v-text-field>
          </v-col>

          <v-col lg="6" md="6" sm="6" cols="12">
            <v-text-field readonly
              v-model="client.state_registration"
              label="Inscrição Estadual"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <!--  -->


          <!-- Nome e Número de telefone -->
          <v-col lg="6" md="6" sm="6" cols="12">
            <v-text-field readonly
              v-model="client.contact_name_telephone"
              label="Nome de contato - Fone"
              outlined
              dense
            ></v-text-field>
          </v-col>

          <v-col lg="6" md="6" sm="6" cols="12">
            <v-text-field readonly
              v-model="client.telephone_number"
              label="Fone"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <!--  -->


          <!-- Nome e Número de celular -->
          <v-col lg="6" md="6" sm="6" cols="12">
            <v-text-field readonly
              v-model="client.contact_name_cell_phone"
              label="Nome de contato - Celular"
              outlined
              dense
            ></v-text-field>
          </v-col>

          <v-col lg="6" md="6" sm="6" cols="12">
            <v-text-field readonly
              v-model="client.cell_phone_number"
              label="Celular"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <!--  -->


          <!-- Estado, Cidade e Cep -->
          <!-- <v-col lg="4" md="4" sm="4" cols="12">
            <v-select
              :items="states"
              item-text="name"
              item-value="id"
              label="Estado"
              outlined
              dense
            ></v-select>
          </v-col>

          <v-col lg="4" md="4" sm="4" cols="12">
            <v-select
              :items="cities"
              item-text="name"
              item-value="id"
              label="Cidades"
              return-object
              outlined
              dense
            ></v-select>
          </v-col> -->
          <!--  -->

          <!-- Bairro e Rua  -->
          <v-col lg="4" md="4" sm="4" cols="12">
            <v-text-field readonly
              v-model="client.neighborhood"
              label="Bairro"
              outlined
              dense
            ></v-text-field>
          </v-col>

          <v-col lg="4" md="4" sm="4" cols="12">
            <v-text-field readonly
              v-model="client.street_adress"
              label="Rua"
              outlined
              dense
            ></v-text-field>
          </v-col>

          <v-col lg="4" md="4" sm="4" cols="12">
            <v-text-field readonly
              v-model="client.cep"
              label="CEP"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <!--  -->

          <!-- Numero e Complemento-->
          <v-col lg="6" md="6" sm="6" cols="12">
            <v-text-field readonly
              v-model="client.number_address"
              label="Número"
              outlined
              dense
            ></v-text-field>
          </v-col>

          <v-col lg="6" md="6" sm="6" cols="12">
            <v-text-field readonly
              v-model="client.complement_address"
              label="Complemento"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <!--  -->


          <!-- Email -->
          <v-col cols="12">
            <v-text-field readonly
              v-model="client.email"
              label="Email"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <!--  -->
        </v-row>
      </v-form>
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
      client: {},
    };
  },
  methods: {
    getProfile() {
      api.get('/users/' + localStorage.getItem("userID"), {
        headers: {
          "access-token": sessionStorage.getItem("access-token"),
          "client": sessionStorage.getItem("client"),
          "uid": sessionStorage.getItem("uid"),
        }
      })
        .then((res) => {
          this.loading = false;
          sessionStorage.setItem("access-token", res.headers["access-token"]);
          this.client = res.data;
        })
        .catch((err) => {
          this.notifyErrorVue("bottom", "right")
          console.log(err.response);
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
    this.getProfile();
  }
};
</script>

<style>
 .firstRow { 
   min-height: calc(100vh - 100px);
 }
</style>