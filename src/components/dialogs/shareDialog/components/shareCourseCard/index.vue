<template>
  <v-card
    width="100%"
    color="gray_bright"
    class="course-card rounded-lg mb-8"
  >
    <v-img
      :src="courseInfo.cover"
      width="100%"
      height="200"
      style="background-color: #333333;"
    ></v-img>
    <div class="pt-3 pb-4 pr-3">
      <v-card-title class="card-title pa-0 mb-1 d-flex align-center">
        <span v-if="sharingLessonId == -1" class="card-title-text mb-1 pl-4">{{ $t('courseInfo.shareCourse') }}: {{ courseInfo.title }}</span>
        <span v-else class="card-title-text mb-1 pl-4">{{ $t('courseInfo.shareLesson') }}: {{ sharingLesson.title }}</span>
      </v-card-title>
      <div class="divider-wrapper px-4 mb-3">
        <v-divider></v-divider>
      </div>
      <div class="course-title-wrapper px-4 mb-3">
        <p v-if="sharingLessonId != -1" class="course-title gray--text">{{ courseInfo.title }}</p>
      </div>
      <div class="px-4 gray_light--text mb-3 card-content">
        <p class="d-flex ">
          <span v-if="courseInfo.type === 0" class="mr-1 tags rounded-pill">{{
            $t('courseInfo.type_0')
          }}</span>
          <span v-else-if="courseInfo.type === 1" class="mr-1 tags rounded-pill">{{
            $t('courseInfo.type_1')
          }}</span>
          <span v-else-if="courseInfo.type === 2" class="mr-1 tags rounded-pill">{{
            $t('courseInfo.type_2')
          }}</span>
          <span v-else-if="courseInfo.type === 3" class="mr-1 tags rounded-pill">{{
            $t('courseInfo.type_3')
          }}</span>
          <!-- courseInfo.tags 轉 陣列 -->
          <span v-for="(tag, index) in splitString(courseInfo.tags, '，')" :key="index" class="mr-1 tags rounded-pill">{{ tag }}</span>
        </p>
      </div>
      <div
        class="gray_light--text px-4 d-flex justify-space-between align-center card-content"
      >
        <div class="">
          <span class="primary--text">{{ courseInfo.sections }}</span>
          <span class="mr-1">{{ $t('courseInfo.lessonAmount') }}</span>
          <span class="primary--text">{{
            courseInfo.duration | calculateDurationToHours
          }}</span>
          <span class="mr-1">{{ $t('courseInfo.hour') }}</span>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import { durationFilters, priceFilters, coinFilters } from '@/utils/mixins'

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
    sharingLesson: {
      type: Object,
      default() {
        return {}
      }
    },
    sharingLessonId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      isLesson: false
    }
  },
  methods: {
    splitString(string, separator) {
      return string.split(separator)
    }
  },
  mixins: [durationFilters, priceFilters, coinFilters],
  created() {
    // 透過路由判斷當前頁面是否為學習頁
    if (this.$route.name === 'Course') {
      this.isLesson = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.card-title-text {
  font-size: 24px;
  font-family: 'TC-bold';
  line-height: 36px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &::before {
    content: '';
    display: block;
    position: absolute;
    background: $primary;
    left: 0px;
    top: 0px;
    width: 2px;
    height: 36px;
  }
}

.course-title {
  font-size: 22px;
  line-height: 28px;
}

.card-content {

  span {
    font-size: 16px !important;
  
    &.tags {
      padding: 4px 10px;
      color: $primary;
      border: 1px solid rgba($color: $primary, $alpha: .5);
      background: rgba($color: $primary, $alpha: .15);
  }
  }

  &.course-price {
    font-family: 'TC-bold';
  }
}
</style>
