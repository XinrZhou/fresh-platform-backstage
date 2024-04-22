import { defineStore } from "pinia";
import { Order } from "@/types/type";
import _ from 'lodash';
import { formatOrderPrams } from "@/utils";
import { 
  getOrderList,
  addOrder
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
    // 获取订单信息
    async getOrders() {
      const res = await getOrderList();
      this.orderList = formatOrderPrams(res.data.data.orders);
    },
  }
})