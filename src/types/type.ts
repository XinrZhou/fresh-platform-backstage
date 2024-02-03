export interface User {
  id?: string
  userName?: string
  password?: string
  status?: number
  avatar?: string
  phoneNumber?: string
  insertTime?: string
  selectTime?: string
};

export interface Category {
  id?: string,
  categoryName?: string,
  parentId?: string,
  isParent?: number,
  insertTime?: string
  selectTime?: string
};

