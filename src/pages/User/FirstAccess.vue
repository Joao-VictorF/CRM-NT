<template>
  <v-container>
    <v-form  ref="form" v-model="valid" lazy-validation>
      <v-row justify="center">
        <v-col lg="8" md="8" sm="10">
          <h2 class="text-center">
            É o seu primeiro acesso, portanto é necessário que você altere a sua senha.
          </h2>  
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col lg="8" md="8" sm="10" cols="10">
          <v-text-field
            v-model="user.password"
            :rules="[rules.required, rules.minLength]"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            label="Senha"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>

        <v-col lg="8" md="8" sm="10" cols="10">
          <v-text-field
            v-model="user.password_confirmation"
            :rules="[rules.required, rules.compare]"
            :append-icon="showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPasswordConfirmation ? 'text' : 'password'"
            @click:append="showPasswordConfirmation = !showPasswordConfirmation"
            label="Confirme a sua senha"
            required
            outlined
            dense
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col lg="4" md="6" sm="6" cols="12" class="btnCol">
          <v-btn
            :disabled="!valid || loading"
            color="success"
            class="createBtn"
            @click="updatePassword()"
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
import NotificationError from '@/pages/Notifications/ErrorNotification';
import UpdateNotification from '@/pages/Notifications/UpdateNotification';

export default {
  data() {
    return {
      loading: false,
      showPassword: false,
      showPasswordConfirmation: false,
      valid: true,

      user: {
        password: "",
        password_confirmation: "",
        is_first_access: false,
      },
      rules: {
        required: value => !!value || 'Este campo é obrigatório.',
        minLength: value => value.length >= 8 || 'A senha deve conter no mínimo 8 caracteres.',
        compare: value => value.localeCompare(this.user.password) == 0 || 'Os campos não coincidem.'
      },
    };
  },
  methods: {
    updatePassword() {
      if(this.$refs.form.validate()) {
        this.loading = true;

        console.log(this.user);
        
        api.post('users/' + localStorage.getItem("userID") + '/update_password', {"user" : this.user},
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

            setTimeout(() => {
              window.location = "/dashboard";
            }, 2000)

          })
          .catch((err) => {
            this.notifyErrorVue('bottom', 'right');
          });
      }
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
}
</script>

<style>

  
</style>