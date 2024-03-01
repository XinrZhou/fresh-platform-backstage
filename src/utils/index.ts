import _, { update } from 'lodash';
import moment from 'moment';

/**
 * 省市区数据格式转换
 * @param originalObject 
 * @returns 
 */
export const transformAddressFormat = (originalObject) => {
  const { address, detail, name, ...rest } = originalObject;
  const [province, city, district] = address;

  const transformedObject = {
    province,
    city,
    district,
    detail,
    name,
    ...rest,
  };

  return transformedObject;
};

/**
 * 将数组转为标准Select Options数据
 * @param originalArray 
 * @returns 
 */
export const transformToOptionsFormat = (originalArray) => {
  return originalArray.map(item => {
    return { label: item.name, value: item.id }
  });
};

/**
 * 供应商数据格式转换
 * @param userObject 
 * @returns 
 */
export const formatSupplierData = (userObject) =>  {
  const baseProps = _.pick(userObject, ['name', 'number', 'id']);
  const supplierProps = _.mapValues(_.pick(userObject, ['rdcId', 'shopStatus']), _.toString);
  return _.merge(baseProps, {supplier: JSON.stringify(supplierProps)});
}

/**
 * 类目树扁平化
 * @param categories 
 * @returns 
 */
export const flatMapCategories = (categories) => {
  return _.flatMapDeep(categories, category => {
    const transformedCategory = {
      ...category,  
    };

    const children = category.children ? flatMapCategories(category.children) : [];
    return [transformedCategory, ...children];
  });
}

/**
 * 类目树添加祖先节点
 * @param categories 
 * @returns 
 */
export const formatToAddRoot = (categories) => {
  return [
    {
      id: '0',
      level: 0,
      name: '全部',
      children: categories
    }
  ]
}

/**
 * 属性值json string -> array
 * @param attributes 
 * @returns 
 */
export const parseAttributeValues = (attributes) => {
  return attributes.map(item => {
    return {
      ...item,
      value: item.value && JSON.parse(item.value) || null
    }
  })
}

/**
 * 状态映射
 * @param status 
 * @returns 
 */
export const mapStatus = (status: number) => {
  const statusMap = [
    {
      value: 0,
      type: 'danger',
      name: '  否  '
    },
    {
      value: 1,
      type: 'success',
      name: '  是  '
    }
  ]
  return _.find(statusMap, ['value', status]) || {};
}

export const mapApprovalStatus = (status: number) => {
  const approvalStatusMap = [
    {
      label: '审核中',
      value: 0,
      renderType: 'primary',
    },
    {
      label: '审核通过',
      value: 1,
      renderType: 'success',
    },
    {
      label: '审核驳回',
      value: 2,
      renderType: 'error',
    }
  ]
  return _.find(approvalStatusMap, ['value', status]) || {};
}

/**
 * 时间戳格式转换
 * @param time 
 * @returns 
 */
export const formatTime = (time: string) => {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * base64转file
 * @param base64 
 * @param fileName 
 */
export const base64ToFile = (base64Str: string, fileName) => {
  const bstr = atob(base64Str);
  const type = 'image/jpeg';
  let len = bstr.length;
  const u8arr = new Uint8Array(len);
  while (len--) {
      u8arr[len] = bstr.charCodeAt(len);
  }
  const blob = new Blob([u8arr], { type });
  const newFile = blobToFile(blob, fileName);
  const lastModified = new Date().getTime()
  return new File([newFile], fileName, {lastModified: lastModified, type});
} 

const blobToFile = (theBlob: Blob, fileName: string) => {
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
}

/**
 * 获取接口调用成功/失败数量
 * @param dataList 
 */
export const getInterfaceCount = (dataList) => {
  const AI_TYPE = {
    CHAT: "/ai/chat",
    IMAGE: '/ai/image'
  };

  let chatCount = 0;
  let imageCount = 0;
  dataList.forEach(item => {
    if (item.path === AI_TYPE.CHAT) {
      chatCount += 1;
    } else {
      imageCount += 1;
    }
  });
  return { chatCount, imageCount };
};

