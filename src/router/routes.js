import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// General Views
import NotFound from "@/pages/NotFoundPage.vue";
import Login from "@/pages/Login.vue";
import Dashboard from "@/pages/Dashboard.vue";

// Admin Pages
import ClientesList from "@/pages/Admin/ClientesList.vue";
import NewClient from "@/pages/Admin/NewCliente.vue";
import CotacoesList from "@/pages/Admin/CotacoesList.vue";
import NewCotacao from "@/pages/Admin/NewCotacao.vue";
import PaymentMethodsList from "@/pages/Admin/PaymentMethodsList.vue";
import NewPaymentMethod from "@/pages/Admin/NewPaymentMethod.vue";
import ProductsList from "@/pages/User/ProductsList.vue";
import NewProduct from "@/pages/User/NewProduct.vue";
import ImportProducts from "@/pages/User/ImportProducts.vue";


// User Pages
// import EmailConfirmation from "@/pages/User/EmailConfirmation.vue";
// import FirstAccess from "@/pages/User/FirstAccess.vue";
// import UserProfile from "@/pages/User/UserProfile.vue";


const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/login",
    children: [
      // General Routes
      {
        path: "login",
        name: "login",
        component: Login
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      // ****************

      // Admin Routes
      {
        path: "clients-list",
        name: "Clientes",
        component: ClientesList
      },
      {
        path: "new-client",
        name: "Novo cliente",
        component: NewClient
      },
      {
        path: "products",
        name: "Produtos",
        component: ProductsList
      },
      {
        path: "new-product",
        name: "Novo produto",
        component: NewProduct
      },
      {
        path: "edit-product/:id",
        name: "Editar produto",
        component: NewProduct
      },
      {
        path: "import-products",
        name: "Importar produtos",
        component: ImportProducts
      },
      {
        path: "client-details/:id",
        name: "Dados do cliente",
        component: NewClient
      },
      {
        path: "cotacoes-list",
        name: "Cotações",
        component: CotacoesList
      },
      {
        path: "new-cotacao",
        name: "Nova cotação",
        component: NewCotacao
      },
      {
        path: "payment-methods-list",
        name: "Formas de pagamento",
        component: PaymentMethodsList
      },
      {
        path: "new-payment-method",
        name: "Nova forma de pagamento",
        component: NewPaymentMethod
      },
      {
        path: "edit-payment-method/:id",
        name: "Editar forma de pagamento",
        component: NewPaymentMethod
      },
      // ****************
      
      // User Routes
      // {
      //   path: "first-access",
      //   name: "Confirmação de email",
      //   component: EmailConfirmation
      // },
      // {
      //   path: "change-default-password",
      //   name: "Primeiro acesso",
      //   component: FirstAccess
      // },
      // {
      //   path: "account",
      //   name: "Conta",
      //   component: UserProfile
      // },
      // ****************
    ]
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
