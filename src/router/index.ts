import { createRouter, createWebHashHistory } from 'vue-router';
import admin from './routes/admin';
import business from './routes/business';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@/pages/Login.vue'),
    },
    {
      path: '/',
      component: () => import('@/pages/index.vue'),
      children: [
        ...admin,
        ...business,
      ]
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/login',
  }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.role) {
    next();
    return;
  };

  if (to.meta.role === sessionStorage.getItem('ROLE')) {
    next();
    return;
  } else {
    sessionStorage.clear();
    router.push('/login');
  };
})

export default router;