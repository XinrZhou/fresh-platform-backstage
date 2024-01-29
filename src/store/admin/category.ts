import { defineStore } from "pinia";
import { Category } from "@/types/type";
import { addCategpry } from "@/api/admin";

export const categoryStore = defineStore('category', {
  actions: {
    async addCategory(category: Category) {
      const res = await addCategpry(category);

      console.log('res===', res);
    }
  }
})