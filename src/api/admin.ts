import axios from 'axios';
import { request } from '@/api/http';
import { Category, Rdc } from '@/types/type';

// 类目管理
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

// 供应商管理
export function getSuppliers() {
  return request({
    url: '/admin/suppliers',
    method: 'get',
  })
}

export function addSupplier(data: User) {
  return request({
    url: '/admin/suppliers',
    method: 'post',
    data
  })
}

export function deleteSupplier(sid: string) {
  return request({
    url: `/admin/suppliers/${sid}`,
    method: 'delete',
  })
}

// RDC管理
export function addRdc(data: Rdc) {
  return request({
    url: '/rdc/rdcs',
    data,
    method: 'post',
  })
}

export function getRdcs() {
  return request({
    url: 'rdc/rdcs',
    method: 'get'
  })
}