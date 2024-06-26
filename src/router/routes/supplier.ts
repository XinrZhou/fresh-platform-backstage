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
      component: () => import('@/pages/supplier/cdp-data/CdpManagement.vue'),
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
      component: () => import('@/pages/common/spu/SpuManagement.vue')
    },
    {
      path: 'sku',
      component: () => import('@/pages/common/sku/SkuManagement.vue')
    },
    {
      path: 'brand',
      component: () => import('@/pages/supplier/brands/BrandManagement.vue')
    },
    {
      path: 'promotion',
      component: () => import('@/pages/supplier/promotions/PromotionManagement.vue'),
      children: [
        {
          path: '',
          component: () => import('@/pages/supplier/promotions/components/PromotionPanel.vue'),
        },
        {
          path: 'activity',
          component: () => import('@/pages/supplier/promotions/components/ActivityList.vue'),
        }
      ]
    },
    {
      path: 'userCenter',
      component: () => import('@/pages/common/user-center/UserCenter.vue'),
    },
  ]
}]