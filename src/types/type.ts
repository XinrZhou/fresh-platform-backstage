export interface User {
  id?: string
  name?: string
  number?: string
  password?: string
  suppiler?: string
  consumer?: string
  avatar?: string
  insertTime?: string
  updateTime?: string
};

export interface Category {
  id?: string,
  name?: string
  parentId?: string
  level?: number
  status?: number
  insertTime?: string
  updateTime?: string
};

export interface Rdc {
  id?: string
  name?: string
  province?: string
  city?: string
  district?: string
  address?: string[]
  detail?: string
  insertTime?: string
  updateTime?: string
};

export interface Attribute {
  id?: string
  categoryId?: string
  name?: string
  isNumeric?: number
  unit?: string
  isGeneric?: number
  value?: string
  insertTime?: string
  updateTime?: string
};

export interface Brand {
  id?: string
  name?: string
  categoryId?: string
  imageUrl?: string
  insertTime?: string
  updateTime?: string
};

export interface Spu {
  id?: string
  name?: string
  title?: string
  categoryId?: string
  brandId?: string
  imageUrl?: string
  saleStatus?: number
  description?: string
  insertTime?: string
  updateTime?: string
};

export interface Sku {
  id?: string
  name?: string
  spuId?: string
  imageUrl?: string
  stock?: number
  originPrice?: number
  discountPrice?: number
  enable?: number
  genericSpec?: string
  specialSpec?: string
  insertTime?: string
  updateTime?: string
};

