<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col lg="5" md="7" sm="10">
        <v-dialog max-width="600px" v-model="deleteModal" persistent>
          <v-card>
            <v-card-title class="headline" >Tem certeza que deseja excluir esse produto?</v-card-title>
            <v-card-text>{{selectedProduct.description}}</v-card-text>
            <v-card-actions v-if="!loadingDelete">
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="deleteModal = false">Não</v-btn>
              <v-btn color="green darken-1" text @click="deleteProduct()">Sim</v-btn>
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

    <v-row justify="end">
      <v-col cols="2">
        <router-link to="/new-product">
          <v-btn color="success">
            <i class="ti-plus"></i>
            Novo produto
          </v-btn>
        </router-link>
      </v-col>
      
      <v-spacer></v-spacer>

      <v-col lg="4" md="5" sm="6">
        <router-link to="/import-products">
          <v-btn color="success">
            <i class="ti-import"></i>
            Importar lista de produtos
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
          v-for="product in productsData" :key="product.id"
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

            <v-row justify="space-between">
              <v-col cols="2">
                <v-btn color="info" @click="editProduct(product.id)">
                  <v-icon>mdi-pencil</v-icon>
                  Editar
                </v-btn>
              </v-col>

              <v-col cols="2">
                <v-btn color="error" @click="openDeleteModal(product)">
                  <v-icon>mdi-delete</v-icon>
                  Excluir
                </v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-content>

        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container> 
</template>
<script>
import api from "@/plugins/axios";
import NotificationError from '@/pages/Notifications/ErrorNotification';
import NotificationSuccess from '@/pages/Notifications/SuccessDeleteNotification';

export default {
  data() {
    return {
      loading: true,
      loadingDelete: false,
      deleteModal: false,
      selectedProduct: {
        "description": "",
      },
      productsData: [],
    };
  },
  methods: {
    getProducts() {
      api.get('/users/' + localStorage.getItem("userID") + '/products', {
        headers: {
          "access-token": sessionStorage.getItem("access-token"),
          "client": sessionStorage.getItem("client"),
          "uid": sessionStorage.getItem("uid"),
        }
      })
        .then((res) => {
          this.loading = false;
          sessionStorage.setItem("access-token", res.headers["access-token"]);
          this.productsData = res.data;
        })
        .catch((err) => {
          // this.loading = false;
          this.notifyErrorVue("bottom", "right")
        });
    },
    deleteProduct() {
      this.loadingDelete = true;

      api.delete('/users/' + localStorage.getItem("userID") + '/products/' + this.selectedProduct.id, {
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

          this.productsData = this.productsData.filter(item => item.id !== this.selectedProduct.id);
          
        })
        .catch((err) => {
          
          this.deleteModal = false;
          this.loadingDelete = false;
          this.notifyErrorVue('bottom', 'right');
        });
    },
    openDeleteModal(product) {
      this.selectedProduct = product;
      this.deleteModal = true;
    },
    editProduct(productId) {
      this.$router.push('/edit-product/' + productId);
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
  },
  mounted() {
    this.getProducts();
  }
};
</script>

<style>
 .firstRow { 
   min-height: calc(100vh - 100px);
 }
</style>
