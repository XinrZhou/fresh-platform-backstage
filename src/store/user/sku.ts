import { defineStore } from "pinia";
import { Sku } from "@/types/type";
import _ from "lodash";
import { ElMessage } from 'element-plus';
import { addSku, getSkuList, deleteSku } from "@/api/user";

interface State {
  total: number,
  skuList: object[],
}

export const useSkuStore = defineStore('sku', {
  state: (): State => {
    return {
      total: 1,
      skuList: [],
    }
  },
  actions: {
    // 添加Sku
    async addSku(sku: Sku) {
      const res = await addSku({
        ..._.omit(sku, ['categoryId']),
      });
    },
    // 获取Sku列表
    async getSkuList(page: number, pageSize: number, spuId: string) {
      const res = await getSkuList(page, pageSize, spuId);
      this.skuList = res.data.data.skus;
      this.total = this.skuList.length;
    },
    // 删除Sku
    async deleteSku(sid: string) {
      const res = await deleteSku(sid);
    }
  }
})