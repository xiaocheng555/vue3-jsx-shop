import { AddressItemResData, getAddressListApi } from '@/Apis/address'
import NavBar from '@/components/NavBar'
import { AddressList, AddressListAddress, Toast } from 'vant'
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AddressEdit from './AddressEdit'

export default defineComponent({
  name: 'Address',
  props: {
    back: {
      type: Function
    },
    switchable: {
      type: Boolean,
      default: false
    },
    defaultSelectAddressId: {
      type: Number
    }
  },
  emits: ['select'],
  setup (props, context) {
    const router = useRouter()
    const route = useRoute()
    const addressList = ref<AddressListAddress []>([])
    const chosenAddressId = ref(props.defaultSelectAddressId)
    const showEditPage = ref(false)

    const fetchAddressList = async () => {
      const toast = Toast.loading('加载中...')
      try {
        const res = await getAddressListApi()
        const data: AddressItemResData[] = res.data || []
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
      router.push({
        query: {
          type: 'add'
        }
      }).then(() => {
        showEditPage.value = true
      })
    }

    const onEdit = (item: AddressListAddress) => {
      router.push({
        query: {
          ...route.query,
          type: 'edit',
          id: item.id
        }
      }).then(() => {
        showEditPage.value = true
      })
    }

    const onClickItem = (address: AddressListAddress) => {
      context.emit('select', address)
    }

    const goBack = () => {
      if (props.back) {
        props.back?.()
      } else {
        router.back()
      }
    }

    const onEditPageBack = () => {
      showEditPage.value = false
      fetchAddressList()
    }

    // 执行
    fetchAddressList()

    return () => (
      <>
        {
          !showEditPage.value
            ? (<div>
            <NavBar title="地址管理" leftArrow onClick-left={goBack}></NavBar>
            <AddressList
              v-model={chosenAddressId.value}
              list={addressList.value}
              default-tag-text="默认"
              switchable={props.switchable}
              onAdd={onAdd}
              onEdit={onEdit}
              onSelect={onClickItem}>
            </AddressList>
          </div>)
            : <AddressEdit onBack={onEditPageBack}></AddressEdit>
        }
      </>
    )
  }
})
