<template>
  <v-card height="100" outlined class="address-card py-6 px-4 mb-3">
    <div class="subjects d-flex align-center mb-2">
      <div class="subject address d-flex align-center">
        <v-img max-width="24" height="24" contain :src="require(`@/assets/imgs/coins/coin_${address.coin}.png`)" class="mr-3"></v-img>
        <span>{{ address.coin | translateCoinName }} {{ $t('address.address') }}</span>
      </div>
      <div class="subject time">{{ $t('address.createdTime') }}</div>
      <div class="subject balance">{{ $t('address.balance') }}</div>
    </div>
    <div class="contents d-flex align-center">
      <div class="content address">
        <span class="mr-2">{{ address.address }}</span>
        <v-icon small class="copy" @click="copyAddress(address.address)">mdi-content-copy</v-icon>
      </div>
      <div class="content time">
        <span class="mr-3">{{ address.created_time | getDateFromTimeString }}</span>
        <span>{{ address.created_time | getTimeFromTimeString }}</span>
      </div>
      <div class="content">
        {{ address.amount | toFixedNumber }} {{ address.coin | translateCoinName }}
      </div>
    </div>
  </v-card>
</template>

<script>
import { coinFilters, dateFilters, priceFilters } from '@/utils/mixins'

export default {
  name: 'AddressCard',
  props: {
    address: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  mixins: [coinFilters, dateFilters, priceFilters],
  methods: {
    copyAddress(address) {
      console.log(address)
      const elem = document.createElement('textarea')
      elem.value = address
      document.body.appendChild(elem)
      elem.select()
      document.execCommand('copy')
      this.$alert.toast.fire({
        icon: 'success',
        title: this.$t('alert.copySuccess')
      })
      document.body.removeChild(elem)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.subjects {
  
  .subject {

    &.address {
      font-size: 18px;
      width: 50%;

      span {
        font-size: 18px;
      }
    }
    &.time {
      width: 30%;
      color: $gray_light;
    }
    &.balance {
      width: 20%;
      color: $gray_light;
    }
  }
}

.contents {

  .content {

    &.address {
      width: 50%;

      .copy {
        cursor: pointer;
      }
    }
    &.time {
      width: 30%;
    }
    &.balance {
      width: 20%;
    }
  }
}

</style>