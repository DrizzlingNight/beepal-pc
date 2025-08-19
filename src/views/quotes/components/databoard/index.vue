<template>
  <div class="data-board-wrapper">
    <v-card color="default" width="100%" class="quote-card popular-quotes">
      <v-card-title class="quotes-title pa-0">
        {{ $t('quotes.title') }}
      </v-card-title>
      <!-- 熱門行情容器 -->
      <div class="card-wrapper d-flex justify-space-between">
        <!-- 熱門行情卡片 -->
        <v-card
          flat
          tile
          v-for="quote in klineQuotes"
          :key="quote.id"
          class="popular-quote-card"
        >
          <!-- // TODO 寫了很多 inline style, 要再整理 -->
          <!-- 標頭 -->
          <v-card-title
            class="d-flex align-center pa-0"
            style="margin-bottom: 14px;"
          >
            <v-img
              width="30px"
              height="30px"
              max-width="30px"
              max-height="30px"
              position="center"
              contain
              :src="require(`@/assets/imgs/coins/coin_${quote.id}.png`)"
              class="mr-2"
            ></v-img>
            <v-card-title class="pa-0" style="font-size: 20px;">
              {{ quote.id | translateCoinName }}
            </v-card-title>
          </v-card-title>
          <!-- 數值容器 -->
          <div
            :class="{
              'success--text': quote.rate - quote.kline.data[1].close > 0,
              'error--text': quote.rate - quote.kline.data[1].close < 0,
            }"
          >
            <!-- 時價 -->
            <v-card-subtitle
              class="mb-2 price pa-0"
              style="font-size: 30px; line-height: 30px; letter-spacing: -.7px"
            >
              &#36; {{ quote.rate | toFixedNumber }}
            </v-card-subtitle>
            <!-- 波動 -->
            <v-card-text class="fluctuation pa-0">
              <span v-show="quote.rate - quote.kline.data[1].close > 0">+</span>
              {{ (quote.rate - quote.kline.data[1].close) / quote.kline.data[1].close * 100 | toFixedNumber }}%
            </v-card-text>
          </div>
          <!-- 波動箭頭 -->
          <template>
            <v-icon v-if="quote.rate - quote.kline.data[1].close > 0" class="arrow" color="success"
              >mdi-arrow-up</v-icon
            >
            <v-icon v-else class="arrow" color="error">mdi-arrow-down</v-icon>
          </template>
        </v-card>
      </div>
    </v-card>
    
    <!-- 全部行情 -->
    <v-card color="default" width="100%" class="quote-card all-quotes">
      <!-- 兌換幣種 -->
      <!-- <v-tabs
        v-model="currentExchangeId"
        slider-size="4"
        center-active
        class="px-13 exchange-tabs d-flex align-center"
      >
        <v-tab
          v-for="quote in klineQuotes"
          :key="quote.id"
          class="exchange-tab gray_dark--text"
          >{{ quote.id | translateCoinName }}</v-tab
        >
      </v-tabs>
      <v-divider></v-divider> -->
      <div
        class="all-quotes-subtitles px-14 d-flex justify-space-between align-center gray_light--text"
      >
        <div class="subtitles-left d-flex justify-space-between align-center">
          <p>{{ $t('quotes.subject_1') }}</p>
          <p>{{ $t('quotes.subject_2') }}</p>
        </div>
        <div class="subtitles-right d-flex align-center row ma-0">
          <v-col cols="3" class="text-end pa-0">{{
            $t('quotes.subject_3')
          }}</v-col>
          <v-col cols="3" class="text-end pa-0">{{
            $t('quotes.subject_4')
          }}</v-col>
          <v-col cols="3" class="text-end pa-0">{{
            $t('quotes.subject_5')
          }}</v-col>
          <v-col cols="3" class="text-center pa-0">{{
            $t('quotes.subject_6')
          }}</v-col>
        </div>
      </div>
      <v-divider></v-divider>
      <!-- 幣種對應行情資料 -->
      <QuoteList :quotes="klineQuotes" />
      <div class="d-flex justify-center align-center see-more-row">
        <!-- <v-btn text class="gray_light--text">
          {{ $t('quotes.loadMore') }}
          <v-icon small>mdi-menu-down</v-icon>
        </v-btn> -->
      </div>
    </v-card>
  </div>
</template>

<script>
import QuoteList from './components/quoteList'

import { mapActions, mapGetters } from 'vuex'

import { coinFilters, priceFilters } from '@/utils/mixins'

export default {
  name: 'dataBoard',
  components: {
    QuoteList,
  },
  data() {
    return {
      time: null,
      klineQuotes: []
    }
  },
  computed: {
    ...mapGetters(['getKlineQuotes'])
  },
  mixins: [coinFilters, priceFilters],
  methods: {
    ...mapActions('coin', ['quotesInit']),

    // 設置 20秒拉一次匯率資料的 計時器
    timer() {
      const vueInstance = this
      this.time = setInterval(() => {
        vueInstance.quotesInit()
      }, 20000)
    },
    // 計時器 init
    setTime() {
      this.timer()
    },
    // 清除計時器
    clearTime() {
      if (this.time) {
        clearInterval(this.time)
      }
    }
  },
  watch: {
    getKlineQuotes(newVal) {
      this.klineQuotes = newVal
    }
  },
  created() {
    // 為了在初次訪問時把7日走勢畫出來
    setTimeout(() => {
      // 如果一秒後還是空的就重抓
      if (!this.klineQuotes.length) {
        this.quotesInit()
      }
      this.quotesInit()
    }, 1000);
    // this.quotesInit()
    this.setTime()
  },
  beforeDestroy() {
    this.clearTime()
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.data-board-wrapper {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  top: -60px;

  .quote-card {
    border-radius: 10px;
    min-height: 200px;

    &.popular-quotes {
      padding: 40px 55px 58px 55px;
      margin-bottom: 25px;

      .quotes-title {
        font-size: 2rem;
        margin-bottom: 34px;
      }

      .popular-quote-card {
        width: 250px;
        background-color: $bg;
        border-radius: 10px !important;
        padding: 20px 20px 10px 20px;
        position: relative;

        .price {
          font-size: 2rem;
        }
        .fluctuation {
          font-size: 1rem;
        }
        .arrow {
          position: absolute;
          right: 10px;
          bottom: 10px;
        }
      }
    }

    &.all-quotes {
      .exchange-tabs {
        height: 88px;

        .exchange-tab {
          height: 100%;
          font-size: 16px;
        }
      }

      .all-quotes-subtitles {
        height: 60px;
        // color: $footer-bg;

        .subtitles-left {
          width: 260px;
        }
      }

      .see-more-row {
        height: 60px;
      }
    }
  }
}
</style>
