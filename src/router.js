import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

import Landing from './views/Landing.vue';
import Dashboard from './views/Dashboard.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresAuth: false,
      },
    },
  ],
  linkActiveClass: 'link-is-active',
});

router.beforeEach((to, from, next) => {
  const userLoggedIn = store.getters.checkIfLoggedIn;

  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    if (userLoggedIn) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
