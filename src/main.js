import Vue from 'vue';
import Vuelidate from 'vuelidate';
import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import App from './App.vue';
import router from './router';
import store from './store';
import tooltipDirective from '@/directives/tooltip.directive';
import messagePlugin from '@/utils/message.plugin';
import Loader from '@/components/app/Loader'
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)

firebase.initializeApp({
  apiKey: "AIzaSyDwTvg1DEI2EyRRiRaziuMImlu0PrVu63Y",
  authDomain: "home-wallet-e996a.firebaseapp.com",
  databaseURL: "https://home-wallet-e996a.firebaseio.com",
  projectId: "home-wallet-e996a",
  storageBucket: "home-wallet-e996a.appspot.com",
  messagingSenderId: "814262960734",
  appId: "1:814262960734:web:a14d9f3f795ae169c92acf",
  measurementId: "G-FFR6MLF4Y8"
})

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


