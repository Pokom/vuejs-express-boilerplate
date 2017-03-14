// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('bootstrap');
import Vue from 'vue';
import App from './components/app/App.vue';
import router from './router';
import store from './store';
import VueResource from 'vue-resource';
import VuePaginate from 'vue-paginate';
import './assets/styles/app.scss';

/* eslint-disable no-new */
Vue.use(VueResource);
Vue.use(VuePaginate);

import Auth from './auth';
Vue.use(Auth);

new Vue({
  el: '#app',
  created: function () {
    window.Vue = this;
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app');
