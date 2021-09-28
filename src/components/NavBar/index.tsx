/*
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
 */
import { NavBar } from 'vant'
import { defineComponent, SetupContext } from 'vue'
import { useRouter } from 'vue-router'
import './index.less'

export interface NavBarProps {
  title?: string | undefined;
  zIndex?: string | number | undefined;
  leftText?: string | undefined;
  rightText?: string | undefined;
  fixed: boolean;
  border: boolean;
  placeholder: boolean;
  leftArrow: boolean;
  safeAreaInsetTop: boolean;
  'onClick-left'?: ((...args: any[]) => any) | undefined;
  'onClick-right'?: ((...args: any[]) => any) | undefined;
}

export default defineComponent<NavBarProps>({
  name: 'NavBar',
  setup (props: NavBarProps, context: SetupContext) {
    const router = useRouter()
    console.log(props, 'props')
    console.log({ ...context.attrs }, 'context.attr')

    return () => (
      <div class="navbar-wrap">
        <NavBar fixed onClick-left={() => router.back()} {...context.attrs}>
          {context.slots}
        </NavBar>
      </div>
    )
  }
})