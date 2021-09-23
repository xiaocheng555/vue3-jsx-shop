import { ref, reactive } from 'vue'

export default {
  name: 'home',
  setup () {
    const msg = ref('msg data')
    const state = reactive({
      val: '123'
    })
    console.log(msg.value)

    return () => (
      <div>
        { msg.value }
        { state.val }
      </div>
    )
  }
}
