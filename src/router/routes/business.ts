import { createRouter } from "vue-router";

export default [{
  name: 'business',
  path: 'business',
  component: () => import('@/pages/business/index.vue'),
}]