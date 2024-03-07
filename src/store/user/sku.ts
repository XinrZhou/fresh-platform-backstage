import { defineStore } from "pinia";
import { Sku } from "@/types/type";
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
    async addSku(sku, genericSpecObj, specialSpecList) {
      const specialSpecObj = {};
      specialSpecList.forEach(item => {
        specialSpecObj[item.name] = item.value.split(',');
      })
      const skuData = {
        ...sku,
        genericSpec: JSON.stringify(genericSpecObj),
        specialSpec: JSON.stringify(specialSpecObj),
      }
      const res = await addSku(skuData);
    },
    // 获取Sku列表
    async getSkuList(page: number, pageSize: number) {
      const res = await getSkuList(page, pageSize);
      this.skuList = res.data.data.skus;
      this.total = this.skuList.length;
    },
    // 删除Sku
    async deleteSku(sid: string) {
      const res = await deleteSku(sid);
    }
  }
})