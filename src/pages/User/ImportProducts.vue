<template>
  <v-container>
    <v-row justify="center" v-if="showInstructions">
      <v-col cols="12">
        <h2 class="text-center">
          Como importar uma lista de produtos
        </h2> 
      </v-col>

        <v-timeline align-top dense>
          <v-timeline-item color="teal lighten-3" small>
            <v-row class="pt-1">
              <v-col>
                Salve a sua planilha no formato .csv
              </v-col>
            </v-row>
          </v-timeline-item>

          <v-timeline-item color="teal lighten-3" small>
            <v-row class="pt-1">
              <v-col>
                Caso a sua planilha possua Cabeçalhos na primeira Linha de cada Coluna,<br> marque a opção "Possui cabeçalhos"
              </v-col>
            </v-row>
          </v-timeline-item>

          <v-timeline-item color="teal lighten-3" small>
            <v-row class="pt-1">
              <v-col>
                Importe o o arquivo clicando no botão "Escolher arquivo"
              </v-col>
            </v-row>
          </v-timeline-item>

          <v-timeline-item color="teal lighten-3" small>
            <v-row class="pt-1">
              <v-col>
                Clique no botão "Carregar produtos"
              </v-col>
            </v-row>
          </v-timeline-item>

          <v-timeline-item color="teal lighten-3" small>
            <v-row class="pt-1">
              <v-col>
                Verifique a lista de produtos gerada
              </v-col>
            </v-row>
          </v-timeline-item>

          <v-timeline-item color="teal lighten-3" small>
            <v-row class="pt-1">
              <v-col>
                Caso tudo esteja ok, basta salvar!
              </v-col>
            </v-row>
          </v-timeline-item>
        </v-timeline>

      <v-col cols="12" class="text-center">
        <v-btn color="success" @click="showInstructions = false">
          Entendido!
        </v-btn>
      </v-col>
    </v-row> 

    <v-row justify="center" v-else>
      <!-- Import -->
      <v-col lg="10" md="10" sm="10" cols="12" class="btnCol">
        <vue-csv-import
          v-model="products"
          :map-fields="{description: 'Descrição', code: 'Código', current_stock: 'Estoque atual',
          minimum_stock: 'Estoque mínimo', cost_value: 'Valor de custo', sale_value: 'Valor de venda', shelf_life: 'Validade',
          unit_measurement: 'Unidade'
          }">
          <template slot="hasHeaders" slot-scope="{headers, toggle}">
            <label>
              <input type="checkbox" id="hasHeaders" :value="true" @change="toggle">
              Possui cabeçalhos
            </label>
          </template>

          <template slot="error">
            <p class="errorText">Arquivo inválido</p>
          </template>
      
          <template slot="thead">
              <tr>
                <th>Meus campos</th>
                <th>Colunas</th>
              </tr>
          </template>
      
          <template slot="next" slot-scope="{load}">
              <v-btn color="success" @click.prevent="load">
                Carregar produtos
              </v-btn>
          </template>
      
          <template slot="submit" slot-scope="{submit}">
              <button @click.prevent="submit">Enviar!</button>
          </template>
        </vue-csv-import>
      </v-col>

      <v-expansion-panels v-if="products.length > 0" popout>
        <v-expansion-panel
          v-for="product in products" :key="product.id"
          hide-actions
        >
          <v-expansion-panel-header>
            <v-row align="center" class="spacer" no-gutters>
              <v-col sm="5" md="3">
                <strong v-html="product.description"></strong>
              </v-col>
            </v-row>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-divider></v-divider>
            <v-form>
              <v-row justify="center">
                <!-- Codigo e descrição -->
                <v-col lg="6" md="6" sm="6" cols="12">
                  <v-text-field readonly
                    v-model="product.description"
                    label="Descrição"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col lg="6" md="6" sm="6" cols="12">
                  <v-text-field readonly
                    v-model="product.code"
                    label="Código"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <!--  -->

                <!-- Estoque atual e minimo -->
                <v-col lg="6" md="6" sm="6" cols="12">
                  <v-text-field readonly
                    v-model="product.current_stock"
                    label="Estoque atual"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col lg="6" md="6" sm="6" cols="12">
                  <v-text-field readonly
                    v-model="product.minimum_stock"
                    label="Estoque mínimo"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <!--  -->


                <!-- Valor de compra e venda -->
                <v-col lg="6" md="6" sm="6" cols="12">
                  <v-text-field readonly
                    v-model="product.sale_value"
                    label="Valor de venda"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col lg="6" md="6" sm="6" cols="12">
                  <v-text-field readonly
                    v-model="product.cost_value"
                    label="Valor de compra"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <!--  -->

                <!-- Unidade de medida e Validade-->
                <v-col lg="6" md="6" sm="6" cols="12">
                  <v-text-field readonly
                    v-model="product.unit_measurement"
                    label="unidade de medida"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col lg="6" md="6" sm="6" cols="12">
                  <v-text-field readonly
                    type="date"
                    v-model="product.shelf_life"
                    label="Validade"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-expansion-panel-content>

        </v-expansion-panel>
      </v-expansion-panels>

      <v-col cols="4">
        <v-btn :disabled="loading" block v-if="products.length > 0" color="success" @click="saveProducts()">
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
      <!-- {{products}} -->
    </v-row>
  </v-container>
</template>

<script>
import api from "@/plugins/axios";
import NotificationSuccess from '@/pages/Notifications/SuccessImportNotification';
import NotificationError from '@/pages/Notifications/ErrorNotification';
import { VueCsvImport } from 'vue-csv-import';

export default {
  components: { VueCsvImport },
  data() {
    return {
      loading: false,
      showInstructions: true,
      valid: true,
      products: [],
      measurement_units: [
        {id: 0,  name: 'Metro',      sigla: 'MT'},
        {id: 1,  name: 'Unidade',    sigla: 'UN'},
        {id: 2,  name: 'Quilograma', sigla: 'KG'},
        {id: 3,  name: 'Litro',      sigla: 'LT'},
        {id: 4,  name: 'Caixa',      sigla: 'CX'},
        {id: 5,  name: 'Mililitro',  sigla: 'ML'},
        {id: 6,  name: 'Peça',       sigla: 'PC'},
        {id: 7,  name: 'Fardo',      sigla: 'FD'},
        {id: 8,  name: 'Frasco',     sigla: 'FR'},
        {id: 8,  name: 'Pacote',     sigla: 'PTE'},
      ],
    };
  },
  methods: {
    saveProducts() {
      this.loading = true;
      
      api.post('/users/' + localStorage.getItem("userID") + '/products/import', {"products": this.products}, {
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
          this.loading = false;
          this.notifyErrorVue('bottom', 'right');
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
        type: "danger"
      });
    }
  }
}
</script>

<style>
  .errorText {
    margin-top: 20px;
    color: firebrick;
    font-size: 13pt;
  }
  
</style>