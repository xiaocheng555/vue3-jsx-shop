import NavBar from '@/components/NavBar'
import { Toast, AddressEdit, AddressEditInfo } from 'vant'
import { computed, defineComponent, ref } from 'vue'
import { areaList } from '@vant/area-data'
import { useRoute } from 'vue-router'
import { editAddressApi, addAddressApi, deleteAddressApi, getAddressDetailApi, AddressItemResData } from '@/Apis/address'

export default defineComponent({
  name: 'AddressEdit',
  emits: ['back'],
  setup (props, context) {
    const route = useRoute()
    const searchResult = ref([])
    const addressInfo = ref<AddressEditInfo>({} as AddressEditInfo)
    const saving = ref(false)
    const deleting = ref(false)
    const id = computed(() => {
      return route.query.addressId
    })

    const fetchAddressInfo = async () => {
      if (!id.value) return

      const toast = Toast.loading('加载中...')
      try {
        const res = await getAddressDetailApi(id.value as string)
        const data: AddressItemResData = res.data || {}
        addressInfo.value = Object.assign(addressInfo.value, {
          name: data.userName,
          tel: data.userPhone,
          province: data.provinceName,
          city: data.cityName,
          county: data.regionName,
          addressDetail: data.detailAddress,
          isDefault: !!data.defaultFlag,
          areaCode: getAreaCode(data)
        })
      } catch (err) {
        console.error('获取地址失败', err)
      } finally {
        toast.clear()
      }
    }

    const getAreaCode = (data: AddressItemResData) => {
      let countyCodes: string[] = []
      const { regionName, provinceName, cityName } = data
      const { province_list: provinceList, city_list: cityList, county_list: countryList } = areaList

      let cCode: keyof any
      for (cCode in countryList) {
        // @ts-ignore
        if (countryList[cCode] === regionName) {
          countyCodes.push(cCode)
        }
      }
      if (countyCodes.length <= 1) return countyCodes[0]

      // 如果区有重名的话，则找出对应的省
      for (const pCode in provinceList) {
        // @ts-ignore
        if (provinceList[pCode] === provinceName) {
          // 区和省前两位编码相同
          countyCodes = diffCodes(countyCodes, pCode, 2)
        }
      }
      if (countyCodes.length <= 1) return countyCodes[0]

      // 如果省和区有重名的话，则找出对应的市
      for (const cCode in cityList) {
        // @ts-ignore
        if (cityList[cCode] === cityName) {
          // 区和市前四位编码相同
          countyCodes = diffCodes(countyCodes, cCode, 4)
        }
      }
      return countyCodes[0]

      // 对比目标编码的前n位数，来筛选匹配的编码
      function diffCodes (countyCodes: string[], code: string, count = 2) {
        const res: string[] = []
        const targetPrefix = String(code).slice(0, count)

        for (let i = 0; i < countyCodes.length; i++) {
          const currCode = countyCodes[i]
          const currPrefix = String(currCode).slice(0, count)
          if (currPrefix === targetPrefix) {
            res.push(currCode)
          }
        }
        return res
      }
    }

    const onSave = (content: AddressEditInfo) => {
      id.value ? updateAddress(content) : createAddress(content)
    }

    const updateAddress = async (content: AddressEditInfo) => {
      try {
        saving.value = true
        await editAddressApi({
          addressId: id.value as string,
          userName: content.name,
          userPhone: content.tel,
          provinceName: content.province,
          cityName: content.city,
          regionName: content.county,
          detailAddress: content.addressDetail,
          defaultFlag: content.isDefault ? 1 : 0
        })
        onBack()
      } catch (err) {
        console.error('更新地址失败：', err)
      } finally {
        saving.value = false
      }
    }

    const createAddress = async (content: AddressEditInfo) => {
      try {
        saving.value = true
        await addAddressApi({
          userName: content.name,
          userPhone: content.tel,
          provinceName: content.province,
          cityName: content.city,
          regionName: content.county,
          detailAddress: content.addressDetail,
          defaultFlag: content.isDefault ? 1 : 0
        })
        onBack()
      } catch (err) {
        console.error('新增地址失败：', err)
      } finally {
        saving.value = false
      }
    }

    const onDelete = async () => {
      try {
        deleting.value = true
        await deleteAddressApi(id.value as string)
        onBack()
      } catch (err) {
        console.error('地址删除失败：', err)
      } finally {
        deleting.value = false
      }
    }

    const onBack = (change: boolean = true) => {
      context.emit('back', change)
    }

    // 执行
    fetchAddressInfo()

    return () => (
      <div>
        <NavBar title={id.value ? '地址编辑' : '地址新增'} leftArrow onClick-left={() => onBack(false)}></NavBar>
        <AddressEdit
          address-info={addressInfo.value}
          area-list={areaList}
          show-set-default
          showDelete
          show-search-result
          search-result={searchResult.value}
          area-columns-placeholder={['请选择', '请选择', '请选择']}
          is-saving={saving.value}
          is-isDeleting={deleting.value}
          onSave={onSave}
          onDelete={onDelete}>
        </AddressEdit>
      </div>
    )
  }
})
