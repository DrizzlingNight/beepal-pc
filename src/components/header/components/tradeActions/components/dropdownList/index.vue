<template>
  <v-list class="list">
    <v-list-item :to="actionType ? `/sell/${coin}` : `/buy/${coin}`" class="list-item pa-0" v-for="coin in coins" :key="coin">
      <v-list-item-title class="d-flex justify-space-between align-center pa-5">
        <div class="content-wrapper d-flex align-center">
          <v-img width="52" height="52" :src="require(`@/assets/imgs/coins/coin_${coin}.png`)" class="mr-4"></v-img>
          <div class="content-text d-flex flex-column justify-space-between">
            <p class="content-text-title">
              <span v-if="actionType == 0">{{ $t('trade.buy') }}</span>
              <span v-else>{{ $t('trade.sell') }}</span>
              <span>{{ $t(`coins.coin_${coin}`) }}</span>
            </p>
            <p class="content-text-description gray--text">
              <span>{{ $t('header.search') }}</span>
              <span v-if="actionType == 0" >{{ $t('trade.buy') }}</span>
              <span>{{ $t(`coins.coin_${coin}`) }}</span>
              <span>{{ $t('header.price') }}</span>
            </p>
          </div>
        </div>
        <v-icon size="40">mdi-chevron-right</v-icon>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
import { coinFilters } from '@/utils/mixins'

export default {
  name: 'DropdownList',
  props: {
    actionType: {
      type: Number,
      default: 0 // 0 = 購買 , 1 = 出售
    }
  },
  data() {
    return {
      coins: [4, 9, 8]
    }
  },
  mixins: [coinFilters]
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.list {
  margin-top: 8px;
  border-radius: 4px !important;
}

.list-item {
  width: 456px;
  cursor: pointer;

  .content-wrapper {
    
    .content-text {
      height: 52px;
      
      .content-text-title {
        font-size: 18px;
        font-family: 'TC-bold';
        line-height: 24px;

        span {
          font-size: 18px;
          font-family: 'TC-bold';
        }
      }

      .content-text-description span {
        font-size: 16px;
        line-height: 22px;
      }
    }
  }
}

</style>