/*
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
 */
 import http from '@/utils/http'

export interface AddressItemResData {
  addressId?: number | string,
  cityName?: string,
  defaultFlag?: number,
  detailAddress?: string,
  provinceName?: string,
  regionName?: string,
  userId?: number,
  userName?: string,
  userPhone?: string
}

export function addAddressApi (params: AddressItemResData) {
  return http.post('/address', params)
}

export function editAddressApi (params: AddressItemResData) {
  return http.put('/address', params)
}

export function deleteAddressApi (id: number | string) {
  return http.delete(`/address/${id}`)
}

export function getDefaultAddressApi () {
  return http.get<AddressItemResData>('/address/default')
}

export function getAddressListApi () {
  return http.get<AddressItemResData[]>('/address', {
    params: {
      pageNumber: 1,
      pageSize: 1000
    }
  })
}

export function getAddressDetailApi (id: number | string) {
  return http.get<AddressItemResData>(`/address/${id}`)
}
