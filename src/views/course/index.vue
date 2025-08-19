<template>
  <div class="course-wrapper">
    <div class="path d-flex align-center gray_light--text">
      <router-link
        :to="{ name: 'Wallet', query: { tab: '3' } }"
        class="gray_light--text px-1"
        >{{ $t('course.nav_1') }}</router-link
      >
      /<router-link
        :to="{ name: 'CourseInfo', params: { id: this.$route.params.id } }"
        class="gray_light--text px-1"
        >{{ $t('course.nav_2') }}</router-link
      >
      /<span class="px-1">{{ $t('course.nav_3') }}</span>
    </div>
    <v-card width="1200" flat class="pt-4 px-5 lessons-outer-wrapper">
      <SpecialStatus v-if="!lessons.length && !isLoading" :status-code="1" />
      <v-expansion-panels
        v-model="activePanel"
        accordion
        class="lessons-wrapper"
      >
        <Loading v-if="isLoading" />
        <v-expansion-panel
          v-for="lesson in lessons"
          :key="lesson.id"
          class="lesson mb-5 rounded-lg"
          active-class="lesson-active"
        >
          <!-- 章節標頭 -->
          <v-expansion-panel-header
            @click="pauseAllPlayer"
            :id="`panelHeader${lesson.id}`"
            hide-actions
            class="lesson-header px-7 rounded-lg d-flex justify-space-between"
          >
            <!-- 標題 -->
            <div class="lesson-title d-flex align-center">
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
                v-if="lesson.type === 3"
                style="background-color: #f7f7f7;"
                width="38"
                height="38"
                size="20"
                class="rounded-circle mr-3 pa-2"
                >mdi-music</v-icon
              >
              <span style="font-size: 22px">{{ lesson.title }}</span>
            </div>
            <!-- 時長與操作 -->
            <div class="lesson-actions d-flex align-center justify-end">
              <p class="lesson-duration">
                {{ $t('course.lessonDuration') }}:
                {{ lesson.duration | calculateDuration }}
              </p>
              <div class="buttons-wrapper">
                <v-btn
                  @click.stop="shareButtonOnclick(lesson.id)"
                  width="96"
                  height="32"
                  outlined
                  elevation="0"
                  class="mr-5 btn-share rounded-lg"
                  >{{ $t('courseInfo.share') }}</v-btn
                >
                <!-- 三種狀態的學習標籤 -->
                <v-btn
                  v-if="lesson.learn_progress.status === 0"
                  width="96"
                  height="32"
                  elevation="0"
                  class="btn-learn not-learned rounded-lg default--text"
                  >{{ $t('courseInfo.learnProgress_0') }}</v-btn
                >
                <v-btn
                  v-else-if="lesson.learn_progress.status === 1"
                  width="96"
                  height="32"
                  elevation="0"
                  class="btn-learn learning rounded-lg default--text"
                  >{{ $t('courseInfo.learnProgress_1') }}</v-btn
                >
                <v-btn
                  v-else
                  width="96"
                  height="32"
                  elevation="0"
                  class="btn-learn learned rounded-lg gray_light--text"
                  >{{ $t('courseInfo.learnProgress_2') }}</v-btn
                >
              </div>
            </div>
          </v-expansion-panel-header>
          <!-- 章節內容 -->
          <!-- 邏輯簡要: 透過章節子元件監聽暫停是件，當暫停時觸發學習進度改變並向後端儲存進度與狀態 -->
          <v-expansion-panel-content class="lesson-content">
            <LessonText
              :lesson="lesson"
              v-if="lesson.type === 1"
              @close-button-onclick="closeAllPanel"
              @on-lesson-pause="onLessonPause"
              @share-button-onclick="shareButtonOnclick(lesson.id)"
            />

            <LessonVideo
              :lesson="lesson"
              v-else-if="lesson.type === 2"
              @on-lesson-pause="onLessonPause"
              @share-button-onclick="shareButtonOnclick(lesson.id)"
            />

            <LessonAudio
              :lesson="lesson"
              v-else-if="lesson.type === 3"
              @on-lesson-pause="onLessonPause"
              @share-button-onclick="shareButtonOnclick(lesson.id)"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <ShareDialog
      :sharing-lesson-id="sharingLessonId"
      :sharing-lesson="sharingLesson"
      :courseInfo="courseInfo"
      :is-share-dialog-open="isShareDialogOpen"
      @share-dialog-close="isShareDialogOpen = false"
    />
  </div>
</template>

<script>
import LessonText from './components/lessonText'
import LessonVideo from './components/lessonVideo'
import LessonAudio from './components/lessonAudio'
import ShareDialog from '@/components/dialogs/shareDialog'

import Loading from '@/components/loading'
import SpecialStatus from '@/components/specialStatus'

import { durationFilters } from '@/utils/mixins'

export default {
  name: 'course',
  components: {
    LessonText,
    LessonVideo,
    LessonAudio,
    ShareDialog,
    Loading,
    SpecialStatus,
  },
  data() {
    return {
      lessons: [],
      courseInfo: {},
      isShareDialogOpen: false,
      sharingLessonId: null,
      sharingLesson: {},
      isLoading: true,
      activePanel: null,
    }
  },
  mixins: [durationFilters],
  methods: {

    // 文本章節收起點按觸發關閉全部 panel(因為一次只能開一個，其實就是關掉文本章節本人的意思)
    closeAllPanel() {
      this.activePanel = null
    },

    // 當章節暫停時觸發
    onLessonPause(data) {
      const { lessonId, currentDuration } = data
      const lesson = this.lessons.find(lesson => lesson.id === lessonId)

      // 當已經完成章節，不做任何動作
      if (lesson.learn_progress.status === 2) {
        return
      }
      // 當章節為文本，狀態直接完成，向後端紀錄資料並return掉
      if (lesson.type === 1) {
        lesson.learn_progress.status = 2
        this.saveLessonLearningProgress({
          section: lessonId,
          duration: currentDuration,
        })
        return
      }
      // 當進度完成時，完成狀態
      if (currentDuration === lesson.duration) {
        lesson.learn_progress.status = 2
      } else {
        // 當進度沒有完成時，進行狀態
        lesson.learn_progress.status = 1
      }
      // 同步本地 lesson 的進度資料
      lesson.learn_progress.duration = currentDuration
      // 向後端保存當前進度
      this.saveLessonLearningProgress({
        section: lessonId,
        duration: currentDuration,
      })
    },

    // 暫停全部播放中內容
    pauseAllPlayer() {
      const audios = document.querySelectorAll('.audio')
      const videos = document.querySelectorAll('.video')
      audios.forEach(audio => {
        audio.pause()
      })
      videos.forEach(video => {
        video.pause()
      })
    },

    // 向後端紀錄章節學習進度
    async saveLessonLearningProgress(data) {
      try {
        const res = await this.$request({
          url: '/subject/section/learn/',
          method: 'post',
          data: this.$qs.stringify(data),
        })
        console.log('已保存章節資料', res)
      } catch (err) {
        console.log(err.message)
      }
    },

    // 取得此課程章節資料
    async getLessonsInit(courseId) {
      try {
        const res = await this.$request({
          url: '/subject/section/',
          method: 'get',
          params: { subject: courseId },
        })
        this.lessons = [...res.results]

        // 如果路由有傳入開啟指定章節
        const lessonId = this.$route.query.lesson
        if (lessonId) {
          console.log('打開指定章節: ', lessonId)
          this.openTargetPanel(lessonId)

          // 調整視窗到章節位置
          setTimeout(() => {
            const targetLessonElement = document.querySelector(
              `#panelHeader${lessonId}`
            )
            console.log(targetLessonElement)
            this.scrollToElement(targetLessonElement)
          }, 500)
        }

        this.isLoading = false
      } catch (err) {
        console.log(err)
        this.isLoading = false
      }
    },

    // 取得課程資料
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

    // 打開指定章節 panel
    openTargetPanel(lessonId) {
      const targetPanel = this.lessons.findIndex(
        lesson => lesson.id == lessonId
      )
      this.activePanel = targetPanel
    },

    // 滑動到指定章節位置
    scrollToElement(element) {
      const positionY = element.getBoundingClientRect().top
      console.log('positionY: ', positionY)
      window.scroll({
        top: positionY - 100,
        left: 0,
        behavior: 'smooth',
      })
    },

    // 判斷使用者是否使用適合的瀏覽器
    isBrowserFit() {
      return (
        navigator.userAgent.indexOf('Chrome') != -1 ||
        navigator.userAgent.indexOf('Firefox') != -1
      )
    },

    // 分享 被點按時改變路由並打開分享頁面
    shareButtonOnclick(lessonId) {
      this.sharingLessonId = lessonId
      this.isShareDialogOpen = true
    }
  },


  watch: {
    sharingLessonId(newVal) {
      this.sharingLesson = this.lessons.find(lesson => lesson.id === newVal)
    }
  },


  mounted() {
    // Safari 特例處理
    if (!this.isBrowserFit()) {
      console.log('the browser is Safari')
      this.$alert.toast.fire({
        icon: 'warning',
        title: this.$t('alert.safariSuggestion')
      })
      // TODO 目前課程章節再IOS系統下還有因擋無法播放問題，故先跳alert建議使用者轉往其他瀏覽器
    }
  },


  created() {
    const courseId = this.$route.params.id
    this.getLessonsInit(courseId)
    this.getCourseInit(courseId)
  },

  beforeDestroy() {
    // 離開頁面前暫停所有播放內容，以觸發紀錄資料到後端
    this.pauseAllPlayer()
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.course-wrapper {
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 112px;

  .path {
    height: 64px;
  }

  .lessons-outer-wrapper {
    padding-bottom: 76px;

    .lessons-wrapper {
      .lesson {
        border: 2px solid #e3e4e7;

        &.v-expansion-panel::before {
          display: none;
        }
        .lesson-header {
          width: 100%;
          height: 100px;

          .lesson-title {
            span {
              width: 540px;
              line-height: 22px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }

          .buttons-wrapper {
            margin-left: 100px;

            .btn-share {
              border-color: $gray_bright;
            }

            .btn-learn {
              &.not-learned {
                background: linear-gradient(32deg, #10c43f 0%, #28dfce 100%);
              }
              &.learning {
                background: $primary;
              }
              &.learned {
                background: linear-gradient(315deg, #eeeeee 0%, #cacaca 100%);
              }
            }
          }
        }

        .lesson-content {
          ::v-deep .v-expansion-panel-content__wrap {
            padding: 0px !important;
          }
        }

        &.v-expansion-panel::after {
          border-color: transparent;
        }
      }

      // 展開狀態
      .lesson-active {
        // border-color: $primary !important;
        // background-color: rgba($color: #ffc100, $alpha: .1);

        .lesson-title {
          font-family: 'TC-bold';
        }
        .lesson-actions {
          display: none !important;
        }
      }
    }
  }
}
</style>
