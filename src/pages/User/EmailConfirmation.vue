<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col lg="8" md="8" sm="10">
        <h1 class="text-center">
          E-mail confirmado com sucesso!
        </h1>  
      </v-col>

      <v-col lg="8" md="8" sm="10">
        <h2 class="text-center">
          Para começar a utilizar nosso sistema, basta fazer o Login utilizando 
          o seu email e os 6 primeiros dígitos do seu CPNJ sem contar com os pontos!
        </h2>  
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col lg="2" md="4" sm="6">
        <router-link to="/login">
          <v-btn color="success" block>
            Login
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>