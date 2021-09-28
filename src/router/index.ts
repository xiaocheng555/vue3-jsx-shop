/*
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {
      name: 'Home'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/home/index')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import(/* webpackChunkName: "Category" */ '@/views/category/index.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "Cart" */ '@/views/cart/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "User" */ '@/views/user/main/index')
  },
  {
    path: '/user/setting',
    name: 'setting',
    component: () => import(/* webpackChunkName: "Setting" */ '@/views/user/setting/index')
  },
  {
    path: '/user/address',
    name: 'address',
    component: () => import(/* webpackChunkName: "Address" */ '@/views/user/address/index')
  },
  {
    path: '/user/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "About" */ '@/views/user/about/index')
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: () => import(/* webpackChunkName: "ProductDetail" */ '@/views/product/detail/index.vue')
  },
  {
    path: '/product/list',
    name: 'product-list',
    component: () => import(/* webpackChunkName: "ProductList" */ '@/views/product/list/index.vue')
  },
  {
    path: '/order/list',
    name: 'order-list',
    component: () => import(/* webpackChunkName: "OrderList" */ '@/views/order/list/index.vue')
  },
  {
    path: '/order/create',
    name: 'order-create',
    component: () => import(/* webpackChunkName: "OrderCreate" */ '@/views/order/create/index.vue')
  },
  {
    path: '/order/:id',
    name: 'order-detail',
    component: () => import(/* webpackChunkName: "OrderDetail" */ '@/views/order/detail/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
