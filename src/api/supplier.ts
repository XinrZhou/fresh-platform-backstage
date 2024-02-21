// 品牌管理
export function addBrand(data: Brand) {
  return request({
    url: '/snapshot/brands',
    method: 'post',
    data
  })
}

export function getBrandList() {
  return request({
    url: '/snapshot/brands',
    method: 'get',
  })
}

export function getBrandListByCategoryId(cid: string) {
  return request({
    url: `/snapshot/brands/${cid}`,
    method: 'get',
  })
}

export function deleteBrand(bid: string) {
  return request({
    url: `/snapshot/brands/${id}`,
    method: 'delete',
  })
}