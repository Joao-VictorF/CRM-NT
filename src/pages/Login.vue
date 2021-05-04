<template>
    <v-row justify="center" align="center" class="degrade-background" no-gutters>
      <v-col class="center-column"
      xl="5" lg="5" md="6" sm="10" cols="10">
        <img src="/logo.png" width="75%">
      </v-col>

      <v-col
      xl="5" lg="5" md="6" sm="10" cols="10">
        <v-card>
          <h1 class=" text-center pt-4 login-title">
            CRM
          </h1>

          <v-form @submit="login()"
            ref="form" class="login-form" v-model="valid" lazy-validation>
            <v-text-field 
              class="login-input"
              v-model="user.email"
              :rules="[rules.required]"
              label="Email"
              required filled dense rounded
            ></v-text-field>

            <v-text-field 
              class="login-input mt-2"
              v-model="user.password"
              :rules="[rules.required]"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              label="Senha"
              required  filled dense rounded
            ></v-text-field>

            <v-row justify="center" no-gutters>
              <v-col class="center-column" lg="4" md="4" sm="5" cols="5">
                <v-btn block
                  :disabled="!valid || loading" color="#006ecb" class="loginBtn" @click="login()">
                  <v-progress-circular
                    v-if="loading"
                    indeterminate
                    size="25"
                    width="3"
                    color="white">
                  </v-progress-circular>
                  <span v-else class="white--text">Entrar</span>
                </v-btn>
              </v-col>
            </v-row>

            <div>
              <p v-if="errorMessage" class="errors">
                {{errorMessage}}
              </p>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
</template>

<script>
import api from "@/plugins/axios";

export default {
  data() {
    return {
      loading: false,
      valid: true,
      showPassword: false,
      errorMessage: "",
      rules: {
        required: value => !!value || 'Este campo é obrigatório.',
        email: v => /.+@.+\..+/.test(v) || 'Informe um email válido!',
      },
      user: {
        email: "", // crm@admin.com 
        password: "" // a1b2c3d4
      }
    };
  },
  methods: {
    login() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        api.post("/auth/sign_in", this.user)
          .then((res) => {
            sessionStorage.setItem("access-token", res.headers["access-token"]);
            sessionStorage.setItem("client", res.headers.client);
            sessionStorage.setItem("uid", res.headers.uid);

            localStorage.setItem("isAdmin", res.data.data.admin);

            localStorage.setItem("firstAccess", res.data.data.is_first_access);
            localStorage.setItem("userID", res.data.data.id);

            if (res.data.data.is_first_access) {
              this.$router.push('/change-default-password');
            } else {
              window.location = "/dashboard";
            } 
          })
          .catch((err) => {
            this.loading = false;
            this.errorMessage = err.response.data.errors[0];
          });
      }
    }
  }
};
</script>
<style scoped>
  .row:nth-child(1) {
    min-height: 100vh;
  }

  .degrade-background {
    background: rgb(240,240,240);
    background: linear-gradient(125deg, rgba(240,240,240,1) 0%, rgba(210,210,210,1) 50%);
  }

  .start-column {
    display: flex;
    justify-content: start;
    align-items: center;
  }

  .center-column {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .end-column {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .login-title {
    letter-spacing: 2px;
    font-size: 35pt;
    font-weight: 400;
  }

  .loginBtn {
    min-width: 50% !important;
  }

  .login-form {
    padding: 25px;
  }

  .p-0 {
    padding: 0px !important;
  }

  .errors {
    margin-top: 15px;
    color: firebrick;
    text-align: center;
  }
</style>
