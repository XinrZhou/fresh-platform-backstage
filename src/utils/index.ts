import _, { update } from 'lodash';

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
