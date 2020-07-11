<template>
  <v-container>
    <v-row justify="end">
      <v-col cols="2">
        <router-link to="/new-client">
          <v-btn color="success">
            <i class="ti-plus"></i>
            Novo cliente
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
          v-for="client in clientsData" :key="client.id"
          v-if="!client.admin"
          hide-actions
        >
          <v-expansion-panel-header  >
            <v-row align="center" class="spacer" no-gutters>
              <v-col cols="4" sm="2" md="1">
                <v-avatar size="40px">
                  <img v-if="client.image" alt="Avatar" :src="client.image">
                  <v-icon
                    v-else
                    color="teal"
                  ></v-icon>
                </v-avatar>
              </v-col>

              <v-col sm="5" md="3">
                <strong v-html="client.fantasy_name"></strong>
              </v-col>
            </v-row>
          </v-expansion-panel-header>

          <v-expansion-panel-content >
            <v-divider></v-divider>
              <v-form>
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
      clientsData: [],
    };
  },
  methods: {
    getClients() {
      api.get('/users', {
        headers: {
          "access-token": sessionStorage.getItem("access-token"),
          "client": sessionStorage.getItem("client"),
          "uid": sessionStorage.getItem("uid"),
        }
      })
        .then((res) => {
          this.loading = false;
          sessionStorage.setItem("access-token", res.headers["access-token"]);
          this.clientsData = res.data;
        })
        .catch((err) => {
          // this.loading = false;
          this.notifyErrorVue("bottom", "right")
        });
    },
    getNameInitials(name) {
      var parts = name.split(' ')
      var initials = ''
      for (var i = 0; i < 2; i++) {
        if (parts[i].length > 0 && parts[i] !== '') {
          initials += parts[i][0]
        }
      }
      return initials
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
    this.getClients();
  }
};
</script>

<style>
 .firstRow { 
   min-height: calc(100vh - 100px);
 }
</style>
