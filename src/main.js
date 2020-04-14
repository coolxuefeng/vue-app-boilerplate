import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import api from './api';

Vue.config.productionTip = false;

Vue.use(api);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
