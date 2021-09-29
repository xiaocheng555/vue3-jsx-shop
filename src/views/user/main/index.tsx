import { getUserInfoApi, UserInfo } from '@/Apis/user'
import NavBar from '@/components/NavBar'
import { Cell, Skeleton } from 'vant'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import './index.less'

export default {
  name: 'user',
  setup () {
    const router = useRouter()
    const loading = ref(false)
    const userInfo = ref({
      introduceSign: '',
      loginName: '',
      nickName: ''
    } as UserInfo)

    const fetchUserInfo = async () => {
      try {
        loading.value = true
        const res = await getUserInfoApi()
        const data = res.data
        if (data) {
          userInfo.value = Object.assign(userInfo.value, data)
        }
      } catch (err) {
        console.error('获取用户信息失败', err)
      } finally {
        loading.value = false
      }
    }

    fetchUserInfo()

    return () => {
      const Card =
        <div class="user-info">
          <Skeleton avatar row={2} avatar-size={60} loading={loading.value}>
            <div class="user-info-inner">
              <img class="user-info-avatar" src="https://s.yezgea02.com/1604040746310/aaaddd.png" />
              <div class="user-info-main">
                <p>昵称：{userInfo.value.nickName}</p>
                <p>登录名：{userInfo.value.loginName}</p>
                <p>个性签名：{userInfo.value.introduceSign}</p>
              </div>
            </div>
          </Skeleton>
        </div>

      return (
        <div>
          <NavBar title="我的"></NavBar>
          {Card}
          <Cell title="我的订单" is-link onClick={() => { router.push('/order/list') }} />
          <Cell title="账号管理" is-link onClick={() => { router.push('/user/setting') }} />
          <Cell title="地址管理" is-link onClick={() => { router.push('/user/address') }} />
          <Cell title="关于我们" is-link onClick={() => { router.push('/user/about') }} />
        </div>
      )
    }
  }
}
