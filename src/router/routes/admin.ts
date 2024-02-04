import { createRouter } from "vue-router";
import { ROLE } from "@/constant/enums";

export default [{
  path: 'admin',
  component: () => import('@/pages/admin/index.vue'),
  meta: {
    role: ROLE.ADMIN,
  },
  children: [
    {
      path: '',
      component: () => import('@/pages/admin/cdp-data/index.vue'),
    },
    {
      path: 'material',
      component: () => import('@/pages/admin/materials/index.vue'),
    },
    {
      path: 'content',
      component: () => import('@/pages/admin/content/index.vue'),
    },
    {
      path: 'supplier',
      component: () => import('@/pages/admin/suppliers/index.vue'),
    },
    {
      path: 'category',
      component: () => import('@/pages/admin/categories/index.vue'),
    },
    {
      path: 'rdc',
      component: () => import('@/pages/admin/rdcs/index.vue'),
    },
    {
      path: 'product',
      component: () => import('@/pages/admin/products/index.vue'),
    },
    {
      path: 'marketing',
      component: () => import('@/pages/admin/marketing/index.vue'),
    },
    {
      path: 'model',
      component: () => import('@/pages/admin/ai-models/index.vue'),
    },
    {
      path: 'resource',
      component: () => import('@/pages/admin/resources/index.vue'),
    },
  ]
}]