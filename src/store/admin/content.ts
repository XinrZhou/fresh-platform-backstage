import { defineStore } from "pinia";
import { Content } from "@/types/type";
import { ElMessage } from 'element-plus';
import { addPageSettings } from "@/api/admin";

interface State {
}

export const useContentStore = defineStore('content', {
  state: (): State => {
    return {
    }
  },
  actions: {
    async addPageSettings(name, commonSettings, bannerImages, recommendImages) {
      const settings = {
        ...commonSettings,
        bannerImages: bannerImages.map(item => item.url),
        recommendImages: recommendImages.map(item => item.url)
      }
      const res = await addPageSettings({
        name,
        settings: JSON.stringify(settings)
      })
    },
  }
})