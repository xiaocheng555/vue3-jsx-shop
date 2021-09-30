import { AddressItemResData, getAddressListApi } from '@/Apis/address'
import NavBar from '@/components/NavBar'
import { AddressList, AddressListAddress, Toast } from 'vant'
import { computed, defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AddressEdit from './AddressEdit'

export default defineComponent({
  name: 'Address',
  props: {
    navBack: {
      type: Function
    },
    switchable: {
      type: Boolean,
      default: false
    },
    defaultId: {
      type: Number
    }
  },
  emits: ['select'],
  setup (props, context) {
    const router = useRouter()
    const route = useRoute()
    const addressList = ref<AddressListAddress []>([])
    const chosenAddressId = ref(props.defaultId)
    const showEditPage = computed(() => {
      return ['add', 'edit'].includes(String(route.query.addressType))
    })

    const fetchAddressList = async () => {
      const toast = Toast.loading('加载中...')
      try {
        const res = await getAddressListApi()
        const data = res.data || []
        addressList.value = adapterAddressList(data)
      } catch (err) {
        console.error('获取地址数据失败', err)
      } finally {
        toast.clear()
      }
    }

    const adapterAddressList = (data: AddressItemResData[]) => {
      return data.map(item => {
        const { regionName, provinceName, cityName, detailAddress } = item
        const address = [provinceName, cityName, regionName, detailAddress].join(' ')
        return {
          id: item.addressId,
          tel: item.userPhone,
          name: item.userName,
          address: address,
          isDefault: item.defaultFlag === 1
        } as AddressListAddress
      })
    }

    const onAdd = () => {
      router.replace({
        query: {
          ...route.query,
          addressType: 'add'
        }
      })
    }

    const onEdit = (item: AddressListAddress) => {
      router.replace({
        query: {
          ...route.query,
          addressType: 'edit',
          addressId: item.id
        }
      })
    }

    const onSelectItem = (address: AddressListAddress) => {
      context.emit('select', address)
    }

    const onBack = () => {
      if (props.navBack) {
        props.navBack?.()
      } else {
        router.back()
      }
    }

    const showCurrPage = (change: boolean) => {
      router.replace({
        query: {
          ...route.query,
          addressType: undefined,
          addressId: undefined
        }
      })
      change && fetchAddressList()
    }

    // 执行
    fetchAddressList()

    return () => (
      <>
        {
          !showEditPage.value
            ? (<div>
            <NavBar title="地址管理" leftArrow onClick-left={onBack}></NavBar>
            <AddressList
              v-model={chosenAddressId.value}
              list={addressList.value}
              default-tag-text="默认"
              switchable={props.switchable}
              onAdd={onAdd}
              onEdit={onEdit}
              onSelect={onSelectItem}>
            </AddressList>
          </div>)
            : <AddressEdit onBack={showCurrPage}></AddressEdit>
        }
      </>
    )
  }
})
