import { createRouter } from "vue-router";

export default [{
  name: 'admin',
  path: 'admin',
  component: () => import('@/pages/admin/index.vue'),
  children: [
    {
      name: 'cdpManage',
      path: '',
      component: () => import('@/pages/admin/cdp-manage/index.vue'),
    },
    {
      name: 'material',
      path: 'material',
      component: () => import('@/pages/admin/material-manage/index.vue'),
    },
    {
      name: 'contentManage',
      path: 'content',
      component: () => import('@/pages/admin/content-manage/index.vue'),
    },
    {
      name: 'supplierManage',
      path: 'supplier',
      component: () => import('@/pages/admin/supplier-manage/index.vue'),
    },
    {
      name: 'categoryManage',
      path: 'category',
      component: () => import('@/pages/admin/category-manage/index.vue'),
    },
    {
      name: 'commodityManage',
      path: 'commodity',
      component: () => import('@/pages/admin/commodity-manage/index.vue'),
    },
    {
      name: 'marketingManage',
      path: 'marketing',
      component: () => import('@/pages/admin/marketing-manage/index.vue'),
    },
    {
      name: 'modelManage',
      path: 'model',
      component: () => import('@/pages/admin/model-manage/index.vue'),
    },
    {
      name: 'resourceManage',
      path: 'resource',
      component: () => import('@/pages/admin/resource-manage/index.vue'),
    },
  ]
}]