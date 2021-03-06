import Vue from 'vue'
import Vuelidate from "vuelidate/src";
import App from './App.vue'
import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import localize from '@/filters/localize.filter'
import router from './router'
import store from './store'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from "@/utils/title.plugin"
import Loader from "@/components/app/Loader";
import tooltipDirective from "@/directives/tooltip.directive"
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.use(VueMeta)
Vue.use(titlePlugin)

Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localize)

Vue.directive('tooltip', tooltipDirective)

const config = {
  apiKey: "AIzaSyCW1aQwVLf_Qpp5JNkrjB0g9Sht0eq2o10",
  authDomain: "vue-crm-a0310.firebaseapp.com",
  databaseURL: "https://vue-crm-a0310.firebaseio.com",
  projectId: "vue-crm-a0310",
  storageBucket: "vue-crm-a0310.appspot.com",
  messagingSenderId: "945892946509",
  appId: "1:945892946509:web:bf68dd423d05d42a6d2204",
  measurementId: "G-54X4X1ND3N"
};

firebase.initializeApp(config)

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
