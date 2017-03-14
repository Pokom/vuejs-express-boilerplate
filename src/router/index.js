import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    // Each of these routes are loaded asynchronously, when a user first navigates to each corresponding endpoint.
    // The route will load once into memory, the first time it's called, and no more on future calls.
    // This behavior can be observed on the network tab of your browser dev tools.
    {
      path: '/login',
      name: 'login',
      component: function (resolve) {
        require(['../components/login/Login.vue'], resolve);
      }
    },
    {
      path: '/register',
      name: 'register',
      component: function (resolve) {
        require(['../components/register/Register.vue'], resolve);
      }
    },
    {
      path: '/',
      name: 'dashboard',
      component: function (resolve) {
        require(['../components/dashboard/Dashboard.vue'], resolve);
      },
      beforeEnter: guardRoute
    }
  ]
});

function guardRoute (to, from, next) {
  // work-around to get to the Vuex store (as of Vue 2.0)
  const auth = router.app.$options.store.state.auth;

  if (!auth.isLoggedIn) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

export default router;
