import { defineStore } from "pinia";
import { User } from "@/types/type";
import { ElMessage } from 'element-plus'
import { 
  getSuppliers, 
  addSupplier,
  deleteSupplier
} from "@/api/admin";


interface State {
  supplierList: User[],
}

export const useSupplierStore = defineStore('supplier', {
  state: (): State => {
    return {
      async getSuppliers() {
        const res = await getSuppliers();
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
  },
  actions: {
  }
})