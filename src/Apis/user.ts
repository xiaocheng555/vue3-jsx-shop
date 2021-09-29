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

export interface UserInfo {
  introduceSign: string;
  loginName: string;
  nickName: string;
}
// 获取用户数据
export function getUserInfoApi () {
  return http.get<UserInfo>('/user/info')
}

export interface LoginParams {
  loginName: string,
  passwordMd5: string
}
// 登录接口
type token = string
export function loginApi (params: LoginParams) {
  return http.post<token>('/user/login', params)
}

// 编辑用户信息参数类型
export interface EditUserParams {
  loginName?: string,
  introduceSign?: string,
  nickName?: string,
  passwordMd5?: string
}
// 编辑用户信息
export function editUserInfoApi (params: EditUserParams) {
  return http.put('/user/info', params)
}

// 退出登录
export function logoutApi () {
  return http.post('/user/logout')
}

// export function register(params) {
//   return axios.post('/user/register', params);
// }
