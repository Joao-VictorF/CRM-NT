<template>
  <v-container>
    <v-row v-if="loadingClients" justify="center" align="center">
      <div class="text-center">
        <v-progress-circular
          indeterminate
          size="100"
          width="4"
          color="light-blue"
        ></v-progress-circular>
      </div>
    </v-row>

    <v-stepper v-else v-model="stepper">
      <v-stepper-header>
        <v-stepper-step :complete="stepper > 1" step="1">Selecionar cliente</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="stepper > 2" step="2">Escolher produtos</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="stepper > 3" step="3">Definir propostas</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4">Finalizar</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row>
            <v-col lg="4" md="4" sm="4" cols="12">
              <v-select
                @change="getProducts()"
                v-model="selectedClient"
                return-object
                :items="clientsData"
                item-text="fantasy_name"
                item-value="id"
                label="Selecione o cliente"
                persistent-hint
                :rules="[rules.required]"
                required
                outlined
                dense
              ></v-select>
            </v-col>
          </v-row>

          <v-btn
            color="primary"
            @click="stepper = 2"
            :disabled="selectedClient.id == null"
          >
            Próximo
          </v-btn>

        </v-stepper-content>

        <v-stepper-content step="2">
          <v-container fluid>
            <div class="text-center" v-if="loadingProducts">
              <v-progress-circular
                indeterminate
                size="50"
                width="3"
                color="light-blue"
              ></v-progress-circular>
            </div>
            <v-data-iterator v-else
              :items="productsData"
              :items-per-page.sync="itemsPerPage"
              :page="page"
              :search="search"
              :sort-by="sortBy.toLowerCase()"
              :sort-desc="sortDesc"
              hide-default-footer>
              <template v-slot:header>
                <v-toolbar
                  dark
                  color="blue darken-3"
                  class="mb-1"
                >
                  <v-text-field
                    v-model="search"
                    clearable
                    flat
                    solo-inverted
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    label="Buscar"
                  ></v-text-field>

                  <template>
                    <v-spacer></v-spacer>
                    <v-select
                      v-model="sortBy"
                      flat
                      solo-inverted
                      hide-details
                      :items="keys"
                      item-text="text"
                      item-value="value"
                      prepend-inner-icon="mdi-magnify"
                      label="Filtar por"
                    ></v-select>
                    <v-spacer></v-spacer>
                    <v-btn-toggle
                      v-model="sortDesc"
                      mandatory
                    >
                      <v-btn
                        large
                        depressed
                        color="info"
                        :value="false"
                      >
                        <v-icon>mdi-arrow-up</v-icon>
                      </v-btn>
                      <v-btn
                        large
                        depressed
                        color="blue"
                        :value="true"
                      >
                        <v-icon>mdi-arrow-down</v-icon>
                      </v-btn>
                    </v-btn-toggle>
                  </template>
                </v-toolbar>
              </template>

              <template v-slot:default="props">
                <v-row>
                  <v-col
                    v-for="item in props.items"
                    :key="item.id"
                    cols="12"
                  >
                    <v-card>
                      <v-row justify="center">
                        <v-col cols="11">
                          <v-checkbox v-model="selectedProducts" :label="item.description" :value="item"></v-checkbox>
                        </v-col>

                        <!-- <v-col lg="5" md="5" sm="5" cols="12">
                          <v-text-field required
                            v-model="item.current_stock"
                            label="Estoque atual"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>

                        <v-col lg="5" md="5" sm="5" cols="12">
                          <v-text-field required
                            v-model="item.minimum_stock"
                            label="Estoque mínimo"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>


                        <v-col lg="5" md="5" sm="5" cols="12">
                          <v-text-field readonly
                            v-model="item.sale_value"
                            label="Valor de venda"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>

                        <v-col lg="5" md="5" sm="5" cols="12">
                          <v-text-field readonly
                            v-model="item.cost_value"
                            label="Valor de compra"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col> -->
                      </v-row>

                    </v-card>
                    
                  </v-col>
                </v-row>
              </template>

            </v-data-iterator>
          </v-container>
          <v-btn
            color="primary"
            @click="setQuotationsData()"
          >
            Continuar
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-form ref="productsForm" v-if="quotatiosProductsSetted" v-model="productsFormValid">
            <v-row  justify="center" v-for="(p, index) in selectedProducts" :key="p.id">
              <v-col cols="12"> 
                <h4 class="text-center">
                  {{p.description}}
                </h4>
              </v-col>
              <v-col lg="4" md="10" sm="10" cols="12">
                <v-currency-field
                  readonly
                  v-model="p.sale_value"
                  label="Preço da oferta"
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-currency-field>
              </v-col>

              <v-col lg="4" md="10" sm="10" cols="12">
                <v-text-field required 
                  v-model="quotations_products_attributes[index].amount"
                  :rules="[rules.required]"
                  label="Quantidade"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col cols="8">
                <v-divider
                class="mx-4"
                inset
              ></v-divider>
              </v-col>
            </v-row>            

            <v-btn
              color="primary"
              @click="goToLastStep()"
            >
              Continuar
            </v-btn>
          </v-form>  
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row justify="center">
              <!-- Descrição e Oportunidade -->
              <v-col lg="6" md="6" sm="6" cols="12">
                <v-text-field required
                  :rules="[rules.required]"
                  v-model="quotation.client_request_reference_project"
                  label="Descrição da cotação"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col lg="6" md="6" sm="6" cols="12">
                <v-select
                  v-model="quotation.opportunity"
                  :items="opportunity"
                  label="Oportunidade"
                  item-text="text"
                  item-value="value"
                  :rules="[rules.required]"
                  required
                  outlined
                  dense
                ></v-select>
              </v-col>
              <!--  -->

              <!-- Empresa de frete e tipo de frete -->
              <v-col lg="6" md="6" sm="6" cols="12">
                <v-text-field required
                  :rules="[rules.required]"
                  v-model="quotation.shipping_company"
                  label="Empresa de frete"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col lg="6" md="6" sm="6" cols="12">
                <v-select
                  v-model="quotation.shipping"
                  :items="shipping"
                  label="Tipo de entrega"
                  :rules="[rules.required]"
                  required
                  outlined
                  dense
                ></v-select>
              </v-col>
              <!--  -->

              <!-- Pagamento e Finalidade -->
              <v-col lg="6" md="6" sm="6" cols="12">
                <v-select
                  v-model="quotation.payment_option"
                  :items="payment_option"
                  item-text="text"
                  item-value="value"
                  label="Tipo de pagamento"
                  :rules="[rules.required]"
                  required
                  outlined
                  dense
                ></v-select>
              </v-col>

              <v-col lg="6" md="6" sm="6" cols="12">
                <v-select
                  v-model="quotation.finality"
                  :items="finality"
                  item-text="text"
                  item-value="value"
                  label="Finalidade"
                  :rules="[rules.required]"
                  required
                  outlined
                  dense
                ></v-select>
              </v-col>
              <!--  -->

              <!-- Condição de pagamento e Data-->
              <v-col lg="6" md="6" sm="6" cols="12">
                <v-select
                  v-model="quotation.payment_term_id"
                  :items="paymentsData"
                  item-text="description"
                  item-value="id"
                  label="Condição de pagamento"
                  :rules="[rules.required]"
                  required
                  outlined
                  dense
                ></v-select>
              </v-col>

              <v-col lg="6" md="6" sm="6" cols="12">
                <v-text-field required
                  type="date"
                  :rules="[rules.required]"
                  v-model="quotation.selected_date"
                  label="Data da cotação"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <!--  -->

              <!-- Botão -->
              <v-col lg="4" md="6" sm="6" cols="12" class="btnCol">
                <v-btn
                  :disabled="!valid || saveLoading"
                  color="success"
                  class="createBtn"
                  @click="createQuotation()"
                  block
                >
                  <v-progress-circular
                    v-if="saveLoading"
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

          <!-- <v-btn
            color="primary"
            @click="createQuotation()"
          >
            Continue
          </v-btn> -->
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import api from '@/plugins/axios';
import NotificationError from '@/pages/Notifications/ErrorNotification';
import NotificationSuccess from '@/pages/Notifications/SuccessCotacaoNotification';
export default {
  data() {
    return {
      stepper: 1,
      loading: false,
      loadingClients: true,
      loadingProducts: true,
      saveLoading: false,
      valid: true,
      clientsData: [],
      paymentsData: [],
      selectedClient: {},
      productsData: [],
      selectedProducts: [],
      quotatiosProductsSetted: false,
      quotations_products_attributes: [],
      productsFormValid: true,

      // Selects
      shipping: ["cif", "fob"],
      payment_option: [
        {
          text: "A vista",
          value: "one_payment"
        },
        {
          text: "A prazo",
          value: "deferred"
        },
        {
          text: "Boleto",
          value: "bank_slip"
        },
      ],
      finality: [
        {
          text: "Revenda",
          value: "resale"
        },
        {
          text: "Uso e consumo",
          value: "use_consumption"
        },
      ],
      opportunity: [
        {
          text: "Compra imediata",
          value: "immediate_purchase"
        },
        {
          text: "Somente cotação",
          value: "only_quotation"
        },
      ],
      // Products list
      itemsPerPageArray: [10, 20, 30],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 10,
      sortBy: 'current_stock',
      keys: [
        {text: 'Valor de custo', value: 'cost_value'},
        {text: 'Valor de venda', value: 'sale_value'},
        {text: 'Estoque mínimo', value: 'minimum_stock'},
        {text: 'Estoque atual', value: 'current_stock'},
      ],
      rules: {
        required: value => !!value || 'Este campo é obrigatório.',
        email: v => /.+@.+\..+/.test(v) || 'Informe um email válido!',
        cnpj: v=> /(\d{2}[-.\s]?\d{3}[-.\s]?\d{3}[-.\s\/]?\d{4}[-.\s]?\d{2})/g.test(v) || 'Informe um CNPJ válido.',
      },

      // Objeto final
      quotation : {
        selected_date: "",
        client_request_reference_project: "",
        recipient_id: 0,
        shipping_company: "",
        payment_option: "",
        shipping: "",
        finality: "", 
        opportunity: "",
        payment_term_id: 0, 
        quotations_products_attributes: []
      }
        
    };
  },
  computed: {
    numberOfPages () {
      return Math.ceil(this.productsData.length / this.itemsPerPage)
    },
    filteredKeys () {
      return this.keys.filter(key => key !== `Name`)
    },
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    },
  },
  methods: {
    createQuotation() {
      if(this.$refs.form.validate()) {
        this.saveLoading = true;
        this.quotation.quotations_products_attributes = this.quotations_products_attributes;
        this.quotation.recipient_id = this.selectedClient.id;
        // console.log(this.quotation);

        api.post('/users/' + localStorage.getItem("userID") + '/quotations', {"quotation": this.quotation},
        {
          headers: {
            "access-token": sessionStorage.getItem("access-token"),
            "client": sessionStorage.getItem("client"),
            "uid": sessionStorage.getItem("uid"),
          }
        })
        .then((res) => {
          this.saveLoading = false;
          sessionStorage.setItem("access-token", res.headers["access-token"]);
          this.notifySuccessVue("bottom", "right")

        })
        .catch((err) => {
          this.notifyErrorVue("bottom", "right")
        });
      }
    },
    getClients() {
      api.get('/users', {
        headers: {
          "access-token": sessionStorage.getItem("access-token"),
          "client": sessionStorage.getItem("client"),
          "uid": sessionStorage.getItem("uid"),
        }
      })
      .then((res) => {
        sessionStorage.setItem("access-token", res.headers["access-token"]);
        this.clientsData = res.data;

        this.clientsData = this.clientsData.filter(item => item.admin !== true);

        this.getPaymentMethods();
      })
      .catch((err) => {
        this.notifyErrorVue("bottom", "right")
        });
    },
    getPaymentMethods() {
      api.get('/payment_terms', {
        headers: {
          "access-token": sessionStorage.getItem("access-token"),
          "client": sessionStorage.getItem("client"),
          "uid": sessionStorage.getItem("uid"),
        }
      })
        .then((res) => {
          this.loadingClients = false;
          sessionStorage.setItem("access-token", res.headers["access-token"]);
          this.paymentsData = res.data;
          
        })
        .catch((err) => {
          this.notifyErrorVue('bottom', 'right');
        });
    },
    getProducts() {
      this.loadingProducts = true;

      api.get('/users/' + localStorage.getItem("userID") + '/products', {
        headers: {
          "access-token": sessionStorage.getItem("access-token"),
          "client": sessionStorage.getItem("client"),
          "uid": sessionStorage.getItem("uid"),
        }
      })
        .then((res) => {
          this.productsData = [];          
          this.loadingProducts = false;
          sessionStorage.setItem("access-token", res.headers["access-token"]);
          this.productsData = res.data;
        })
        .catch((err) => {
          // this.loading = false;
          this.notifyErrorVue("bottom", "right")
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
    setQuotationsData() {

      for(var i = 0; i <= this.selectedProducts.length - 1; i++) {
        var idProduct = this.selectedProducts[i].id;
        
        var obj = {
          product_id: idProduct,
          price: 0,
          amount: 0
        }
        this.quotations_products_attributes.push(obj);
      }

      this.quotatiosProductsSetted = true;
      this.stepper = 3;
    },
    goToLastStep() {
      if(this.$refs.productsForm.validate()) {
        this.stepper = 4;
      }
    }
  },
  mounted() {
    this.getClients();
  }
}
</script>

<style>
</style>