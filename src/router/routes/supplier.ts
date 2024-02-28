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
      component: () => import('@/pages/common/materials/index.vue'),
      children: [
        {
          path: '',
          component: () => import('@/pages/common/materials/MaterialManagement.vue'),
        },
        {
          path: 'painting',
          component: () => import('@/pages/common/materials/AiPainting.vue'),
        },
        {
          path: 'writing',
          component: () => import('@/pages/common/materials/AiWriting.vue'),
        }
      ]
    },
    {
      path: 'order',
      component: () => import('@/pages/supplier/orders/OrderManagement.vue'),
    },
    {
      path: 'spu',
      component: () => import('@/pages/supplier/spu/SpuManagement.vue')
    },
    {
      path: 'sku',
      component: () => import('@/pages/supplier/sku/SkuManagement.vue')
    },
    {
      path: 'brand',
      component: () => import('@/pages/supplier/brands/BrandManagement.vue')
    },
    {
      path: 'promotion',
      component: () => import('@/pages/supplier/promotions/PromotionManagement.vue'),
    }
  ]
}]