import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button, CellGroup, Field, Toast } from 'vant'
import NavBar from '@/components/NavBar'
import { editUserInfoApi, getUserInfoApi, logoutApi, UserInfo } from '@/Apis/user'
import md5 from 'js-md5'
import './index.less'

export default {
  name: 'setting',
  setup () {
    const router = useRouter()
    const userInfo = ref({
      introduceSign: '',
      loginName: '',
      nickName: '',
      passwordMd5: ''
    })
    const saving = ref(false)
    const exiting = ref(false)

    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfoApi()
        const data: UserInfo = res.data
        if (data) {
          userInfo.value = Object.assign(userInfo.value, data, {
            passwordMd5: ''
          })
        }
      } catch (err) {
        console.error('获取用户信息失败', err)
      }
    }

    const onSave = async () => {
      const { introduceSign, nickName, passwordMd5 } = userInfo.value
      try {
        saving.value = true
        await editUserInfoApi({
          introduceSign,
          nickName,
          passwordMd5: passwordMd5.trim() !== '' ? md5(passwordMd5) : undefined
        })
        Toast.success('保存成功')
      } catch (err) {
        console.error('保存用户信息失败：', err)
      } finally {
        saving.value = false
      }
    }

    const onExit = async () => {
      try {
        exiting.value = true
        await logoutApi()
        router.push('/login')
      } catch (err) {
        console.error('退出登陆失败', err)
      } finally {
        exiting.value = false
      }
    }

    // 执行
    fetchUserInfo()

    return () => (
      <div class="setting-page">
        <NavBar title="账号管理" leftArrow></NavBar>
        <CellGroup inset>
          <Field label="昵称" v-model={userInfo.value.nickName} />
          <Field label="个性签名" v-model={userInfo.value.introduceSign} />
          <Field label="修改密码" v-model={userInfo.value.passwordMd5} />
        </CellGroup>
        <div class="setting-action">
          <Button
            round
            loading={saving.value}
            block
            type="primary"
            native-type="submit"
            onClick={onSave}>
            保存
          </Button>
          <Button
            round
            block
            type="danger"
            native-type="submit"
            onClick={onExit}>
            退出登录
          </Button>
          </div>
      </div>
    )
  }
}
