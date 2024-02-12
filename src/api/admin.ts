import axios from 'axios';
import { request } from '@/api/http';
import { Attribute, Category, Rdc } from '@/types/type';

// 类目管理
export function addCategory(data: Category) {
  return request({
    url: '/category/categories',
    method: 'post',
    data
  })
}

export function getCategories() {
  return request({
    url: '/category/categories',
    method: 'get',
  })
}

export function getCategoriesByParentId(pid: string) {
  return request({
    url: `/category/category/${pid}`,
    method: 'get',
  })
}

export function getParentLevelOptions(level: number) {
  return request({
    url: `/category/categories/${level}`,
    method: 'get'
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
    url: `/category/categories/${cid}`,
    method: 'delete',
  })
}

// 属性管理
export function addAttribute(data: Attribute) {
  return request({
    url: '/attribute/attributes',
    method: 'post',
    data
  })
}

export function getAttributeList() {
  return request({
    url: '/attribute/attributes',
    method: 'get',
  })
}

// 供应商管理
export function getSuppliers() {
  return request({
    url: '/supplier/suppliers',
    method: 'get',
  })
}

export function addSupplier(data: User) {
  return request({
    url: '/supplier/suppliers',
    method: 'post',
    data
  })
}

export function deleteSupplier(sid: string) {
  return request({
    url: `/supplier/suppliers/${sid}`,
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

export function deleteRdc(rid: string) {
  return request({
    url: `/admin/rdcs/${rid}`,
    method: 'delete',
  })
}