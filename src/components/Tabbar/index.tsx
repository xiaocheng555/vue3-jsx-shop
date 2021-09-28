/*
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
 */
import router from '@/router'
import { Badge, Tabbar, TabbarItem } from 'vant'
import { computed, defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import './index.less'

export default defineComponent({
  name: 'tabbar',
  setup () {
    const active = ref(0)
    const visible = ref(true)
    const route = useRoute()
    const store = useStore()
    const cartCount = computed(() => {
      return store.state.cartCount
    })

    const tabs = [
      {
        name: '首页',
        icon: 'wap-home-o',
        path: '/home'
      },
      {
        name: '分类',
        icon: 'points',
        path: '/category'
      },
      {
        name: '购物车',
        icon: 'shopping-cart-o',
        path: '/cart',
        isCart: true
      },
      {
        name: '我的',
        icon: 'user-o',
        path: '/user'
      }
    ]

    const setActiveTab = (path: String) => {
      const index = tabs.findIndex(tab => tab.path === path)
      if (index > -1) {
        active.value = index
        visible.value = true
      } else {
        visible.value = false
      }
    }

    watch(() => route.path, (path) => {
      setActiveTab(path)
    }, {
      immediate: true
    })

    return () => {
      return (
        visible.value
          ? (
          <div class="tabbar-wrap">
            <Tabbar v-model={active.value}>
              {tabs.map(tab => (
                <TabbarItem
                  icon={tab.icon}
                  onClick={() => { router.push(tab.path) }}>
                  {!tab.isCart ? tab.name : <Badge content={cartCount.value} offset={[-5, -23]}>{tab.name}</Badge>}
                </TabbarItem>
              )
              )}
            </Tabbar>
          </div>
            )
          : undefined
      )
    }
  }
})
