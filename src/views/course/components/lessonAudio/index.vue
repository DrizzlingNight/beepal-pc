<template>
  <div min-height="100" flat outlined class="px-7 pb-11">
    <!-- 隱藏播放器 -->
    <audio
      class="audio"
      :id="`audio${lesson.id}`"
      preload="auto"
      controls
      playsinline
    >
      <source :src="lesson.resource" type="audio/ogg" />
      <source :src="lesson.resource" type="audio/mp3" />
    </audio>
    <!-- 撥放器介面 -->
    <div class="controls d-flex align-center">
      <v-btn
        width="52"
        height="52"
        text
        icon
        elevation="0"
        @click="playButtonOnclick"
        class="mr-6"
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
      <p class="time pl-6 gray--text mr-5">
        {{ currentDuration | calculateDuration }}
      </p>
      <v-btn @click="shareButtonOnclick(lesson.id)" width="52" height="52" text icon elevation="0">
        <v-icon>mdi-share</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { durationFilters } from '@/utils/mixins'

export default {
  name: 'LessonAudio',
  props: {
    lesson: {
      type: Object,
      default() {
        return {
          id: 0,
          content: '',
          title: '',
          type: 3,
          resource: '',
          is_free: true,
          status: 0,
          sort: -2147483648,
          clicks: -2147483648,
          comments: -2147483648,
          duration: '00:32:32',
          created_time: '2019-08-24T14:15:22Z',
          updated_time: '2019-08-24T14:15:22Z',
          subject: 0,
        }
      },
    }
  },
  data() {
    return {
      isPaused: true,
      currentDuration: this.lesson.learn_progress.duration || 0,
    }
  },
  mixins: [durationFilters],
  methods: {

    // 按下播放鍵
    playButtonOnclick() {
      const audio = document.querySelector(`#audio${this.lesson.id}`)

      if (this.isPaused) {
        audio.play()
        this.isPaused = false
      } else {
        audio.pause()
        this.isPaused = true
      }
    },

    // 從 audio 轉換當前時間到 progress bar
    sliderOnchange() {
      const audio = document.querySelector(`#audio${this.lesson.id}`)

      audio.currentTime = this.currentDuration
    },

    // 打包一個關閉時向父層傳送 data 的動作
    onLessonPause() {
      const data = {
        lessonId: this.lesson.id,
        currentDuration: this.currentDuration,
      }
      this.$emit('on-lesson-pause', data)
    },

    // 分享被點按
    shareButtonOnclick(lessonId) {
      this.$emit('share-button-onclick', lessonId)
    }

  },
  mounted() {

    const audio = document.querySelector(`#audio${this.lesson.id}`)

    // 渲染完成時先觸發一次進度條移動事件，讓播放器同步
    this.sliderOnchange()
    // 動態同步內鍵撥放器進度條
    audio.addEventListener('timeupdate', () => {
      this.currentDuration = Math.floor(audio.currentTime)
    })

    // 監聽播放器播放事件
    audio.addEventListener('play', () => {
      this.isPaused = false
    })

    // 監聽撥放器暫停(結束時暫停事件)
    audio.addEventListener('pause', () => {
      this.isPaused = true
      this.onLessonPause()
    })

    // TODO SAFARI HANDLER (IOS 明文規定禁止透過使用者點擊以外的方式觸發播放等功能，因此需要透過呼叫點擊來實現)
    if (navigator.userAgent.indexOf('Chrome') == -1 && navigator.userAgent.indexOf('Firefox') == -1) {
      // 觸發點擊播放讓 safari audio 開始載入資源
      // ...還沒想好怎麼實現

      audio.addEventListener('loadeddata', () => {
        audio.currentTime = this.lesson.learn_progress.duration
        audio.pause()
      })
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.audio {
  display: none;
}

.slider {
  // width: ;

  ::v-deep .v-input__slot {
    margin-bottom: 0px;

    .v-slider {
      .v-slider__track-container {
        height: 8px;
        border-radius: 4px;
        overflow: hidden;

        .v-slider__track-fill {
          background-color: #ffe183 !important;
        }
        .v-slider__track-background {
          background-color: $gray_light !important;
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
}
</style>
