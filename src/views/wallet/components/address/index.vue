<template>
  <div class="address-wrapper pt-10 px-8 pb-11">
    <div class="address-card-wrapper">
      <p class="address-title mb-5">{{ $t('address.title') }}</p>
      <Loading v-if="isLoading" />
      <SpecialStatus :status-code="1" v-if="!isLoading && !addressList.length" />
      <Address-card v-for="address in addressList" :key="address.id" :address="address" />
    </div>
  </div>
</template>

<script>
import AddressCard from './components/addressCard'

import Loading from '@/components/loading'
import SpecialStatus from '@/components/specialStatus'

export default {
  name: 'Address',
  components: {
    AddressCard,
    Loading,
    SpecialStatus
  },
  data() {
    return {
      addressList: [],
      isLoading: true,
    }
  },
  methods: {
    async getAddressInit() {
      try {
        const res = await this.$request({ url: '/user/wallet/', method: 'get' })
        const data = res.results
        // 額外塞入錢幣數量資料
        this.addressList = data.map(address => {
          const coinAmount = address.balances.find(balance => balance.coin == address.coin).amount
          return {
            ...address,
            amount: coinAmount
          }
        })
        this.isLoading = false
      } catch(err) {
        console.log(err)
        this.isLoading = false
      }
    }
  },
  created() {
    this.getAddressInit()
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.address-title {
  font-size: 18px;
  line-height: 25px;
}

</style>