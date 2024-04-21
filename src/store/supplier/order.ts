import { defineStore } from "pinia";
import { Order } from "@/types/type";
import { 
  getOrderList
} from "@/api/supplier";

interface State {
  orderList: Order[];
}

export const useOrderStore = defineStore('order', {
  state: (): State => {
    return {
      orderList: [],
    }
  },
  actions: {
    // 添加品牌
    getOrders() {
      const res = getOrderList();
      console.log('res====', res)
    }
  }
})