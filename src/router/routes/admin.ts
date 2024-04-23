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
      path: 'attribute',
      component: () => import('@/pages/admin/attributes/AttributeManagement.vue'),
    },
    {
      path: 'brand',
      component: () => import('@/pages/admin/brands/index.vue'),
      children: [
        {
          path: '',
          component: () => import('@/pages/admin/brands/BrandManagement.vue'),
        },
        {
          path: 'list',
          component: () => import('@/pages/admin/brands/BrandApprovalList.vue'),
        }
      ]
    },
    {
      path: 'spu',
      component: () => import('@/pages/common/spu/SpuManagement.vue'),
    },
    {
      path: 'sku',
      component: () => import('@/pages/common/sku/SkuManagement.vue'),
    },
    {
      path: 'rdc',
      component: () => import('@/pages/admin/rdcs/RdcManagement.vue'),
      children: [
        {
          path: '',
          component: () => import('@/pages/admin/rdcs/components/RdcList.vue'),
        },
        {
          path: 'detail',
          component: () => import('@/pages/admin/rdcs/components/ProductPoolDetail.vue'),
        }
      ]
    },
    {
      path: 'marketing',
      component: () => import('@/pages/admin/marketing/MarketingManagement.vue'),
      children: [
        {
          path: '',
          component: () => import('@/pages/admin/marketing/components/MarketingPanel.vue'),
        },
        {
          path: 'activity',
          component: () => import('@/pages/admin/marketing/components/ActivityList.vue'),
        }
      ]
    },
    {
      path: 'model',
      component: () => import('@/pages/admin/ai-models/ModelManagement.vue'),
    },
    {
      path: 'resource',
      component: () => import('@/pages/admin/resources/ResourceManagement.vue'),
    },
    {
      path: 'userCenter',
      component: () => import('@/pages/common/user-center/UserCenter.vue'),
    },
  ]
}]