<template>
  <div class="trade-records-wrapper pt-10 px-8 pb-11">
    <div class="actions-bar d-flex justify-space-between mb-10">
      <div class="action-filters">
        <v-btn
        width="100"
        height="40"
        elevation="0"
        class="action-filter mr-5"
        :class="{ selected: selectedAction == 0 }"
        @click="selectedAction = 0"
        >
          {{ $t('tradeRecords.all') }}
        </v-btn>
        <v-btn
        width="100"
        height="40"
        elevation="0"
        class="action-filter mr-5"
        :class="{ selected: selectedAction == 1 }"
        @click="selectedAction = 1"
        >
          {{ $t('tradeRecords.transIn') }}
        </v-btn>
        <v-btn
        width="100"
        height="40"
        elevation="0"
        class="action-filter"
        :class="{ selected: selectedAction == 2 }"
        @click="selectedAction = 2"
        >
          {{ $t('tradeRecords.transOut') }}
        </v-btn>
      </div>
      <v-btn @click="reloadData" text height="24" class="primary--text pa-0"><v-icon class="mr-1">mdi-reload</v-icon>{{ $t('tradeRecords.reloadData') }}</v-btn>
    </div>
    <v-menu offset-y v-model="coinMenuShow">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          elevation="0"
          min-width="88"
          width="auto"
          height="28"
          v-bind="attrs"
          v-on="on"
          class="coin-filter d-flex justify-space-between mb-3"
          :class="{ 'select-open': coinMenuShow }"
        >
          <span v-if="selectedCoin">{{ selectedCoin | translateCoinName }}</span>
          <span v-else>{{ $t('tradeRecords.all') }}</span>
          <v-icon class="dropdown-icon">mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <!-- 顯示全部幣種 -->
        <v-list-item
          class="coin-option"
          @click="selectedCoin = 0"
        >
          <v-list-item-title>{{ $t('tradeRecords.all') }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-for="coin in coins"
          :key="coin"
          class="coin-option"
          @click="selectedCoin = coin"
        >
          <v-list-item-title>{{ coin | translateCoinName }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <div class="records-wrapper">
      <Loading v-if="isLoading" />
      <SpecialStatus v-if="!isLoading && !records.length" :status-code="1" />
      <RecordCard v-for="record in showingRecords" :key="record.id" :record="record" />
    </div>
  </div>
</template>

<script>
import RecordCard from './components/recoedCard'

import Loading from '@/components/loading'
import SpecialStatus from '@/components/specialStatus'

import { coinFilters } from '@/utils/mixins'

export default {
  name: 'TradeRecords',
  components: {
    RecordCard,
    Loading,
    SpecialStatus
  },
  data() {
    return {
      isLoading: true,
      selectedAction: 0, // 0: 全部 ， 1: 入金 ， 2: 出金
      coins: [],
      selectedCoin: null,
      showingRecords: [],
      records: [],
      coinMenuShow: false
    }
  },
  mixins: [coinFilters],
  methods: {
    // 置入 交易紀錄資料
    async getRecordsInit() {
      try {
        this.isLoading = true
        const res = await this.$request({ url: '/bill/trans/', method: 'get' })
        const data = res.results
        data.forEach(record => {
          if (!this.coins.includes(record.coin)) {
            this.coins.push(record.coin)
          }
        })
        this.records = data
        this.showingRecords = data
        this.filterRecordsByOptions()
        this.isLoading = false
      } catch(err) {
        console.log(err)
        this.filterRecordsByOptions()
        this.isLoading = false
      }
    },

    // 根據已選選項 過濾全部記錄
    filterRecordsByOptions() {

      if (this.selectedCoin) {
        this.showingRecords = this.records.filter(record => record.coin == this.selectedCoin)
      } else {
        this.showingRecords = this.records
      }

      if (this.selectedAction) {
        this.showingRecords = this.showingRecords.filter(record => record.type == this.selectedAction)
      }
      
    },

    // 重新載入資料並重設過濾選項
    reloadData() {
      this.showingRecords = []
      this.records = []
      this.getRecordsInit()
    }
  },
  created() {
    this.getRecordsInit()
  },
  watch: {
    selectedCoin() {
      this.filterRecordsByOptions()
    },
    selectedAction() {
      this.filterRecordsByOptions()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.trade-records-wrapper {
  position: relative;

  .action-filters {

    .action-filter {
      background: $default;
      border: 1px solid $gray_bright;

      &.selected {
        background: $primary;

      }
    }
  }

  .coin-filter {
    position: relative;
    background: $default;
    border: 1px solid $gray_bright;

    &.select-open {
      
      .dropdown-icon {
        transform: rotate(180deg);
      }
    }
  }

}

::v-deep .v-list-item {
  min-height: 28px !important;

  &:hover {
    background-color: $primary;
    color: $default;
  }
}

</style>