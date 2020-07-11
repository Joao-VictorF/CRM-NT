<template>
  <v-container>
    <v-row  v-if="loadingData" justify="center">
      <v-col cols="3">
        <div class="text-center">
          <v-progress-circular
            indeterminate
            size="100"
            width="4"
            color="light-blue"
          ></v-progress-circular>
        </div>
      </v-col>
    </v-row> 

    <v-form v-else  ref="form" v-model="valid" lazy-validation>
      <v-row justify="center">
        <!-- Codigo e válidade -->
        <v-col lg="6" md="6" sm="6" cols="12">
          <v-text-field required
            :rules="[rules.required]"
            v-model="product.description"
            label="Descrição do produto"
            outlined
            dense
          ></v-text-field>
        </v-col>

        <v-col lg="6" md="6" sm="6" cols="12">
          <v-text-field required
            type="number"
            :rules="[rules.required]"
            v-model="product.code"
            label="Código"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <!--  -->

        <!-- Estoque atual e minimo -->
        <v-col lg="6" md="6" sm="6" cols="12">
          <v-text-field required
            type="number"
            :rules="[rules.required]"
            v-model="product.current_stock"
            label="Estoque atual"
            outlined
            dense
          ></v-text-field>
        </v-col>

        <v-col lg="6" md="6" sm="6" cols="12">
          <v-text-field required
            type="number"
            :rules="[rules.required]"
            v-model="product.minimum_stock"
            label="Estoque mínimo"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <!--  -->

        <!-- Valor de compra e venda -->
        <v-col lg="6" md="6" sm="6" cols="12">
          <v-currency-field 
            :rules="[rules.required]"
            label="Valor de venda" 
            :error-messages="errors.sale_valueInput"
            outlined
            dense
            v-model="sale_valueInput"
          ></v-currency-field>
        </v-col>

        <v-col lg="6" md="6" sm="6" cols="12">
          <v-currency-field 
            label="Valor de compra" 
            :rules="[rules.required]"
            :error-messages="errors.cost_valueInput"
            outlined
            dense
            v-model="cost_valueInput"
          ></v-currency-field>
        </v-col>
        <!--  -->

        <!-- Unidade de medida e Validade-->
        <v-col lg="6" md="6" sm="6" cols="12">
          <v-select
            v-model="product.unit_measurement"
            :items="measurement_units"
            item-text="name"
            item-value="sigla"
            label="Unidade de medida"
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
            v-model="product.shelf_life"
            label="Validade"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <!--  -->

        <!--  -->
        <v-col lg="4" md="6" sm="6" cols="12">
          <v-checkbox value
            v-model="product.active"
            label="Produto ativo"
            persistent-hint
            hint="Caso o produto esteja ativo, você poderá receber uma cotação de compra quando o estoque dele estiver baixo."
          >
          </v-checkbox>
        </v-col>

        <v-col lg="8" md="6" sm="6" cols="0">
        </v-col>
        <!--  -->

        <!-- Botão -->
        <v-col lg="4" md="6" sm="6" cols="12" class="btnCol">
          <v-btn
            :disabled="!valid || loading"
            color="success"
            class="createBtn"
            @click="isEditing ? editProduct() : createProduct()"
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
import UpdateNotification from '@/pages/Notifications/UpdateNotification';

export default {
  data() {
    return {
      loading: false,
      loadingData: false,
      isEditing: false,
      valid: true,
      product_id: 0,
      product: {
        description: "",
        code: "",
        current_stock: "",
        minimum_stock: "",
        cost_value: 0,
        sale_value: 0,
        shelf_life: "",
        active: true,
        unit_measurement: 0,
      },
      measurement_units: [
        {id: 0,  name: 'Pacote',     sigla: 'PTE'},
        {id: 1,  name: 'Quilograma', sigla: 'KG'},
        {id: 2,  name: 'Metro',      sigla: 'MT'},
        {id: 3,  name: 'Unidade',    sigla: 'UN'},
        {id: 4,  name: 'Litro',      sigla: 'LT'},
        {id: 5,  name: 'Caixa',      sigla: 'CX'},
        {id: 6,  name: 'Mililitro',  sigla: 'ML'},
        {id: 7,  name: 'Peça',       sigla: 'PC'},
        {id: 8,  name: 'Fardo',      sigla: 'FD'},
        {id: 9,  name: 'Frasco',     sigla: 'FR'},
      ],
      rules: {
        required: value => !!value || 'Este campo é obrigatório.',
      },
      sale_valueInput: 0,
      cost_valueInput: 0,
      errors: {}
    };
  },
  methods: {
    createProduct() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        this.product.sale_value = this.sale_valueInput;
        this.product.cost_value = this.cost_valueInput;
        this.product.shelf_life = this.product.shelf_life.split('-').reverse().join('/');

        console.log(this.product);
        
        api.post('/users/' + localStorage.getItem("userID") + '/products', this.product, {
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
      }
    },
    getProduct(){
      this.loadingData = true;

      api.get('/users/' + localStorage.getItem("userID") + '/products/' + this.product_id, 
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
          this.product = res.data;
          this.sale_valueInput = this.product.sale_value;
          this.cost_valueInput = this.product.cost_value;

          sessionStorage.setItem("access-token", res.headers["access-token"]);
        })
        .catch((err) => {
          this.loadingData = false;
          this.notifyErrorVue('bottom', 'right');
        });
    },
    editProduct() {
      if(this.$refs.form.validate()) {
        this.loading = true;

        api.put('/users/' + localStorage.getItem("userID") + '/products/' + this.product_id, { "product": this.product },
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
    this.product_id = this.$route.params.id;
    if(this.product_id > 0) {
      this.getProduct();
    }
  }
}
</script>

<style>

  
</style>