import { defineStore } from "pinia";
import { Model } from "@/types/type";
import { getModels, addModel } from "@/api/admin";
import _ from 'lodash';

interface State {
  modelList: Model[],
  latestModel: Model,
  total: number,
}

export const useModelStore = defineStore('model', {
  state: (): State => {
    return {
      modelList: [],
      latestModel: {},
      total: 1,
    }
  },
  actions: {
    async getModels(page: number, pageSize: number, type: number) {
      const res = await getModels(page, pageSize, type);
      const models = res.data.data.models;
      this.modelList = models;
      this.latestModel = _.find(models, m => m.status === 1);
      this.total = res.data.data.total;
    },

    async addModel(model: Model) {
      const modelParams = {
        version: model.version,
        type: model.type,
        params: JSON.stringify(
          {
            ..._.omit(model, ['version', 'type'])
          }
        )
      }
      const res = await addModel(modelParams);
    },
  }
})