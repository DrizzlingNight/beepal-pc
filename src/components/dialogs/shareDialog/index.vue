<template>
  <v-dialog v-model="shareDialog" class="share-dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-show="sharingLessonId == -1"
        width="96"
        height="32"
        absolute
        elevation="0"
        class="gray--text share-trigger-btn rounded-lg"
        top
        right
        v-bind="attrs"
        v-on="on"
      >
        {{ $t('courseInfo.share') }}
      </v-btn>
    </template>
    <!-- 彈窗 -->
    <v-card width="550" class="rounded-lg px-10 pt-12 pb-11">
      <p
        v-if="sharingLessonId == -1"
        class="secondary--text share-title mb-5"
      >
        {{ $t('courseInfo.shareCourse') }}
      </p>
      <p
        v-else
        class="secondary--text share-title mb-7"
      >
        {{ $t('courseInfo.shareLesson') }}
      </p>
      <ShareCourseCard
        :course-info="courseInfo"
        :sharing-lesson-id="sharingLessonId"
        :sharing-lesson="sharingLesson"
      />
      <div class="btn-group d-flex justify-space-between mb-7">
        <div
          v-for="shareButton in shareButtons"
          :key="shareButton.id"
          class="button-wrapper d-flex flex-column align-center"
        >
          <v-btn
            @click="selectedButton = shareButton.id"
            min-width="44"
            height="44"
            elevation="0"
            rounded
            class="pa-0 mb-3 share telegram"
            :class="{ selected: selectedButton === shareButton.id }"
            :style="{
              'background-image':
                'url(' + require(`./imgs/${shareButton.name}.png`) + ')',
            }"
          >
          </v-btn>
          <p class="gray--text">{{ shareButton.name }}</p>
        </div>
      </div>
      <v-btn
        @click="shareButtonOnclick"
        width="100%"
        height="36"
        color="primary"
        elevation="0"
        class="default--text"
      >
        <span v-if="!isSharing">{{ $t('courseInfo.share') }}</span>
        <span v-else>{{ $t('courseInfo.sharing') }}</span>
      </v-btn>
      <!-- close button -->
      <v-btn
        min-width="28"
        height="28"
        elevation="0"
        rounded
        absolute
        top
        right
        class="pa-0 close-btn"
        @click="shareDialog = false"
      >
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import ShareCourseCard from './components/shareCourseCard'
import shortenUrlAPI from '@/utils/shortenUrlRequest'

export default {
  components: {
    ShareCourseCard,
  },
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
    isShareDialogOpen: {
      type: Boolean,
      default: false
    },
    sharingLessonId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      shareDialog: false,
      shareButtons: [
        {
          id: 0,
          name: 'Telegram',
        },
        {
          id: 1,
          name: 'Line',
        },
        {
          id: 2,
          name: 'Facebook',
        }
      ],
      selectedButton: 0,
      isSharing: false
    }
  },
  methods: {
    async shareButtonOnclick() {
      try {
        // 開始時更改狀態
        this.isSharing = true
        const href = location.href
        const appId = this.selectedButton

        let shareInfoObj = {}

        // 如果路由判斷是在課程介紹頁，就把request物件打包成課程介紹內容
        if (this.$route.name === 'CourseInfo') {
          const { title, describe, cover } = this.courseInfo
          shareInfoObj = {
            url: href,
            title: `${this.$t('courseInfo.shareCourse')}: ${title}`,
            description: describe,
            image: cover
          }
        // 如果不是在課程介紹頁就是在章節學習頁面，同時打包課程與指定章節內容
        } else {
          const { cover, title: courseTitle } = this.courseInfo
          const  { title } = this.sharingLesson
          shareInfoObj = {
            url: `${href}?lesson=${this.sharingLessonId}`,
            title: `${this.$t('courseInfo.shareLesson')}: ${title}`,
            // 這邊 description 先用 courseInfo.title ， 之後再看要改成甚麼
            description: courseTitle,
            image: cover
          }
        }
        // 送出短網址請求，拿到短網址後開啟app
        const res = await shortenUrlAPI.createShortUrl(shareInfoObj)
        const shortUrl = res.data.shorturl
        this.shareToApp(shortUrl, appId)
        this.isSharing = false
      } catch(err) {
        console.log(err)
        // 2021.10.04 短網址請求現階段會有跨域問題，所以Chrome 阻擋時先傳送當前網址
        const currentLessonHref = `${location.href}?lesson=${this.sharingLessonId}`
        const appId = this.selectedButton
        this.shareToApp(currentLessonHref, appId)
        this.isSharing = false
      }
      
    },
    shareToApp(url, appId) {

      switch (appId) {
        case 0:
          // telegram
          window.open(`https://telegram.me/share/url?url=${url}`)
          break
        case 1:
          // line
          {
            const encodedUrl = encodeURIComponent(url)
            window.open(`https://social-plugins.line.me/lineit/share?url=${encodedUrl}`)
            break
          }
        case 2:
          // facebook
          window.open(`https://m.facebook.com/sharer/sharer.php?u=${url}`)
      }
      console.log('分享被點按了')
      // 根據選擇的分享目標觸發分享動作
    }
  },
  watch: {
    // 從course傳入的分享鈕點擊事件觸發打開 dialog
    isShareDialogOpen(newVal) {
      if (newVal) {
        this.shareDialog = true
      }
    },
    // 監聽 dialog 關閉事件 回傳 course 做 狀態改變
    shareDialog(newVal) {
      if (!newVal) {
        this.$emit('share-dialog-close')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

::v-deep .v-dialog {
  width: auto !important;
}

.share-title {
  font-family: 'TC-bold';
  font-size: 34px;
  line-height: 48px;
}

.share-trigger-btn {
  background-color: $default !important;
  border: 1px solid $gray_light !important;
}

.button-wrapper {
  width: 33%;
}

.share {
  position: relative;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  &.selected {
    box-shadow: $primary 0px 0px 5px 3px !important;
  }
}

.close-btn {
  background-image: url('./imgs/close.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
