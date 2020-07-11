import Vue from "vue";
import App from "./App";
import router from "./router/index";
import vuetify from '@/plugins/vuetify' // path to vuetify export

import PaperDashboard from "./plugins/paperDashboard";
import VCurrencyField from 'v-currency-field';

import "vue-notifyjs/themes/default.css";

Vue.use(PaperDashboard);

Vue.use(VCurrencyField, { 
	locale: 'pt-BR',
	decimalLength: 2,
	autoDecimalMode: true,
	min: null,
	max: null,
	defaultValue: 0,
  valueAsInteger: false,
  allowNegative: false
});

/* eslint-disable no-new */
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
