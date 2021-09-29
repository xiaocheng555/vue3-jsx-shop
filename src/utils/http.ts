/*
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
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
  (error: any) => {
    console.error('[request请求]: ', error)
    return Promise.reject(error)
  }
)

/*
 * 响应拦截
 */
let toast: any
let timer: any
http.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    if (res.resultCode === 200) {
      return res
    } else if (res.resultCode === 416) {
      // 处理登陆失效
      Toast.fail('登录失效')
      router.push('/login')
    } else {
      return Promise.reject(res)
    }
  },
  (error: any) => {
    if (error.message === 'Network Error') {
      clearTimeout(timer)
      // 开启多个Toast，防止Toast.loading 和此时的Toast冲突
      Toast.allowMultiple()
      toast && toast.clear()
      toast = Toast({
        message: '请检查网络连接',
        position: 'bottom',
        onClose: () => {
          toast.clear()
          timer = setTimeout(() => {
            // 100ms后关闭开启多个Toast
            // 不能立马关，会导致Toast对应的dom没有销毁
            Toast.allowMultiple(false)
            clearTimeout(timer)
          }, 100)
        }
      })
    }

    console.error('[request响应]: ', error)
    return Promise.reject(error)
  }
)

export default http
