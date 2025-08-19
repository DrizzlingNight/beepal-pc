<template>
  <div class="video-wrapper d-flex align-end rounded-lg">
    <!-- 影片播放器 -->
    <video
      @click="playButtonOnclick"
      @dblclick="fullscreenButtonOnclick"
      width="100%"
      class="video rounded-lg"
      :id="`video${lesson.id}`"
      preload="auto"
      :controls="isFullscreen"
      playsinline
    >
      <source :src="lesson.resource" type="video/mp4" />
      <source :src="lesson.resource" type="video/ogg" />
    </video>
    <!-- 撥放器介面 -->
    <div class="controls d-flex align-center px-5 pb-5">
      <v-btn
        width="52"
        height="52"
        color="gray_bright"
        small
        elevation="0"
        @click="playButtonOnclick"
        class="mr-6 rounded-lg"
      >
        <v-icon v-if="isPaused" class="gray_dark--text">mdi-play</v-icon>
        <v-icon v-else class="gray_dark--text">mdi-pause</v-icon>
      </v-btn>
      <v-slider
        @change="sliderOnchange"
        v-model="currentDuration"
        :max="lesson.duration"
        color="primary"
        class="slider"
      ></v-slider>
      <p class="time pl-6 default--text mr-5">
        {{ currentDuration | calculateDuration }}
      </p>
      <v-btn @click="shareButtonOnclick(lesson.id)" width="52" height="52" text icon elevation="0">
        <v-icon class="default--text">mdi-share</v-icon>
      </v-btn>
      <v-btn
        @click="fullscreenButtonOnclick"
        width="52"
        height="52"
        text
        icon
        elevation="0"
      >
        <v-icon class="default--text">mdi-fullscreen</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { durationFilters } from '@/utils/mixins'

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
    }
  },
  data() {
    return {
      isPaused: true,
      currentDuration: this.lesson.learn_progress.duration || 0,
      isFullscreen: false
    }
  },
  mixins: [durationFilters],
  methods: {

    // 按下播放鍵
    playButtonOnclick() {
      // 全屏狀態下播放器有自己的暫停功能，所以全屏狀態下要return掉避免重複觸發
      if (this.isFullscreen) {
        return
      }
      const video = document.querySelector(`#video${this.lesson.id}`)

      console.log('current video duration: ', video.currentTime)
      
      if (this.isPaused) {
        video.play()
        this.isPaused = false
      } else {
        video.pause()
        this.isPaused = true
      }
    },

    // 從 video 轉換當前時間到 progress bar
    sliderOnchange() {
      const video = document.querySelector(`#video${this.lesson.id}`)

      video.currentTime = this.currentDuration
    },

    // 展開為全螢幕
    fullscreenButtonOnclick() {
      const video = document.querySelector(`#video${this.lesson.id}`)

      video.requestFullscreen()
    },

    // 打包一個關閉時向父層傳送 data 的動作
    onLessonPause() {
      const data = {
        lessonId: this.lesson.id,
        currentDuration: this.currentDuration,
      }
      console.log('章節暫停了')
      this.$emit('on-lesson-pause', data)
    },

    // 分享被點按
    shareButtonOnclick(lessonId) {
      this.$emit('share-button-onclick', lessonId)
    }

  },
  mounted() {

    const video = document.querySelector(`#video${this.lesson.id}`)

    // 渲染完成時先觸發一次進度條移動事件，讓播放器同步
    this.sliderOnchange()

    // 動態同步內鍵撥放器進度條
    video.addEventListener('timeupdate', () => {
      this.currentDuration = Math.floor(video.currentTime)
    })

    // 監聽播放器播放事件，同步isPaused資料
    video.addEventListener('play', () => {
      this.isPaused = false
    })

    // 監聽撥放器暫停(結束時暫停事件)
    video.addEventListener('pause', () => {
      this.isPaused = true
      this.onLessonPause()
    })

    // 監聽播放器全屏變動事件
    const fullscreenEvents = ['webkitfullscreenchange', 'mozfullscreenchange', 'fullscreenchange']
    fullscreenEvents.forEach(evt => {
      video.addEventListener(evt, () => {
        const state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
        if (state) {
          this.isFullscreen = true
        } else {
          this.isFullscreen = false
        }
      })
    })

    // TODO SAFARI HANDLER (IOS 明文規定禁止透過使用者點擊以外的方式觸發播放等功能，因此需要透過呼叫點擊來實現)
    if (navigator.userAgent.indexOf('Chrome') == -1 && navigator.userAgent.indexOf('Firefox') == -1) {
      video.click()

      video.addEventListener('loadeddata', () => {
        video.currentTime = this.lesson.learn_progress.duration
        video.pause()
      })
    }

  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.video-wrapper {
  position: relative;
  width: 100%;
  // height: auto;
  position: relative;
  overflow: hidden;

  .controls {
    position: absolute;
    width: 100%;
    bottom: 0px;
    background-color: transparent;
    opacity: 0;
    transition: background-color 0.3s;
    transition: opacity 0.3s;

    &::before {
      content: '';
      display: block;
      position: absolute;
      z-index: 0;
      left: 0px;
      bottom: 0px;
      // opacity: 0;
      width: 100%;
      height: calc(100% + 20px);
      background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(black, 0.3) 50%,
        rgba(black, 0.8) 90%
      );
      transition: opacity 0.3s;
    }
  }

  &:hover .controls {
    opacity: 1 !important;
  }
  // &:hover .controls::before {
  //     opacity: 1 !important;
  // }

  .slider {
    ::v-deep .v-input__slot {
      margin-bottom: 0px;

      .v-slider {
        .v-slider__track-container {
          height: 6px;
          border-radius: 4px;
          overflow: hidden;

          .v-slider__track-fill {
            background-color: #ffe183 !important;
          }
          .v-slider__track-background {
            background-color: rgba(255, 255, 255, 0.39) !important;
          }
        }

        .v-slider__thumb-container {
          .v-slider__thumb {
            width: 18px;
            height: 18px;

            &::before {
              display: none;
            }
          }
        }
      }
    }

    ::v-deep .v-messages {
      display: none;
    }
  }

  .time {
    font-size: 28px;
    z-index: 1;
  }
}
</style>
