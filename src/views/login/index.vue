<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *-->
 <template>
  <div class="login-page">
    <NavBar title="登录" leftArrow @click-left="goBack"></NavBar>
    <div class="login-main">
      <CellGroup inset>
        <Field
          v-model="userForm.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <Field
          v-model="userForm.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </CellGroup>
      <div class="login-bnt-box">
        <Button
          round
          block
          type="primary"
          native-type="submit"
          :loading="logining"
          @click="handleLogin">
          登录
        </Button>
        <br>
        <a href="http://47.99.134.126:5008/#/login">跳去原项目注册</a>&nbsp;&nbsp;
        <a href="https://github.com/newbee-ltd/newbee-mall-vue3-app">原项目github</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { loginApi } from '@/Apis/user'
import { CellGroup, Field, NavBar, Button, Toast } from 'vant'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import md5 from 'js-md5'

const router = useRouter()
const userForm = ref({
  password: '',
  username: ''
})
const logining = ref(false)

const goBack = () => {
  router.back()
}

const handleLogin = async () => {
  try {
    logining.value = true
    const { password, username } = userForm.value
    const res = await loginApi({
      loginName: username,
      passwordMd5: md5(password)
    })

    const token = res.data
    if (token) {
      window.localStorage.setItem('token', token)
      router.replace('/user')
    }
  } catch (err) {
    console.error('登陆失败', err)
  } finally {
    logining.value = false
  }
}
</script>

<style lang='less' scoped>
.login-page {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f7f8fa;
}
.login-main {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.login-bnt-box {
  margin: 20px 16px;
}
</style>
