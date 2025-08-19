<template>
  <v-card width="560" height="500" rounded="lg" class="demo-card px-8 pt-5">
    <v-tabs class="mb-6">
      <v-tab>{{ $t('homepage.section1.card.tab1') }}</v-tab>
      <v-tab disabled>{{ $t('homepage.section1.card.tab2') }}</v-tab>
    </v-tabs>
    <!-- 幣種選擇紐 -->
    <v-btn min-width="500" height="48" depressed class="coin-select-btn d-flex justify-space-between mb-2">
      <p class="coin-btn-left d-flex align-center">
        <v-img sizes="16" max-width="16" class="mr-2 rounded-circle" contain :src="require('@/assets/imgs/coins/BTC.png')" style="background: pink;"></v-img>
        <span>比特幣</span>
      </p>
      <p class="coin-btn-right">
        <v-icon>mdi-chevron-down</v-icon>
      </p>
    </v-btn>
    <!-- 幣種匯率 -->
    <p class="mb-5">
      <span class="gray--text">1 BTC = </span>
      <span style="color: #004EA8">100,420.69 USD</span>
    </p>
    <!-- 支付方式選擇 -->
    <p class="mb-2">我的支付方式</p>
    <v-btn min-width="500" height="48" depressed class="coin-select-btn d-flex justify-space-between mb-2">
      <p class="coin-btn-left d-flex align-center">
        <v-icon small class="mr-2">mdi-apple</v-icon>
        <span>ApplePay</span>
      </p>
      <p class="coin-btn-right">
        <v-btn min-width="90" height="32" outlined color="#407abd" class="pay-btn">全部顯示</v-btn>
      </p>
    </v-btn>
    <!-- 320多種購買方式 -->
    <p class="mb-5">
      <v-btn text height="14" class="pa-0" style="color: #004EA8">320 多種購買方式</v-btn>
    </p>
    <!-- 我要使用 -->
    <p class="mb-2">我要使用</p>
    <!-- 使用貨幣選擇 -->
    <div class="coin-input-wrapper d-flex align-center mb-2">
      <input type="text" placeholder="請輸入金額" class="coin-input px-4" />
      <v-btn min-width="112" height="32" absolute outlined color="#407abd" class="coin-input-btn d-flex justify-space-between">
        <span>任何貨幣</span>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </div>
    <!-- 最低金額 -->
    <p class="gray--text mb-6">最低金額: 10USD</p>
    <!-- more btn -->
    <v-btn width="500" height="48" depressed color="primary">尋求出價</v-btn>
  </v-card>
</template>

<script>
export default {
  name: 'DemoCard',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.demo-card {
  box-shadow: 0px 7px 13px 0px rgba(200, 200, 200, 0.5) !important;

  .coin-select-btn {
    background: #ffffff;
    border: 1px solid #cccccc;
  }

  .coin-input-wrapper {
    position: relative;

    .coin-input {
      width: 500px;
      height: 48px;
      border: 1px solid #cccccc;
  
      border-radius: 4px !important;
    }

    .coin-input-btn {
      right: 16px;
    }
  }

}
</style>