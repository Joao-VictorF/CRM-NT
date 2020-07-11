<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <h1 class="text-center notFound">
          Error 404
        </h1>
        <h1 class="text-center">
          Página não encontrada!
        </h1>
      </v-col>
      <v-col lg="3" md="5" sm="8">
        <img src="@/assets/img/404package.png" alt="pacote aberto">
      </v-col>

      <v-col cols="12">
        <router-link to="/" >
          <p class="text-center">
            Login
          </p>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
  .notFound {
    font-size: 45pt;
  }
</style>
