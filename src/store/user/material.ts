import { defineStore } from "pinia";
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { 
  generateImages, 
  collectImage, 
  getImages,
  deletImage,
  getChatText, 
} from "@/api/user";
import { TextToImage, Image } from "@/types/type";

interface State {
  imageBase64: string,
  loading: boolean,
  imageList: Image[],
  total: number
}

export const useMaterialStore = defineStore('material', {
  state: (): State => {
    return {
      imageBase64: '',
      loading: false,
      imageList: [],
      total: 1,
    }
  },
  actions: {
    // 生成图片
    async generateImages(data: TextToImage) {
      this.loading = true;
      const params = {
        ...data,
        styles: [data.styles],
        resultConfig: {
          resolution: data.resultConfig
        },
        logoAdd: 0
      }
      try {
        const res = await generateImages(params);
        this.loading = false;
        this.imageBase64 = res.data.data.images.resultImage;
      } catch (error) {
        this.loading = false;
      }
    },

    // 收藏图片
    async collectImage(data: Image) {
      const res = await collectImage(data);
    },

    // 已收藏图片列表
    async getImages(page: number, pageSize: number) {
      const res = await getImages(page, pageSize);
      this.imageList = res.data.data.images;
      this.total = res.data.data.total;
    },

    // 删除图片
    async deleteImage(id: string) {
      const res = await deleteImage(id);
    },

    getChatText() {
      fetchEventSource('/api/ai/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Token': sessionStorage.getItem('TOKEN')
        },
        body: JSON.stringify({"question": "java是什么?"}),
        onerror() {
          this.openWhenHidden = true;
        },
        onmessage(event) {
          // 接收数据
          console.log(event);
        },
        onclose(){
          // 数据传输完毕后就会关闭流
        }
      })
    }
  }
})