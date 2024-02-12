import { defineStore } from "pinia";
import { Attribute, AttributeParam } from "@/types/type";
import { ElMessage } from 'element-plus';
import { 
  addAttribute,
  getAttributeList, 
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
    async getAttributeList() {
      const res = await getAttributeList();
      this.attributeList = res.data.data.attributes;
    }
  }
})