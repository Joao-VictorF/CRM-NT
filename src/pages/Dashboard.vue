<template>
  <v-container fluid>

    <!--Stats cards for Admin-->
    <!-- <v-row justify="space-around" v-if="checkAdminPermission()"> -->
    <v-row justify="space-around">
      <v-col xl="3" md="6" sm="6" cols="12" v-for="stats in adminStatsCards" :key="stats.title">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </v-col>
    </v-row>

    <!--Stats cards for Normal Users-->
    <!-- <v-row justify="space-around" v-else>
      <v-col xl="3" md="6" sm="6" cols="12" v-for="stats in userStatsCards" :key="stats.title">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </v-col>
    </v-row> -->

    <!--Charts for Admin-->
    <!-- <v-row v-if="checkAdminPermission()"> -->
    <v-row>
      <v-col cols="12">
        <chart-card title="Clientes"
        :chart-data="adminUsersChart.data"
        :chart-options="adminUsersChart.options">
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Clientes cadastrados
          </div>
        </chart-card>
      </v-col>
    </v-row>

    <!--Charts for Normal Users-->
    <!-- <v-row v-else>
      <v-col cols="12">
        <chart-card title="Vendas totais"
          :chart-data="userTotalSalesChart.data"
          :chart-options="userTotalSalesChart.options">
        </chart-card>
      </v-col>
    </v-row> -->

  </v-container>
</template>
<script>
import { StatsCard, ChartCard } from "@/components/index";
import Chartist from 'chartist';
export default {
  components: {
    StatsCard,
    ChartCard
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      // isAdmin: false,

      // Normal user data
      userStatsCards: [
        {
          type: "info",
          icon: "ti-package",
          title: "Produtos cadastrados",
          value: "159",
          footerText: "Atualizado agora",
          footerIcon: "ti-reload"
        },
        {
          type: "warning",
          icon: "ti-shopping-cart",
          title: "Produtos com estoque baixo",
          value: "45",
          footerText: "Ontem",
          footerIcon: "ti-reload"
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "Produtos em falta",
          value: "23",
          footerText: "Ontem",
          footerIcon: "ti-reload"
        },
        {
          type: "success",
          icon: "ti-bar-chart",
          title: "Saídas totais",
          value: "R$ 15.000",
          footerText: "Último mês",
          footerIcon: "ti-reload"
        }
      ],
      userTotalSalesChart: {
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          series: [
            [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
          ]
        },
        options: {
          axisX: {
            showGrid: true
          },
          height: "245px"
        }
      },

      // Admin user data
      adminStatsCards: [
        {
          type: "info",
          icon: "ti-user",
          title: "Clientes",
          value: "105",
          footerText: "Atualizado agora",
          footerIcon: "ti-reload"
        },
        {
          type: "warning",
          icon: "ti-package",
          title: "Cotações criadas",
          value: "85",
          footerText: "Ontem",
          footerIcon: "ti-reload"
        },
        {
          type: "success",
          icon: "ti-wallet",
          title: "Cotações vendidas",
          value: "R$ 1,345",
          footerText: "Ontem",
          footerIcon: "ti-reload"
        },
        {
          type: "danger",
          icon: "ti-trash",
          title: "Clientes excluídos",
          value: "5",
          footerText: "Último mês",
          footerIcon: "ti-reload"
        },
      ],
      adminUsersChart: {
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          series: [
            [10, 30, 40, 40, 70, 80, 90, 100, 180, 280, 250, 260],
          ]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: "245px"
        }
      },
    };
  },
  // methods: {
    // checkAdminPermission() {
    //   this.isAdmin = localStorage.getItem("isAdmin");
      
    //   if(this.isAdmin) {
    //     if(this.isAdmin.localeCompare("true") == 0 ) {
    //       return true;
    //     } 
    //     return false;
    //   }
    //   return false;
    // }
  // },
};
</script>
<style>
</style>
