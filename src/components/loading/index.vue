<template>
  <div
    class="loading-wrapper d-flex flex-column justify-center align-center pa-15"
  >
    <div class="loading-image"></div>
    <p class="loading-text-top gray--text">{{ $t('loading.title') }}</p>
    <p class="loading-text-bottom gray_light--text">
      {{ $t('loading.description') }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Loading',
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.loading-wrapper {
  width: 100%;
  height: 100%;
  margin: 0 auto;

  .loading-image {
    width: 132px;
    height: 132px;
    background-image: url('./imgs/loading_image.png');
    background-repeat: no-repeat;
    background-size: contain;
    animation: rotate 1s infinite linear;
    margin-bottom: 90px;
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

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
