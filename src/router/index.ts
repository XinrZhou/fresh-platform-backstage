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
    }
  ]
})

export default router;