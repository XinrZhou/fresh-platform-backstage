import { defineStore } from "pinia";
import { Page } from "@/types/type";
import { ElMessage } from 'element-plus';
import { addPageSettings, getPage } from "@/api/admin";

interface State {
  pageId: string;
  pageSettings: Page;
}

export const useContentStore = defineStore('content', {
  state: (): State => {
    return {
      pageId: '',
      pageSettings: {}
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
        id: this.pageId,
        name,
        settings: JSON.stringify(settings)
      })
    },

    async getPage(pageName: string) {
      const res = await getPage(pageName);
      const { id, name, settings } = res.data.data.pages;
      this.pageId = id;
      this.pageSettings = JSON.parse(settings);
    }
  }
})