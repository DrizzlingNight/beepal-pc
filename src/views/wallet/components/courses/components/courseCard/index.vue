<template>
  <v-card width="360" flat color="gray_bright" class="course-card rounded-lg">
    <v-img
      :src="courseData.cover"
      width="360"
      height="172"
      style="background-color: #333333;"
    ></v-img>
    <div class="pt-4 pb-3">
      <v-card-title class="card-title pa-0 mb-2 d-flex align-center">
        <span class="card-title-text pl-4">{{ courseData.title }}</span>
      </v-card-title>
      <div class="px-4 gray_light--text mb-3">
        <p>
          <span class="mr-1">{{ $t('courseInfo.type') }}:</span>
          <span v-if="courseData.type === 0" class="mr-3">{{
            $t('courseInfo.type_0')
          }}</span>
          <span v-else-if="courseData.type === 1" class="mr-3">{{
            $t('courseInfo.type_1')
          }}</span>
          <span v-else-if="courseData.type === 2" class="mr-3">{{
            $t('courseInfo.type_2')
          }}</span>
          <span v-else-if="courseData.type === 3" class="mr-3">{{
            $t('courseInfo.type_3')
          }}</span>
          <span>{{ courseData.tags }}</span>
        </p>
      </div>
      <div class="gray_light--text px-4 mb-2">
        <span class="primary--text">{{ courseData.sections }}</span>
        <span class="mr-1">{{ $t('courseInfo.lessonAmount') }}</span>
        <span class="primary--text">{{
          courseData.duration | calculateDurationToHours
        }}</span>
        <span class="mr-1">{{ $t('courseInfo.hour') }}</span>
      </div>
      <div class="px-4 d-flex justify-space-between align-center">
        <div class="course-price">
          <span class="error--text mr-1">{{
            courseData.price | simplifyPrice
          }}</span>
          <span class="error--text">{{
            courseData.coin | translateCoinName
          }}</span>
        </div>
        <v-btn
          elevation="0"
          v-if="courseData.is_bought"
          :to="`/courses/${courseData.id}`"
          class="card-btn card-btn-learn default--text"
          >{{ $t('courseInfo.learnProgress_0') }}</v-btn
        >
        <v-btn
          v-else
          elevation="0"
          :to="`/courses/${courseData.id}/info`"
          class="card-btn card-btn-purchase default--text"
          >{{ $t('trade.buy') }}</v-btn
        >
      </div>
    </div>
  </v-card>
</template>

<script>
import { durationFilters, priceFilters, coinFilters } from '@/utils/mixins'

export default {
  props: {
    courseData: {
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
  mixins: [durationFilters, priceFilters, coinFilters],
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.course-card {
  border: 1px solid $gray_bright !important;

  .card-title {
    position: relative;
    font-family: 'TC-bold';

    &::before {
      content: '';
      display: block;
      position: absolute;
      background: $primary;
      width: 2px;
      height: 20px;
    }

    .card-title-text {
      font-size: 20px;
      line-height: 28px;
    }
  }

  .course-price {
    font-family: 'TC-bold';
  }

  .card-btn {
    width: 90px;
    height: 32px;

    &.card-btn-learn {
      background: linear-gradient(45deg, #28dfce 0%, #10c43f 100%);
    }
    &.card-btn-purchase {
      background: $primary;
    }
  }
}
</style>
