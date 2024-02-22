import { defineStore } from "pinia";
import { Sku } from "@/types/type";
import { ElMessage } from 'element-plus';
import { addSku, getSkuList, deleteSku } from "@/api/admin";

interface State {
  skuList: object[],
}

export const useSkuStore = defineStore('sku', {
  state: (): State => {
    return {
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
      this.getSkuList();
    },
    // 获取Sku列表
    async getSkuList() {
      const res = await getSkuList();
      this.skuList = res.data.data.skus;
    },
    // 删除Sku
    async deleteSku(sid: string) {
      const res = await deleteSku(sid);
      this.getSkuList();
    }
  }
})