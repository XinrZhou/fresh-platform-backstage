import { defineStore } from "pinia";
import router from '@/router';
import { User } from '@/types/type';
import { ROLE } from "@/constant/enums";
import { login, getUserInfo } from "@/api/user";

interface State {
  userInfo: User;
}

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      userInfo: {},
    }
  },
  actions: {
    async goLogin(user: User) {
      const res = await login(user);

      sessionStorage.setItem('TOKEN', res.headers.token);
      sessionStorage.setItem('ROLE', res.headers.role);
      if (res.headers.role === ROLE.ADMIN) {
        router.push('/admin');
      } else {
        router.push('/business');
      }
    },

    goLogout() {
      sessionStorage.clear();
      router.push('/login');
    },

    async getUserInfo() {
      const res = await getUserInfo();
      this.userInfo = res.data.data.user;
    }
  }
})