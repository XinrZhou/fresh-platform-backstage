import { defineStore } from "pinia";
import { User } from "@/types/type";
import { ElMessage } from 'element-plus'
import { 
  getSuppliers, 
  addSupplier,
  deleteSupplier
} from "@/api/admin";


interface State {
  total: number
  supplierList: User[],
}

export const useSupplierStore = defineStore('supplier', {
  state: (): State => {
    return {
      total: 100,
      supplierList: [],
    }
  },
  actions: {
    async getSuppliers(page: number, pageSize: number) {
      const res = await getSuppliers(page, pageSize);
      this.total = res.data.data.total;
      this.supplierList = res.data.data.suppliers;
    },

    async addSupplier(user: User) {
      const res = await addSupplier(user);
      this.getSuppliers();
    },

    async deleteSuppiler(sid: string) {
      const res = await deleteSupplier(sid);
      this.getSuppliers();
    }
  }
})