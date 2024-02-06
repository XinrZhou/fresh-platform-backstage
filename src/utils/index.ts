import _ from 'lodash';

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

