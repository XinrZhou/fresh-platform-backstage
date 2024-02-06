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
      component: () => import('@/pages/admin/cdp-data/CdpManagement.vue'),
    },
    {
      path: 'material',
      component: () => import('@/pages/admin/materials/MaterialManagement.vue'),
    },
    {
      path: 'content',
      component: () => import('@/pages/admin/content/ContentManagement.vue'),
    },
    {
      path: 'supplier',
      component: () => import('@/pages/admin/suppliers/SupplierManagement.vue'),
    },
    {
      path: 'category',
      component: () => import('@/pages/admin/categories/CategoryManagement.vue'),
    },
    {
      path: 'rdc',
      component: () => import('@/pages/admin/rdcs/RdcManagement.vue'),
    },
    {
      path: 'product',
      component: () => import('@/pages/admin/products/ProductManagement.vue'),
    },
    {
      path: 'marketing',
      component: () => import('@/pages/admin/marketing/MarketingManagement.vue'),
    },
    {
      path: 'model',
      component: () => import('@/pages/admin/ai-models/ModelManagement.vue'),
    },
    {
      path: 'resource',
      component: () => import('@/pages/admin/resources/ResourceManagement.vue'),
    },
  ]
}]