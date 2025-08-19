<template>
  <div class="wallet-wrapper d-flex justify-center" style="border-radius: 6px;">
    <v-card width="1200" class="py-7">
      <v-card-title class="wallet-title px-8">{{
        $t('wallet.title')
      }}</v-card-title>
      <v-tabs v-model="currentTab" class="wallet-tabs mt-3 px-8">
        <v-tab
          v-for="tab in tabs"
          :key="tab.id"
          class="wallet-tab gray_dark--text"
        >
          {{ $t(`wallet.nav_${tab.id + 1}`) }}
        </v-tab>
      </v-tabs>
      <v-divider class="wallet-divider"></v-divider>
      <Property v-if="currentTab == 0" />
      <TradeRecords v-else-if="currentTab == 1" />
      <Address v-else-if="currentTab == 2" />
      <Courses v-else-if="currentTab == 3" />
    </v-card>
  </div>
</template>

<script>
import Property from './components/property'
import TradeRecords from './components/tradeRecords'
import Address from './components/address'
import Courses from './components/courses'

export default {
  name: 'Wallet',
  components: {
    Property,
    TradeRecords,
    Address,
    Courses,
  },
  data() {
    return {
      currentTab: 0,
      tabs: [
        { id: 0, text: '我的資產' },
        { id: 1, text: '錢包交易紀錄' },
        { id: 2, text: '地址簿' },
        { id: 3, text: '課程' },
      ],
    }
  },
  created() {
    if (!this.$route.query.tab) {
      this.$router.push({ query: { tab: 0 } }).catch(() => {})
    }
    // 透過 queryString tab='' 來控制進入到哪個tab
    const targetTab = Number(this.$route.query.tab)
    this.currentTab = targetTab
  },
  watch: {
    currentTab(newVal) {
      // 切換 tab 時 做路由更新，如此可用監聽 route change的方式來實現 上下一頁功能
      this.$router.push({ query: { tab: newVal } }).catch(() => {})
    }
  },
  beforeRouteUpdate(to, from, next) {
    // 在 wallet頁面時透過其他組件導入到頁面中其他tab時會做路由更新，須透過監聽路由更新來觸發切換 tab
    const targetTab = Number(to.query.tab)
    const currentTab = this.currentTab
    if (targetTab != currentTab) {
      this.currentTab = targetTab
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.wallet-wrapper {
  width: 100%;
  padding: 64px 0px 60px 0px;

  .wallet-title {
    font-size: 40px;
    font-family: 'TC-bold';
  }
  .v-tabs.wallet-tabs {
    .wallet-tab {
      font-size: 14px !important;
      font-family: 'TC-bold';

      &.v-tab--active {
        color: $primary !important;
      }
    }
  }
}
</style>
