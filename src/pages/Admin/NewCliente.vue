<template>
  <v-container>
    <v-form  ref="form" v-model="valid" lazy-validation>
      <v-row justify="center">
        <!-- Nome Fisico e Fantasia -->
        <v-col lg="6" md="6" sm="6" cols="12">
          <v-text-field
            v-model="client.name"
            :rules="[rules.required]"
            label="Nome completo"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>

        <v-col lg="6" md="6" sm="6" cols="12">
          <v-text-field
            v-model="client.fantasy_name"
            :rules="[rules.required]"
            label="Nome fantasia"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>
        <!--  -->


        <!-- CNPJ e Inscrição Estadual -->
        <v-col lg="6" md="6" sm="6" cols="12">
          <v-text-field
            v-model="client.cnpj"
            :rules="[rules.required, rules.cnpj]"
            label="CNPJ"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>

        <v-col lg="6" md="6" sm="6" cols="12">
          <v-text-field
            v-model="client.state_registration"
            :rules="[rules.required]"
            label="Inscrição Estadual"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>
        <!--  -->


        <!-- Nome e Número de telefone -->
        <v-col lg="6" md="6" sm="6" cols="12">
          <v-text-field
            v-model="client.contact_name_telephone"
            :rules="[rules.required]"
            label="Nome de contato - Fone"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>

         <v-col lg="6" md="6" sm="6" cols="12">
          <v-text-field
            v-model="client.telephone_number"
            :rules="[rules.required]"
            label="Fone"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>
        <!--  -->


        <!-- Nome e Número de celular -->
        <v-col lg="6" md="6" sm="6" cols="12">
          <v-text-field
            v-model="client.contact_name_cell_phone"
            :rules="[rules.required]"
            label="Nome de contato - Celular"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>

        <v-col lg="6" md="6" sm="6" cols="12">
          <v-text-field
            v-model="client.cell_phone_number"
            :rules="[rules.required]"
            label="Celular"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>
        <!--  -->


        <!-- Estado, Cidade e Cep -->
        <v-col lg="4" md="4" sm="4" cols="12">
          <v-select
            v-model="client.state_id"
            :items="states"
            item-text="name"
            item-value="id"
            label="Estado"
            persistent-hint
            :rules="[rules.required]"
            required
            outlined
            dense
            @change="getCities(client.state_id)"
          ></v-select>
        </v-col>

        <v-col lg="4" md="4" sm="4" cols="12">
          <v-select
            :disabled="cities.length == 0 || loadingCities"
            v-model="client.city_id"
            :items="cities"
            item-text="name"
            item-value="id"
            label="Cidades"
            persistent-hint
            :rules="[rules.required]"
            required
            outlined
            dense
          ></v-select>
        </v-col>

        <v-col lg="4" md="4" sm="4" cols="12">
          <v-text-field
            v-model="client.cep"
            :rules="[rules.required]"
            label="CEP"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>
        <!--  -->

        <!-- Bairro e Rua  -->
        <v-col lg="6" md="6" sm="6" cols="12">
          <v-text-field
            v-model="client.neighborhood"
            :rules="[rules.required]"
            label="Bairro"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>

        <v-col lg="6" md="6" sm="6" cols="12">
          <v-text-field
            v-model="client.street_adress"
            :rules="[rules.required]"
            label="Rua"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>
        <!--  -->

        <!-- Numero e Complemento-->
        <v-col lg="6" md="6" sm="6" cols="12">
          <v-text-field
            v-model="client.number_address"
            :rules="[rules.required]"
            label="Número"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>

        <v-col lg="6" md="6" sm="6" cols="12">
          <v-text-field
            v-model="client.complement_address"
            :rules="[rules.required]"
            label="Complemento"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>
        <!--  -->


        <!-- Email -->
        <v-col cols="12">
          <v-text-field
            v-model="client.email"
            :rules="[rules.required, rules.email]"
            label="Email"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>
        <!--  -->


        <!-- Botão -->
        <v-col lg="4" md="6" sm="6" cols="12" class="btnCol">
          <v-btn
            :disabled="!valid || loading"
            color="success"
            class="createBtn"
            @click="createClient()"
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
import NotificationSuccess from '@/pages/Notifications/SuccessUserNotification';
import NotificationError from '@/pages/Notifications/ErrorNotification';

export default {
  data() {
    return {
      loading: false,
      loadingCities: false,
      valid: true,
      client: {
        email: "",
        password: "",
        password_confirmation: "",
        name: "",
        cnpj: "",
        fantasy_name: "",
        state_registration: "",
        telephone_number: "",
        cell_phone_number: "",
        street_adress: "",
        number_address: "",
        complement_address: "",
        neighborhood: "",
        cep: "",
        city_id: 0,
        state_id: 1,
        contact_name_telephone: "",
        contact_name_cell_phone: ""
      },
      states: [
        {id: 1,  name: 'Acre',                federation_unity: 'AC'},
        {id: 2,  name: 'Alagoas',             federation_unity: 'AL'},
        {id: 3,  name: 'Amazonas',            federation_unity: 'AM'},
        {id: 4,  name: 'Amapá',               federation_unity: 'AP'},
        {id: 5,  name: 'Bahia',               federation_unity: 'BA'},
        {id: 6,  name: 'Ceará',               federation_unity: 'CE'},
        {id: 7,  name: 'Distrito Federal',    federation_unity: 'DF'},
        {id: 8,  name: 'Espírito Santo',      federation_unity: 'ES'},
        {id: 9,  name: 'Goiás',               federation_unity: 'GO'},
        {id: 10, name: 'Maranhão',            federation_unity: 'MA'},
        {id: 11, name: 'Minas Gerais',        federation_unity: 'MG'},
        {id: 12, name: 'Mato Grosso do Sul',  federation_unity: 'MS'},
        {id: 13, name: 'Mato Grosso',         federation_unity: 'MT'},
        {id: 14, name: 'Pará',                federation_unity: 'PA'},
        {id: 15, name: 'Paraíba',             federation_unity: 'PB'},
        {id: 16, name: 'Pernambuco',          federation_unity: 'PE'},
        {id: 17, name: 'Piauí',               federation_unity: 'PI'},
        {id: 18, name: 'Paraná',              federation_unity: 'PR'},
        {id: 19, name: 'Rio de Janeiro',      federation_unity: 'RJ'},
        {id: 20, name: 'Rio Grande do Norte', federation_unity: 'RN'},
        {id: 21, name: 'Rondônia',            federation_unity: 'RO'},
        {id: 22, name: 'Roraima',             federation_unity: 'RR'},
        {id: 23, name: 'Rio Grande do Sul',   federation_unity: 'RS'},
        {id: 24, name: 'Santa Catarina',      federation_unity: 'SC'},
        {id: 25, name: 'Sergipe',             federation_unity: 'SE'},
        {id: 26, name: 'São Paulo',           federation_unity: 'SP'},
        {id: 27, name: 'Tocantins',           federation_unity: 'TO'},
      ],
      cities: [
        {
          id: 79,
          name:"Acr elândia",
        },
        {
          id: 80,
          name:"Assis  Brasil",
        },
        {
          id: 81,
          name:"Br asiléia",
        },
        {
          id: 82,
          name: "Bujari",
        },
        {
          id: 83,
          name:"C apixaba",
        },
        {
          id: 84,
          name:"Cruzeiro  do Sul",
        },
        {
          id: 85,
          name:"Epitaci olândia",
        },
        {
          id: 86,
          name: "Feijó",
        },
        {
          id: 87,
          name: "Jordão",
        },
        {
          id: 88,
          name:"Mânc io Lima",
        },
        {
          id: 89,
          name:"Manoel  Urbano",
        },
        {
          id: 90,
          name:"Marechal Thau maturgo",
        },
        {
          id: 91,
          name:"Plácido de  Castro",
        },
        {
          id: 92,
          name:"Por to Acre",
        },
        {
          id: 93,
          name:"Porto  Walter",
        },
        {
          id: 94,
          name:"Rio  Branco",
        },
        {
          id: 95,
          name:"Rodrigue s Alves",
        },
        {
          id: 96,
          name:"Santa Rosa d o Purus",
        },
        {
          id: 97,
          name:"Sena Ma dureira",
        },
        {
          id: 98,
          name:"Senador G uiomard",
        },
        {
          id: 99,
          name:"T arauacá",
        },
        {
          id: 100,
          name: "Xapuri",
        }
      ],
      rules: {
        required: value => !!value || 'Este campo é obrigatório.',
        email: v => /.+@.+\..+/.test(v) || 'Informe um email válido!',
        cnpj: v=> /(\d{2}[-.\s]?\d{3}[-.\s]?\d{3}[-.\s\/]?\d{4}[-.\s]?\d{2})/g.test(v) || 'Informe um CNPJ válido.',
      },
    };
  },
  methods: {
    createClient() {
      if(this.$refs.form.validate()) {
        this.loading = true;

        this.client.password = this.client.cnpj.split('.').join("");
        this.client.password = this.client.password.slice(0,6);
        this.client.password_confirmation = this.client.password;

        api.post('/auth', this.client)
          .then((res) => {
            this.loading = false;
            sessionStorage.setItem("access-token", res.headers["access-token"]);
            this.notifySuccessVue('bottom', 'right');
          })
          .catch((err) => {
            this.loading = false;
            this.notifyErrorVue('bottom', 'right');
          });
      }
    },
    getCities(stateID) {
      this.loadingCities = true;

      api.get('/states/'+ stateID.toString() +'/cities', {
        headers: {
          "access-token": sessionStorage.getItem("access-token"),
          "client": sessionStorage.getItem("client"),
          "uid": sessionStorage.getItem("uid"),
        }
      })
        .then((res) => {
          this.loadingCities = false;
          
          sessionStorage.setItem("access-token", res.headers["access-token"]);
          this.cities = res.data;
        })
        .catch((err) => {
          this.loadingCities = false;
          console.log(err.response);
        });
    },
    notifySuccessVue(verticalAlign, horizontalAlign) {
      const color = "";
      this.$notify({
        component: NotificationSuccess,
        icon: "ti-thumb-up",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "success"
      });
    },
    notifyErrorVue(verticalAlign, horizontalAlign) {
      const color = "";
      this.$notify({
        component: NotificationError,
        icon: "ti-thumb-down",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "Danger"
      });
    }
  }
}
</script>

<style>

  
</style>