import axios from 'axios';
import { request } from '@/api/http';
import { Attribute, Brand, Category, Rdc, Sku, Spu, RdcSpu, Model } from '@/types/type';

// 类目管理
export function addCategory(data: Category) {
  return request({
    url: '/category/categories',
    method: 'post',
    data
  })
}

export function getCategories(page: number, pageSize: number) {
  return request({
    url: `/category/categories/${page}/${pageSize}`,
    method: 'get',
  })
}

export function getCategoriesOptions() {
  return request({
    url: '/category/categories/tree',
    method: 'get',
  })
}

export function getCategoriesTree() {
  return request({
    url: '/category/categories/tree',
    method: 'get',
  })
}

export function getCategoriesByParentId(pid: string, page: number, pageSize: number) {
  return request({
    url: `/category/categories/${pid}/${page}/${pageSize}`,
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

export function getAttributeListBySpuId(sid: string) {
  return request({
    url: `/attribute/attributes/${sid}`,
    method: 'get',
  })
}

export function deleteAttribute(aid: string) {
  return request({
    url: `/attribute/attributes/${aid}`,
    method: 'delete',
  })
}

// 品牌管理
export function addBrand(data: Brand) {
  return request({
    url: '/brand/brands',
    method: 'post',
    data
  })
}

export function getBrandList() {
  return request({
    url: '/brand/brands',
    method: 'get',
  })
}

export function getBrandListByCategoryId(cid: string) {
  return request({
    url: `/brand/brands/${cid}`,
    method: 'get',
  })
}

export function deleteBrand(bid: string) {
  return request({
    url: `/brand/brands/${bid}`,
    method: 'delete',
  })
}

// SPU管理
export function addSpu(data: Spu) {
  return request({
    url: '/spu/spus',
    method: 'post',
    data
  })
}

export function getSpuList() {
  return request({
    url: '/spu/spus',
    method: 'get',
  })
}

export function getSpuListByCategoryId(cid: string) {
  return request({
    url: `/spu/spus/${cid}`,
    method: 'get',
  })
}

export function deleteSpu(sid: string) {
  return request({
    url: `/spu/spus/${sid}`,
    method: 'delete',
  })
}

// SKU管理
export function addSku(data: Sku) {
  return request({
    url: '/sku/skus',
    method: 'post',
    data
  })
}

export function getSkuList() {
  return request({
    url: '/sku/skus',
    method: 'get',
  })
}

export function deleteSku(sid: string) {
  return request({
    url: `/sku/skus/${sid}`,
    method: 'delete',
  })
}

// Rdc-Spu关联
export function addRdcSpus(data:  RdcSpu[]) {
  return request({
    url: '/rdc_spu/rdc_spus',
    method: 'post',
    data
  })
}

export function getRdcSpuList() {
  return request({
    url: '/rdc_spu/rdc_spus',
    method: 'get',
  })
}

export function deleteRdcSpu(rid: string) {
  return request({
    url: `/rdc_spu/rdc_spus/${rid}`,
    method: 'delete',
  })
}

// 供应商管理
export function getSuppliers(page: number, pageSize: number) {
  return request({
    url: `/supplier/suppliers/${page}/${pageSize}`,
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

// 模型参数管理
export function getModels(page: number, pageSize: number, type: number) {
  return request({
    url: `model/models/${page}/${pageSize}/${type}`,
    method: 'get'
  })
}

export function addModel(data: Model) {
  return request({
    url: 'model/models',
    method: 'post',
    data
  })
}

// 资源管理
export function getResourceUsage() {
  return request({
    url: '/cdp/cdps',
    method: 'get',
  })
}

export function addResource(data: Resource) {
  return request({
    url: '/resource/resources',
    method: 'post',
    data
  })
}

export function getResources(page: number, pageSize: number, type: number) {
  return request({
    url: `/resource/resources/${page}/${pageSize}/${type}`,
    method: 'get',
  })
}

export function deleteResource(rid: string) {
  return request({
    url: `/resource/resources/${rid}`,
    method: 'delete'
  })
}