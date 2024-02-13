import { defineStore } from "pinia";
import { Attribute, AttributeParam } from "@/types/type";
import { ElMessage } from 'element-plus';
import { 
  addAttribute,
  getAttributeList, 
  deleteAttribute,
} from "@/api/admin";

interface State {
  attributeList: Attribute[],
}

export const useAttributeStore = defineStore('attribute', {
  state: (): State => {
    return {
      attributeList: [],
    }
  },
  actions: {
    // 添加属性
    async addAttribute(attribute: Attribute) {
      const len = attribute.categoryId.length;
      const attributeData = {
        id: attribute.id,
        name: attribute.name,
        isNumeric: attribute.isNumeric,
        unit: attribute.unit,
        isGeneric: attribute.isGeneric,
        categoryId: attribute.categoryId[len - 1]
      }
      const res = await addAttribute(attributeData);
      this.getAttributeList();
    },
    // 获取属性列表
    async getAttributes() {
      const res = await getAttributeList();
      this.attributeList = res.data.data.attributes;
    },
    // 删除属性
    async deleteAttribute(aid: string) {
      const res = await deleteAttribute(aid);
      this.getAttributes();
    }
  }
})