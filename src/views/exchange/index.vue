<template>
  <div class="exchange-wrapper">
    <div class="exchange-banner"></div>
    <div class="exchange-content d-flex flex-column justify-center align-center">
      <!-- 標題與副文字 -->
      <p class="text-wrapper d-flex flex-column align-start">
        <span class="text-title">
          {{ $t('exchange.title') }}
        </span>
        <span class="text-description">
          {{ $t('exchange.description') }}
        </span>
      </p>
      <!-- 輸入欄位 -->
      <v-form class="d-flex flex-column align-center">
        <!-- 我要兌換: -->
        <div class="exchange exchange-from mb-6">
          <p class="input-title mb-2">{{ $t('exchange.changeFrom') }}</p>
          <input
            v-model="fromCoinAmount"
            :placeholder="$t('exchange.inputLabel')"
            type="text"
            class="input exchange-from-input"
            @input="updateToCoinAmount"
          />
          <!-- 輸入欄右方操作列 -->
          <div class="input-controls d-flex align-center py-2">
            <v-btn
              height="20"
              min-width="32"
              text color="primary"
              class="pa-0 mr-3"
              @click="fromCoinAmount = fromCoinAmountMax; updateToCoinAmount()"
            >
              {{ $t('exchange.max') }}
            </v-btn>
            <v-divider vertical></v-divider>
            <!-- from 幣種選擇 -->
            <v-menu offset-y v-model="fromCoinMenuShow">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  height="48"
                  v-bind="attrs"
                  v-on="on"
                  text
                  class="d-flex justify-space-between px-3"
                  :class="{ 'select-open': fromCoinMenuShow }"
                >
                  <v-img width="32" height="32" contain :src="require(`@/assets/imgs/coins/coin_${fromCoin}.png`)" class="mr-2"></v-img>
                  <span>{{ fromCoin | translateCoinName }}</span>
                  <v-icon class="drop-icon">mdi-menu-down</v-icon>
                </v-btn>  
              </template>
              <v-list>
                <!-- 顯示全部幣種 ( 現階段先把沒有匯率資料的幣濾掉 ) -->
                <v-list-item
                  v-for="balance in getCurrentUserBalances"
                  :key="balance.coin"
                  class="coin-option"
                  @click="fromCoin = balance.coin"
                  v-show="getCryptoQuotes.find(quote => quote.id == balance.coin)"
                >
                  <v-list-item-title>{{ balance.coin | translateCoinName }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <span class="input-description">{{ $t('exchange.available') }} {{ fromCoinAmountMax | toFixedNumber }} {{ fromCoin | translateCoinName }}</span>
        </div>
        <!-- 兌換 icon -->
        <v-icon class="primary--text exchange-icon mb-0">mdi-swap-vertical-bold</v-icon>
        <!-- 我要換成: -->
        <div class="exchange exchange-to">
          <p class="input-title mb-2">{{ $t('exchange.changeTo') }}</p>
          <input
            v-model="toCoinAmount"
            type="text"
            class="input exchange-to-input"
            @input="updateFromCoinAmount"
          />
          <span class="input-description">{{ $t('exchange.receiveAmount') }}</span>
          <span class="exchange-calculate gray--text">1 {{ toCoin | translateCoinName }} &#8776; {{ ratio | toFixedNumber }} {{ fromCoin | translateCoinName }}</span>
          <!-- 輸入欄右方操作列 -->
          <div class="input-controls d-flex align-center py-2">
            <v-divider vertical></v-divider>
            <!-- to 幣種選擇 -->
            <v-menu offset-y v-model="toCoinMenuShow">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  height="48"
                  v-bind="attrs"
                  v-on="on"
                  text
                  class="d-flex justify-space-between px-3"
                  :class="{ 'select-open': toCoinMenuShow }"
                >
                  <v-img width="32" height="32" contain :src="require(`@/assets/imgs/coins/coin_${toCoin}.png`)" class="mr-2"></v-img>
                  <span>{{ toCoin | translateCoinName }}</span>
                  <v-icon class="drop-icon">mdi-menu-down</v-icon>
                </v-btn>  
              </template>
              <v-list>
                <!-- 顯示全部幣種 -->
                <v-list-item
                  v-for="coin in getCryptoQuotes"
                  :key="coin.id"
                  class="coin-option"
                  @click="toCoin = coin.id"
                >
                  <v-list-item-title class="d-flex justify-start align-center">{{ coin.id | translateCoinName }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
        <!-- 按鈕們 -->
        <div class="actions d-flex justify-space-between mb-8">
          <v-btn @click="clearAmount" width="268" height="48" outlined>{{ $t('base.cancel') }}</v-btn>
          <v-btn width="606" height="48" color="primary" elevation="0" class="default--text">{{ $t('exchange.action') }}</v-btn>
        </div>
        <!-- 兌換紀錄 -->
        <v-btn text height="24" color="primary" class="px-0 align-self-end">{{ $t('exchange.exchangeRecords') }}</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { coinFilters, priceFilters } from '@/utils/mixins'

export default {
  name: 'Exchange',
  data() {
    return {
      coins: [],
      fromCoin: null,
      fromCoinAmount: null,
      fromCoinAmountMax: null,
      fromCoinMenuShow: false,
      toCoin: null,
      toCoinAmount: null,
      toCoinMenuShow: false,
      ratio: null
    }
  },
  mixins: [coinFilters, priceFilters],
  computed: {
    ...mapGetters(['getCryptoQuotes', 'getCurrentUserBalances'])
  },
  watch: {

    fromCoin(newVal) {
      this.updateRatio()
      this.fromCoinAmountMax = this.getCurrentUserBalances.find(balance => balance.coin == newVal).amount
      this.clearAmount()
    },

    toCoin() {
      this.updateRatio()
      this.clearAmount()
    },

  },
  methods: {
    ...mapActions('user', ['currentUserBalancesInit']),
    ...mapActions('coin', ['quotesInit']),

    // 更新兩幣種匯率比值
    updateRatio() {
      const fromCoin = this.fromCoin
      const toCoin = this.toCoin
      // 如果 fromCoin 或 toCoin 不存在就不更新比值資料
      if (!fromCoin || !toCoin) {
        return
      }
      const fromCoinValue = this.getCryptoQuotes.find(coin => coin.id == fromCoin).rate
      const toCoinValue = this.getCryptoQuotes.find(coin => coin.id == toCoin).rate
      this.ratio = toCoinValue / fromCoinValue
    },

    // 根據 fromCoinAmount 更新 toCoinAmount
    updateToCoinAmount() {
      if (isNaN(Number(this.fromCoinAmount))) {
        this.clearAmount()
        return
      }
      this.toCoinAmount = this.fromCoinAmount / this.ratio
    },

    // 根據 toCoinAmount 更新 frpmCoinAmount
    updateFromCoinAmount() {
      if (isNaN(Number(this.toCoinAmount))) {
        this.clearAmount()
        return
      }
      this.fromCoinAmount = this.toCoinAmount * this.ratio
    },

    // 清除兩種貨幣的數量
    clearAmount() {
      this.fromCoinAmount = null
      this.toCoinAmount = null
    }

  },
  created() {
    // 更新匯率資料
    this.quotesInit()
    // 更新使用者錢包餘額
    this.currentUserBalancesInit()

    this.toCoin = this.getCryptoQuotes[0].id
    this.fromCoin = this.getCurrentUserBalances[0].coin
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.exchange-wrapper {
  position: relative;
  background: $default;

  .exchange-banner {
    width: 100%;
    height: 320px;
    background-image: url('./imgs/exchange_banner.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .exchange-content {
    width: 100%;
    position: relative;
    top: -44px;
    background: $default;
    border-radius: 44px 44px 0px 0px;
    padding-top: 88px;
    padding-bottom: 116px;

    .text-wrapper {
      width: 900px;
      margin-bottom: 80px !important;

      .text-title {
        font-size: 40px;
        line-height: 56px;
        margin-bottom: 10px !important;
      }

      .text-description {
        font-size: 16px;
        line-height: 32px;
      }
    }

    .exchange {
      position: relative;
      width: 900px;
  
      &.exchange-to {
        position: relative;
        margin-bottom: 100px;

        .exchange-calculate {
          position: absolute;
          left: 0px;
          bottom: -20px;
        }
      }

      .input-title {
        font-size: 16px;
        line-height: 22px;
        font-family: 'TC-bold';
      }

      .input {
        width: 100%;
        border: 1px solid $gray_bright;
        height: 48px;
        border-radius: 4px;
        padding: 0px 240px 0px 28px;
        
        &::placeholder {
          color: $gray_light;
        }
      }

      .input-controls {
        position: absolute;
        right: 0px;
        bottom: 0px;
        height: 48px;

        .select-open {

          .drop-icon {
            transform: rotate(180deg)
          }
        }
      }

      .input-description {
        position: absolute;
        top: 8px;
        right: 12px;
        white-space: nowrap;
      }
    }

    .exchange-icon {
      font-size: 32px;
    }

    .actions {
      width: 900px;
    }
  }
}

::v-deep .v-list-item {
  min-height: 48px !important;

  &:hover {
    background-color: $primary;
    color: $default;
  }
}

</style>