import NavBar from '@/components/NavBar'

export default {
  name: 'about',
  setup () {
    return () => (
      <div>
        <NavBar title="关于我们" leftArrow></NavBar>
        <p style="padding: 20px 15px;">
          本项目是在
          <a href="https://github.com/newbee-ltd/newbee-mall-vue-app">newbee-mall-vue-app</a> 项目进行改造的，在原基础上增加了typescript 和 jsx；本项目仅用于学习。
          </p>
      </div>
    )
  }
}
