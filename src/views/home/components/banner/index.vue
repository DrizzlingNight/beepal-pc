<template>
  <div class="banner-wrapper">
    <div class="bubble bubble1"></div>
    <div class="bubble bubble2"></div>
    <div class="bubble bubble3"></div>
    <div class="bubble bubble4"></div>
    <div class="bubble bubble5"></div>
    <div class="content d-flex justify-center align-center">
      <div
        class="phone"
        :style="{
          'background-image':
            'url(' + require(`./imgs/phone_screen_${locale}.png`) + ')',
          }"
      ></div>
      <div class="content-info">
        <div class="info-title">{{ $t('quotes.banner.title') }}</div>
        <div class="info-description">
          {{ $t('quotes.banner.description') }}
        </div>
        <div class="downloads d-flex justify-space-between">
          <div class="download android d-flex flex-column align-center mr-5">
            <div class="qrcode d-flex justify-center align-center">{{ $t('base.comingSoon') }}</div>
            <v-btn retain-focus-on-click color="default" rounded to="" class="download-button px-3">
              <v-icon>mdi-android</v-icon>
              {{ $t('quotes.banner.androidDownload') }}
            </v-btn>
          </div>
          <div class="download web d-flex flex-column align-center">
            <div class="qrcode"></div>
            <v-btn color="default" rounded to="" class="download-button px-3">
              <v-icon>mdi-earth</v-icon>
              {{ $t('quotes.banner.openInMobileWeb') }}
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Banner',
  data() {
    return {
      locale: 'tw'
    }
  },
  computed: {
    ...mapGetters(['getLocale'])
  },
  watch: {
    getLocale(newVal) {
        this.locale = newVal
    }
  },
  created() {
    const locale = this.$storage.getLocal('locale')
    if (locale) {
      this.locale = locale
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.banner-wrapper {
  position: relative;
  width: 100%;
  height: 435px;
  background: $primary;
  overflow: hidden;

  .bubble {
    position: absolute;
    border-radius: 50%;

    &.bubble1 {
      width: 82px;
      height: 82px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.14) 0%,
        rgba(255, 255, 255, 0) 100%
      );
      left: 300px;
      bottom: 72px;
    }
    &.bubble2 {
      width: 245px;
      height: 245px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.27) 0%,
        rgba(255, 255, 255, 0) 100%
      );
      left: 408px;
      bottom: 250px;
    }
    &.bubble3 {
      width: 500px;
      height: 500px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.09) 0%,
        rgba(255, 255, 255, 0) 100%
      );
      left: 620px;
      top: 72px;
    }
    &.bubble4 {
      width: 164px;
      height: 164px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.27) 0%,
        rgba(255, 255, 255, 0) 100%
      );
      left: 1276px;
      top: 262px;
    }
    &.bubble5 {
      width: 410px;
      height: 410px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.09) 100%
      );
      left: 1380px;
      bottom: 315px;
    }
  }

  .content {
    width: 100%;
    height: 100%;

    .phone {
      min-width: 334px;
      height: 384px;
      // background: white;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: bottom;
      border-radius: 48px 48px 0 0;
      align-self: flex-end;
      margin-right: 80px;
    }

    .content-info {
      .info-title {
        font-size: 26px;
        color: white;
        text-align: center;
        margin-bottom: 14px;
        line-height: 26px;
      }

      .info-description {
        font-size: 16px;
        color: white;
        text-align: center;
        margin-bottom: 34px;
      }

      .downloads {
        min-width: 360px;

        .download {
          position: relative;

          .qrcode {
            width: 102px;
            height: 102px;
            // background: white;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            margin-bottom: 18px;
          }

          &.android .qrcode {
            // background-image: url('./imgs/QR_android.png');
            // border: 1px solid $secondary;
            background: $default;
          }
          &.web .qrcode {
            // TODO 要換成正式服的位址
            background-image: url('./imgs/QR_web.svg');
          }

          .download-button {
            height: 34px;
          }
        }
      }
    }
  }
}
</style>
