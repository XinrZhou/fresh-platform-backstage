import axios from 'axios';
import { request } from '@/api/http';
import { Category } from '@/types/type';


export function addCategory(data: Category) {
  return request({
    url: '/category/category',
    method: 'post',
    data
  })
}

export function getParentCategories() {
  return request({
    url: `/category/categories/1`,
    method: 'get',
  })
}

export function getCategories() {
  return request({
    url: '/category/categories',
    method: 'get',
  })
}

export function uploadImage(data: FormData) {
  return request({
    url: '/oss/upload',
    method: 'post',
    data
  })
}

export function deleteCategory(cid: string) {
  return request({
    url: `/category/category/${cid}`,
    method: 'delete',
  })
}

