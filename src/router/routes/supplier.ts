import { createRouter } from "vue-router";
import { ROLE } from "@/constant/enums";

export default [{
  path: 'supplier',
  component: () => import('@/pages/supplier/index.vue'),
  meta: {
    role: ROLE.SUPPILER,
  },
  children: [
    {
      path: '',
      component: () => import('@/pages/supplier/data/DataManagement.vue'),
    },
    {
      path: 'comment',
      component: () => import('@/pages/supplier/comments/CommentsManagement.vue'),
    },
    {
      path: 'material',
      component: () => import('@/pages/supplier/materials/MaterialManagement.vue'),
    },
    {
      path: 'order',
      component: () => import('@/pages/supplier/orders/OrderManagement.vue'),
    },
    {
      path: 'product',
      component: () => import('@/pages/supplier/products/ProductManagement.vue'),
    },
    {
      path: 'promotion',
      component: () => import('@/pages/supplier/promotions/PromotionManagement.vue'),
    }
  ]
}]