import { defineStore } from "pinia";
import { Resource, ResourceUsage } from "@/types/type";
import { 
  getResourceUsage,
  addResource, 
  getResources,
  deleteResource 
} from "@/api/admin";

interface State {
  total: number;
  loading: boolean;
  resourceList: Resource[],
  usageList: ResourceUsage[],
}

export const useResoureStore = defineStore('resource', {
  state: (): State => {
    return {
      total: 1,
      loading: false,
      resourceList: [],
      usageList: []
    }
  },
  actions: {
    async getResourceUsage() {
      const res = await getResourceUsage();
      this.usageList = res.data.data.cdps;
    },

    async addResource(resourceData: Resource) {
      const res = await addResource(resourceData);
    },

    async getResources(page: number, pageSize: number, type: number) {
      this.loading = true;
      const res = await getResources(page, pageSize, type);
      this.resourceList = res.data.data.resources;
      this.total = res.data.data.total;
      this.loading = false;
    },

    async deleteResource(rid: string) {
      const res = await deleteResource(rid);
    }
  }
})