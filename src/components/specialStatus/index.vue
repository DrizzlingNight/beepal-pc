<template>
  <div
    class="loading-wrapper d-flex flex-column justify-center align-center pa-15"
  >
    <!-- 狀態圖片 -->
    <div
      class="loading-image"
      :style="{
        'background-image':
          'url(' + require(`./imgs/${status[statusCode].img}.png`) + ')',
      }"
    ></div>
    <!-- 狀態標題 -->
    <p class="loading-text-top gray--text">
      {{ $t(`specialStatus.${status[statusCode].text}.title`) }}
    </p>
    <!-- 狀態指示 -->
    <p class="loading-text-bottom gray_light--text">
      {{ $t(`specialStatus.${status[statusCode].text}.description`) }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'SpecialStatus',
  // 透過帶入狀態畫面 status code 來生成對應狀態內容
  props: {
    statusCode: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      status: [
        {
          id: 0,
          text: 'networkError',
          img: 'network_error',
        },
        {
          id: 1,
          text: 'emptyContent',
          img: 'empty_content',
        },
        {
          id: 2,
          text: 'emptyResult',
          img: 'empty_result',
        },
        {
          id: 3,
          text: 'emptyMessage',
          img: 'empty_message',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.loading-wrapper {
  width: 100%;
  height: 100%;
  margin: 0 auto;

  .loading-image {
    width: 420px;
    height: 414px;
    background-image: url('https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngdc15c140aa2aa2582e84752318320487e2797d6fd51c7eea8096cd57df839a42');
    background-repeat: no-repeat;
    background-size: contain;
    margin-bottom: 60px;
  }

  .loading-text-top {
    font-size: 36px;
    line-height: 50px;
    margin-bottom: 14px !important;
  }

  .loading-text-bottom {
    font-size: 30px;
    line-height: 42px;
  }
}
</style>
