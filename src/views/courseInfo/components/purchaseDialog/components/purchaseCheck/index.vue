<template>
  <v-card
    width="600"
    class="dialog-check px-10 py-12 d-flex flex-column align-center rounded-lg"
  >
    <p class="dialog-title mb-9 secondary--text">
      {{ $t('purchaseDialog.checkOrder') }}
    </p>
    <div class="dialog-content d-flex justify-start mb-5">
      <v-img
        max-width="174"
        height="100"
        :src="courseInfo.cover"
        style="background-color: #666666;"
        class="mr-7"
      ></v-img>
      <div class="dialog-content-text">
        <p class="content-title mb-5">{{ courseInfo.title }}</p>
        <p>
          <span class="gray_light--text mr-3"
            >{{ $t('courseInfo.price') }}:</span
          >
          <span class="content-price mr-1">{{
            courseInfo.price | simplifyPrice
          }}</span>
          <span class="content-price">{{
            courseInfo.coin | translateCoinName
          }}</span>
        </p>
      </div>
    </div>
    <v-divider class="mb-5" style="width: 100%;"></v-divider>
    <!-- 總付費金額 -->
    <div class="total-price d-flex justify-space-between align-center">
      <p>{{ $t('purchaseDialog.shouldPay') }}</p>
      <p class="error--text" style="font-family: 'TC-bold';">
        <span class="mr-1 price-text">{{
          courseInfo.price | simplifyPrice
        }}</span>
        <span class="price-text">{{
          courseInfo.coin | translateCoinName
        }}</span>
      </p>
    </div>
    <v-btn
      width="100%"
      height="48"
      color="primary"
      elevation="0"
      class="default--text"
      @click="checkButtonOnclick"
    >
      {{ $t('base.confirm') }}
    </v-btn>
    <!-- close button -->
    <v-btn
      min-width="24"
      height="24"
      elevation="0"
      rounded
      absolute
      top
      right
      class="pa-0"
      style="background-color: #cccccc;"
      @click="closeButtonOnclick"
    >
      <v-icon dense color="gray">mdi-close</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
import { priceFilters, coinFilters } from '@/utils/mixins'
export default {
  props: {
    courseInfo: {
      type: Object,
      default() {
        return {
          id: null,
          is_bought: false,
          cate: '',
          type: 1,
          title: '',
          cover: '',
          describe: '',
          tags: '',
          duration: 0,
          price: '0',
          sections: 0,
          clicks: 0,
          status: 1,
          sort: 0,
          created_time: '2021-09-15T13:42:02.929437',
          updated_time: '2021-09-15T13:42:02.929459',
          user: null,
          coin: null,
        }
      },
    },
  },
  mixins: [priceFilters, coinFilters],
  methods: {
    checkButtonOnclick() {
      this.$emit('check-button-onclick')
    },
    closeButtonOnclick() {
      this.$emit('close-button-onclick')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.dialog-check {
  width: 600px !important;

  .dialog-title {
    font-family: 'TC-bold';
    font-size: 34px !important;
    line-height: 48px;
  }

  .dialog-content {
    width: 100%;

    .content-title {
      font-family: 'TC-bold';
      font-size: 24px;
      line-height: 32px;
    }

    .content-price {
      font-family: 'TC-bold';
    }
  }

  .total-price {
    width: 100%;
    margin-bottom: 112px;

    .price-text {
      font-size: 20px;
    }
  }
}
</style>
