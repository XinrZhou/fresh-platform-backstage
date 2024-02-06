import { createRouter, createWebHashHistory } from 'vue-router';
import admin from './routes/admin';
import supplier from './routes/supplier';
import { ROLE } from "@/constant/enums";

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
      meta: {
        role: ROLE.ADMIN,
      },
      children: [
        ...admin,
        ...supplier,
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