export interface User {
  id?: string
  name?: string
  number?: string
  password?: string
  suppiler?: string
  consumer?: string
  avatar?: string
  insertTime?: string
  selectTime?: string
};

export interface Category {
  id?: string,
  name?: string
  parentId?: string
  level?: number
  status?: number
  insertTime?: string
  selectTime?: string
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
  selectTime?: string
};

export interface Attribute {
  id?: string
  categoryId?: string
  name?: string
  isNumeric?: number
  unit?: string
  isGeneric?: number
  insertTime?: string
  selectTime?: string
};

