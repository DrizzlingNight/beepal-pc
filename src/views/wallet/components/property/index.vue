<template>
  <div class="property-wrapper pt-10 px-8 pb-11">
    <v-card rounded="lg" height="104" flat class="my-total pl-7 pr-10 mb-5 d-flex justify-space-between align-center">
      <p class="my-total-title">{{ $t('property.myTotal') }}($)</p>
      <p class="d-flex align-center">
        <span v-if="isPropertySeeable" class="my-total-amount">{{ myTotal | toFixedNumber | toLocaleString }}</span>
        <span v-else class="my-total-amount">
          &#10033;&#10033;&#10033;&#10033;&#10033;&#10033;
        </span>
        <v-btn @click="isPropertySeeable = !isPropertySeeable" width="30" height="30" icon text class="ml-2" >
          <v-icon v-if="isPropertySeeable" class="default--text">mdi-eye-off</v-icon>
          <v-icon v-else class="default--text">mdi-eye</v-icon>
        </v-btn>
      </p>
    </v-card>
    <div class="prop-card-wrapper d-flex justify-space-between flex-wrap">
      <PropCard v-for="balance in balances" :key="balance.coin" :balance="balance" :is-property-seeable="isPropertySeeable" />
      <!-- 忍者卡片，把卡片往左推 -->
      <v-card width="364" height="0"></v-card>
    </div>
  </div>
</template>

<script>
import PropCard from './components/propCard'

import { mapGetters, mapActions } from 'vuex'

import { priceFilters } from '@/utils/mixins'

export default {
  name: 'Property',
  components: {
    PropCard
  },
  computed: {
    ...mapGetters(['getCurrentUserBalances', 'getQuotes'])
  },
  data() {
    return {
      isPropertySeeable: false,
      balances: [],
      myTotal: 0,
      
    }
  },
  mixins: [priceFilters],
  methods: {

    ...mapActions('coin', ['quotesInit']),
    ...mapActions('user', ['currentUserBalancesInit']),

    propertyInit() {
      console.log('property init')
      
      // 重置餘額總值
      this.myTotal = 0
      // 根據匯率表取得對應餘額價值
      const balances = this.getCurrentUserBalances.map(balance => {
        const coin = this.getQuotes.find(quote => quote.id == balance.coin)

        // handle 找不到對應幣種 匯率資料時
        let ratio

        if (coin) {
          ratio = coin.rate
          // 把價值加入到總資產中
          this.myTotal += balance.amount * ratio
        }

        // 返還加入價值的餘額物件
        return {
          ...balance,
          ratio: ratio || null, // USDT
        }
      })
      
      // 濾掉錢幣數量為 0 跟沒有匯率資料的資產
      this.balances = balances
    }
  },
  created() {
    // 每次進入頁面時都更新一次匯率表
    this.quotesInit()
    // 每次進入頁面時都更新一次餘額
    this.currentUserBalancesInit()
    // 置入資產資料
    this.propertyInit()

    console.log('wallet total: ', this.getCurrentUserWalletTotal)
  },
  watch: {
    getQuotes() {
      this.propertyInit()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.property-wrapper {
  
  .my-total {
    background: linear-gradient(163deg, #FFF07C 0%, #FFC100 100%);

    .my-total-title {
      font-size: 16px;
    }
    .my-total-amount {
      font-size: 28px;
      line-height: 42px;
      font-family: 'TC-bold';
    }
  }
}
</style>