import { createRouter } from "vue-router";
import { ROLE } from "@/constant/enums";

export default [{
  name: 'business',
  path: 'business',
  component: () => import('@/pages/business/index.vue'),
  meta: {
    role: ROLE.ADMIN,
  },
}]