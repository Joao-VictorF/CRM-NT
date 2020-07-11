<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col xl="5" lg="7" md="8">
        <v-card elevation="2">
          <div class="card-body">
            <div class="d-flex flex-column align-items-center">

              <h1 class="title">
                Entrar
              </h1>

              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-text-field
                  v-model="user.email"
                  :rules="[rules.email, rules.required]"
                  label="E-mail"
                  required
                  outlined
                  dense
                ></v-text-field>

                <v-text-field
                  v-model="user.password"
                  :rules="[rules.required]"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  label="Senha"
                  required
                  outlined
                  dense
                ></v-text-field>

                <v-row justify="center">
                  <v-btn
                    :disabled="!valid || loading"
                    color="success"
                    class="loginBtn"
                    @click="login()"
                  >
                    <v-progress-circular
                      v-if="loading"
                      indeterminate
                      size="25"
                      width="3"
                      color="white">
                    </v-progress-circular>
                    <span v-else>Entrar</span>
                  </v-btn>
                </v-row>

                <div>
                  <p v-if="errorMessage" class="errors">
                    {{errorMessage}}
                  </p>
                </div>
              </v-form>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
        email: "crm@admin.com",
        password: "a1b2c3d4"
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
            // localStorage.setItem("nickname", res.data.data.nickname);
            // localStorage.setItem("image", res.data.data.image);
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
    height: 100vh;
  }

  .loginBtn {
    min-width: 50% !important;
  }

  .errors {
    margin-top: 15px;
    color: firebrick;
    text-align: center;
  }
</style>
