import { createRouter, createWebHashHistory } from 'vue-router';

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
      component: () => import('@/pages/Main.vue'),
      children: [
        {
          name: 'admin',
          path: '/admin',
          component: () => import('@/pages/admin/Admin.vue'),
        },
        {
          name: 'business',
          path: '/business',
          component: () => import('@/pages/business/Business.vue'),
        }
      ]
    }
  ]
})

export default router;