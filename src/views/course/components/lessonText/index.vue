<template>
  <div class="text-wrapper px-7 ">
    <p class="text-content mb-8">
      {{ lesson.content }}
    </p>
    <div class="actions d-flex justify-space-between mb-4">
      <v-btn text @click="closeButtonOnclick" class="btn-wrap primary--text pa-0"
        >收起</v-btn
      >
      <v-btn @click="shareButtonOnclick(lesson.id)" text icon class="btn-share"
        ><v-icon x-large class="primary--text">mdi-share-outline</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lesson: {
      type: Object,
      default() {
        return {
          id: null,
          content: '',
          title: '',
          type: 3,
          resource: '',
          duration: 0,
          is_free: false,
          status: 1,
          sort: 4,
          clicks: 0,
          comments: 0,
          created_time: '',
          updated_time: '',
          subject: 1,
        }
      },
    },
  },
  methods: {
    closeButtonOnclick() {
      this.$emit('close-button-onclick')
    },
    // 打包一個向父層傳送 data 的動作
    onLessonPause() {
      const data = {
        lessonId: this.lesson.id,
        currentDuration: this.currentDuration || 0,
      }
      this.$emit('on-lesson-pause', data)
    },
    // 分享被點按
    shareButtonOnclick(lessonId) {
      this.$emit('share-button-onclick', lessonId)
    }
  },
  // 一但文本章節被開啟，就直接傳送資料向後端紀錄
  created() {
    this.onLessonPause()
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.text-wrapper {
  .text-content {
    font-size: 24px;
    line-height: 40px;
    white-space: pre-line;
  }

  .actions {
    .btn-wrap {
      ::v-deep .v-btn__content {
        font-size: 24px !important;
      }
    }
  }
}
</style>
