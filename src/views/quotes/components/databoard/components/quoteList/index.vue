<template>
  <div class="list-wrapper">
    <div v-for="quote in quotes" :key="quote.id" class="row-wrapper">
      <div
        class="quote-row d-flex justify-space-between align-center px-14 gray_dark--text"
      >
        <div class="row-left d-flex justify-space-between">
          <div class="left-title d-flex align-center">
            <v-img :src="require(`@/assets/imgs/coins/coin_${quote.id}.png`)" class="title-icon"></v-img>
            <div class="title-text">
              <p class="mb-1">{{ quote.id | translateCoinName }}</p>
              <p class="title-text-exchange gray--text">USDT</p>
            </div>
          </div>
          <div class="left-price d-flex flex-column align-end">
            <p
              class="mb-1"
              :class="{
                'success--text': quote.dailyFluctuation > 0,
                'error--text': quote.dailyFluctuation < 0,
              }"
            >
              {{ quote.rate | toFixedNumber }}
            </p>
            <p class="gray--text">
              &#8776;&#36;{{ quote.rate | toFixedNumber }}
            </p>
          </div>
        </div>
        <div class="row-right row d-flex align-center ma-0">
          <v-col
            class="daily-fluctuation text-end pa-0"
            :class="{
              'success--text': quote.rate - quote.kline.data[1].close > 0,
              'error--text': quote.rate - quote.kline.data[1].close < 0,
            }"
          >
            {{ (quote.rate - quote.kline.data[1].close) / quote.kline.data[1].close * 100 | toFixedNumber }}%
          </v-col>
          <!-- // TODO 24HR 最高 (現階段拿不到資料昨日最高) -->
          <v-col class="daily-highest text-end pa-0">
            {{ quote.kline.data[0].high | toFixedNumber }}
          </v-col>
          <!-- // TODO 24HR 最低 (現階段拿不到資料昨日最低) -->
          <v-col class="daily-lowest text-end pa-0">
            {{ quote.kline.data[0].low | toFixedNumber }}
          </v-col>
          <v-col class="chart pa-0 d-flex justify-end align-center">
            <QuoteChart :weekly-quote-data="quote.kline.data" />
          </v-col>
        </div>
      </div>
      <v-divider></v-divider>
    </div>
  </div>
</template>

<script>
import QuoteChart from './components/quoteChart'

import { coinFilters, priceFilters } from '@/utils/mixins'

export default {
  name: 'quoteList',
  components: {
    QuoteChart,
  },
  props: {
    quotes: {
      type: Array,
      default() {
        return []
      },
    },
  },
  mixins: [coinFilters, priceFilters]
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.quote-row {
  width: 100%;
  height: 80px;
  font-size: 1rem !important;

  .row-left {
    width: 260px;

    .left-title {
      .title-icon {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }

  .row-right {
    .chart-wrapper {
      position: relative;
      max-width: 142px;
    }
  }
}
</style>
