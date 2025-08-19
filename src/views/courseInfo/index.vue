<template>
  <div class="course-info-wrapper">
    <div class="path d-flex align-center gray_light--text">
      <router-link to="/wallet?tab=3" class="gray_light--text px-1">{{
        $t('courseInfo.nav_1')
      }}</router-link
      >/<span class="px-1">{{ $t('courseInfo.nav_2') }}</span>
    </div>
    <div class="course-info d-flex mb-10">
      <v-img
        max-width="550px"
        height="100%"
        :src="courseInfo.cover"
        style="background: gray;"
        class="mr-9"
      ></v-img>
      <div
        class="course-info-content d-flex flex-column justify-space-between py-3"
      >
        <div class="content-text gray--text">
          <p class="info-title mb-6 gray_dark--text">{{ courseInfo.title }}</p>
          <p class="mb-6 d-flex">
            <span class="mr-4">{{ $t('courseInfo.description') }}:</span>
            <span class="info-describe">{{ courseInfo.tags }}</span>
          </p>
          <p class="mb-6">
            <span class="mr-4">{{ $t('courseInfo.duration') }}:</span>
            <span class="mr-2"
              >{{ courseInfo.sections
              }}{{ $t('courseInfo.lessonAmount') }}</span
            >
            <span
              >{{ courseInfo.duration | calculateDurationToHours
              }}{{ $t('courseInfo.hour') }}</span
            >
          </p>
          <p class="mb-7">
            <span class="mr-4">{{ $t('courseInfo.type') }}:</span>
            <span v-if="courseInfo.type === 0">{{
              $t('courseInfo.type_0')
            }}</span>
            <span v-else-if="courseInfo.type === 1">{{
              $t('courseInfo.type_1')
            }}</span>
            <span v-else-if="courseInfo.type === 2">{{
              $t('courseInfo.type_2')
            }}</span>
            <span v-else>{{ $t('courseInfo.type_3') }}</span>
          </p>
          <p>
            <span class="mr-4">{{ $t('courseInfo.price') }}:</span>
            <span
              class="error--text"
              style="font-family: 'TC-bold'; font-size: 18px;"
            >
              {{ courseInfo.price | simplifyPrice }}
              {{ courseInfo.coin | translateCoinName }}
            </span>
          </p>
        </div>
        <!-- 購買按鈕, 購買對話框 -->
        <PurchaseDialog :course-info="courseInfo" />
      </div>
      <ShareDialog :course-info="courseInfo" />
    </div>
    <v-card width="100%" class="lessons-wrapper px-8 pt-10">
      <p class="lessons-title mb-10">{{ $t('courseInfo.lessonContents') }}</p>
      <Loading v-if="isLoading" />
      <SpecialStatus v-if="!lessons.length && !isLoading" :status-code="1" />
      <v-card
        v-for="lesson in lessons"
        :key="lesson.id"
        outlined
        height="100"
        class="lesson-card mb-5 pl-5 pr-17 d-flex justify-space-between align-center rounded-lg"
      >
        <div class="lesson-text d-flex align-center">
          <!-- 章節標題 icon 條件渲染 -->
          <v-icon
            v-if="lesson.type === 1"
            style="background-color: #f7f7f7;"
            width="38"
            height="38"
            class="rounded-circle mr-3 pa-2"
            >mdi-text-box-multiple-outline</v-icon
          >
          <v-icon
            v-else-if="lesson.type === 2"
            style="background-color: #f7f7f7;"
            width="38"
            height="38"
            class="rounded-circle mr-3 pa-2"
            >mdi-video-outline</v-icon
          >
          <v-icon
            v-else-if="lesson.type === 3"
            style="background-color: #f7f7f7;"
            width="38"
            height="38"
            size="20"
            class="rounded-circle mr-3 pa-2"
            >mdi-music</v-icon
          >
          <!-- 章節標題 -->
          <span class="lesson-title" style="font-size: 22px">{{ lesson.title }}</span>
        </div>
        <v-btn
          v-if="lesson.learn_progress.status === 0"
          elevation="0"
          width="96"
          height="32"
          :disabled="!courseInfo.is_bought"
          :to="`/courses/${courseInfo.id}?lesson=${lesson.id}`"
          class="lesson-btn not-learned default--text"
          >{{ $t('courseInfo.learnProgress_0') }}</v-btn
        >
        <v-btn
          v-else-if="lesson.learn_progress.status === 1"
          elevation="0"
          width="96"
          height="32"
          :disabled="!courseInfo.is_bought"
          :to="`/courses/${courseInfo.id}?lesson=${lesson.id}`"
          class="lesson-btn learning default--text"
          >{{ $t('courseInfo.learnProgress_1') }}</v-btn
        >
        <v-btn
          v-else-if="lesson.learn_progress.status === 2"
          elevation="0"
          width="96"
          height="32"
          :disabled="!courseInfo.is_bought"
          :to="`/courses/${courseInfo.id}?lesson=${lesson.id}`"
          class="lesson-btn learned gray_light--text"
          >{{ $t('courseInfo.learnProgress_2') }}</v-btn
        >
      </v-card>
    </v-card>
  </div>
</template>

<script>
import PurchaseDialog from './components/purchaseDialog'
import ShareDialog from '@/components/dialogs/shareDialog'

import Loading from '@/components/loading'
import SpecialStatus from '@/components/specialStatus'

import { durationFilters, priceFilters, coinFilters } from '@/utils/mixins'

export default {
  name: 'CourseInfo',
  components: {
    PurchaseDialog,
    ShareDialog,
    Loading,
    SpecialStatus,
  },
  data() {
    return {
      courseInfo: {
        is_bought: true,
        price: 0,
      },
      lessons: [],
      purchaseDialog: false,
      isLoading: true,
    }
  },
  mixins: [durationFilters, priceFilters, coinFilters],
  methods: {
    async getCourseInit(courseId) {
      try {
        const res = await this.$request({
          url: `/subject/${courseId}/`,
          method: 'get',
        })
        this.courseInfo = res
      } catch (err) {
        console.log(err)
      }
    },
    async getLessonsInit(courseId) {
      try {
        const res = await this.$request({
          url: '/subject/section/',
          params: { subject: courseId },
        })
        this.lessons = res.results
        this.isLoading = false
      } catch (err) {
        console.log(err)
        this.isLoading = false
      }
    },
  },
  created() {
    // 從 router params 取得 課程 id
    const courseId = this.$route.params.id

    this.getCourseInit(courseId)
    this.getLessonsInit(courseId)
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.course-info-wrapper {
  width: 1200px;
  margin: 0 auto;

  .path {
    height: 65px;
  }

  .course-info {
    width: 100%;
    height: 312px;
    position: relative;

    .info-title {
      font-size: 24px;
      font-family: 'TC-bold';
      line-height: 33px;
    }
    .info-describe {
      display: block;
      max-width: 400px;
    }
  }

  .lessons-wrapper {
    padding-bottom: 150px;
    margin-bottom: 180px;
    .lessons-title {
      font-family: 'TC-bold';
      font-size: 20px;
      line-height: 28px;
    }
    .lesson-card {
      padding: 0px 68px 0px 20px !important;

      &:hover {
        border-color: $primary;
        background-color: rgba($color: #ffc100, $alpha: 0.1);
      }

      .lesson-title {
        width: 540px;
        line-height: 22px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .lesson-btn {
        &.not-learned {
          background: linear-gradient(45deg, #28dfce 0%, #10c43f 100%);
        }

        &.learning {
          background: $primary;
        }

        &.learned {
          background: linear-gradient(315deg, #eeeeee 0%, #cacaca 100%);
        }

        &.v-btn--disabled {
          background: none;
        }
      }
    }
  }
}
</style>
