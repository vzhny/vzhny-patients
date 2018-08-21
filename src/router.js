import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

import Landing from './views/Landing.vue';
import Dashboard from './views/Dashboard.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';

Vue.use(Router);

// TODO - any routes that add/edit patients need meta = requiresAuth
// TODO - fix login and register routes to redirect to the dashboard if the user is currently logged in
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing,
      meta: {
        requiresAuth: false,
        isCurrentlyLoggedIn: false,
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
        isCurrentlyLoggedIn: true,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        isCurrentlyLoggedIn: true,
      },
    },
  ],
  linkActiveClass: 'is-active',
});

router.beforeEach((to, from, next) => {
  const userLoggedIn = store.getters.checkIfLoggedIn;
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    if (userLoggedIn) {
      next();
    } else {
      next({ name: 'Login' });
    }
  } else if (to.matched.some(rec => rec.meta.isCurrentlyLoggedIn)) {
    if (userLoggedIn) {
      next({ name: 'Dashboard' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
