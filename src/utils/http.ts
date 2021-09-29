/*
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
 */

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import appConfig from '@/config/index'
import router from '@/router/index'
import { Toast } from 'vant'
import { httpInstance } from './http.d'

/*
 * 创建axios实例
 */
// AxiosInstance
const http: httpInstance = axios.create({
  baseURL: appConfig.baseUrl,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000
})

/*
 * 请求拦截
 */
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers.token = window.localStorage.getItem('token') // 设置token
    return config
  },
  (error: AxiosError) => {
    console.error('[接口请求错误]: ', error)
    return Promise.reject(error)
  }
)

/*
 * 响应拦截
 */
http.interceptors.response.use(
  (response: AxiosResponse) => {
    const res: Res.Data<any> = response.data
    if (res.resultCode === 200) {
      return res
    } else {
      if (res.resultCode === 416) {
        // 处理登陆失效
        Toast.fail('登录失效')
        router.push('/login')
      } else if (res.message && res.resultCode) {
        // 统一错误提示
        Toast.fail(res.message)
      }
      return Promise.reject(createAxiosError(response)) // 抛出异常
    }
  },
  (error: AxiosError) => {
    if (error.message === 'Network Error') {
      Toast('请检查网络连接')
    }

    console.error('[接口响应错误]: ', error)
    return Promise.reject(error)
  }
)

function createAxiosError (response: AxiosResponse): AxiosError {
  const error: any = new Error()
  error.isAxiosError = true
  error.response = response
  error.config = response.config
  error.toJSON = () => ({})
  return error
}

export const resolveResError = (error: any): Res.Data<any> | undefined => {
  return error?.response?.data
}

export default http
