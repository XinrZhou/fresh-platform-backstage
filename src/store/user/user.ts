import { defineStore } from "pinia";
import router from '@/router';
import { User } from '@/types/type';
import { goLogin } from "@/api/user";

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {} as User,
    }
  },
  actions: {
    async goLogin(user: User) {
      const res = await goLogin(user);
      // console.log('use====', user)

      // console.log("登录=====》", res)
    }
  }
})