<template>
  <v-card width="364" height="214" rounded="lg" outlined class="prop-card d-flex flex-column justify-space-between pt-6 px-5 pb-5 mb-5">
    <div class="prop-card-content">
      <div class="prop-card-content-title d-flex justify-space-between align-center mb-7">
        <div class="title-left d-flex align-center">
          <v-img max-width="40" height="40" contain :src="require(`@/assets/imgs/coins/coin_${balance.coin}.png`)" color="gray" class="coin-img mr-4"></v-img>
          <span>{{ balance.coin | translateCoinName }}</span>
        </div>
        <div class="title-right">{{ $t(`coins.coin_${balance.coin}`) }}</div>
      </div>
      <p v-if="isPropertySeeable" class="coin-amount mb-1">{{ balance.amount | simplifyPrice | toLocaleString }}</p>
      <p v-else class="coin-amount mb-1">&#10033;&#10033;&#10033;&#10033;&#10033;&#10033;</p>
      <p v-if="isPropertySeeable" class="coin-value gray_light--text">
        <span v-if="balance.ratio">${{ balance.ratio * balance.amount | toFixedNumber }}</span>
        <span v-else>$ -</span>
      </p>
      <p v-else class="coin-value gray_light--text">$&#10033;&#10033;&#10033;&#10033;&#10033;&#10033;</p>
    </div>
    <div class="prop-card-actions d-flex justify-space-between">
      <v-btn width="152" height="30" elevation="0" :disabled="isActionNotReady" class="action trans-in">{{ $t('property.transferIn') }}</v-btn>
      <v-btn width="152" height="30" elevation="0" :disabled="isActionNotReady" class="action trans-out">{{ $t('property.transferOut') }}</v-btn>
    </div>
  </v-card>
</template>

<script>
import { priceFilters, coinFilters } from '@/utils/mixins'

export default {
  props: {
    isPropertySeeable: {
      type: Boolean,
      default: false
    },
    balance: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isActionNotReady: true,
    }
  },
  mixins: [priceFilters, coinFilters]
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.prop-card {

    .coin-amount {
      font-size: 22px;
      line-height: 24px;
      font-family: 'TC-bold';
    }

    .prop-card-actions {
      .action {
        background: $default;
        &.trans-in {
          border: 1px solid #20A763;
          // background: linear-gradient(45deg, #28DFCE 0%, #10C43F 100%);
        }
        &.trans-out {
          border: 1px solid #166AFA;
          // background: #347FFF;
        }
      }
    }
  

  &:hover {
    
    outline: 2px solid $primary;

    .prop-card-actions {
      .action {
        color: $default;
        // V1 還沒有功能所以先沒有效果
        // &.trans-in {
        //   border: none;
        //   background: linear-gradient(45deg, #28DFCE 0%, #10C43F 100%);
        // }
        // &.trans-out {
        //   border: none;
        //   background: #347FFF;
        // }
      }
    }
  }
}
</style>