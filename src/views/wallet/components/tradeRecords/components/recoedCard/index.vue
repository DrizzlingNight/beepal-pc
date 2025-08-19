<template>
  <v-card flat outlined height="100" class="pa-4 mb-3">
    <div class="subjects d-flex mb-3">
      <div v-if="record.type == 1" class="subject type trans-out d-flex align-center">
        <v-img max-width="18" height="18" src="./imgs/trans_in.png" class="mr-2"></v-img>
        <span>{{ $t('tradeRecords.transIn') }}</span>
      </div>
      <div v-if="record.type == 2" class="subject type trans-in d-flex align-center">
        <v-img max-width="18" height="18" src="./imgs/trans_out.png" class="mr-2"></v-img>
        <span>{{ $t('tradeRecords.transOut') }}</span>
      </div>
      <div class="subject fee">{{ $t('tradeRecords.fee') }}</div>
      <div class="subject time">{{ $t('tradeRecords.time') }}</div>
      <div class="subject status">{{ $t('tradeRecords.status') }}</div>
      <div class="subject address">{{ $t('tradeRecords.address') }}</div>
    </div>
    <div class="contents d-flex">
      <div class="content type">{{ record.amount | simplifyPrice }} {{ record.coin | translateCoinName }}</div>
      <div class="content fee">{{ record.fee_amount | simplifyPrice }} USDT</div>
      <div class="content time">
        <p class="mb-1">{{ record.created_time | getDateFromTimeString }}</p>
        <p>{{ record.created_time | getTimeFromTimeString }}</p>
      </div>
      <div v-if="record.status == 1" class="content status processing">{{ $t('tradeRecords.processing') }}</div>
      <div v-if="record.status == 2" class="content status completed">{{ $t('tradeRecords.completed') }}</div>
      <div v-if="record.status == 3" class="content status failed">{{ $t('tradeRecords.failed') }}</div>
      <div v-if="record.status == 4" class="content status expired">{{ $t('tradeRecords.expired') }}</div>
      <div class="content address">{{ record.source_address }}</div>
    </div>
  </v-card>
</template>

<script>
import { priceFilters, coinFilters, dateFilters } from '@/utils/mixins'

export default {
  name: 'RecordCard',
  props: {
    record: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mixins: [priceFilters, coinFilters, dateFilters],
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.subjects {
  width: 100%;
  .subject {
    width: 20%;
    color: $gray_light;

    &.type.trans-in {
      color: #5287E0;
    }
    &.type.trans-out {
      color: #0FA94A;
    }
  }
}

.contents {
  width: 100%;
  .content {
    width: 20%;
    line-height: 14px;

    &.status.processing {
      color: #5287E0;
    }
    &.status.completed {
      color: #0FA94A;
    }
    &.status.failed {
      color: $error;
    }
    &.status.expired {
      color: $primary;
    }

    &.address {
      max-width: 200px;
    }
  }
}

</style>