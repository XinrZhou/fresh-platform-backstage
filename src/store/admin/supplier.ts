import { defineStore } from "pinia";
import { User } from "@/types/type";
import { ElMessage } from 'element-plus'
import { getSuppliers } from "@/api/admin";


interface State {
  supplierList: User[],
}

export const useSupplierStore = defineStore('supplier', {
  state: (): State => {
    return {
      async getSuppliers() {
        const res = await getSuppliers();
        console.log('res===', res)
        this.supplierList = res.data.data.supplierList;
      },
    }
  },
  actions: {
  }
})