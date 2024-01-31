import { defineStore } from "pinia";
import router from '@/router';
import { User } from '@/types/type';
import { ROLE } from "@/types/Const";
import { reqLogin } from "@/api/user";

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {} as User,
    }
  },
  actions: {
    async goLogin(user: User) {
      const res = await reqLogin(user);

      sessionStorage.setItem('TOKEN', res.headers.token);
      sessionStorage.setItem('ROLE', res.headers.role);
      if (res.headers.role === ROLE.ADMIN) {
        router.push('/admin');
      } else {
        router.push('/business');
      }
    }
  }
})