<template>
  <div class="carousel-wrapper">
    <v-carousel
      height="100%"
      cycle
      interval="4000"
      :show-arrows="false"
      continuous
      delimiter-icon="mdi-minus"
      hide-delimiter-background
      class="primary--text"
      active-class="carousel-control-active"
    >
      <v-carousel-item
        v-for="banner in banners"
        :key="banner.id"
        :src="banner.thumb"
        :to="banner.link"
        :ripple="false"
      >
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

// 客製化 carousel controls

// ::v-deep .v-window {
//   // display: flex;
//   justify-content: center;
// }
::v-deep .v-carousel__controls {
  width: auto;
  margin-bottom: 72px;
  margin-left: 50%;
  transform: translate(-50%, 0);

  .v-item-group {

    .v-btn {
      margin: 0.5px;
      background-color: rgba($color: #ffffff, $alpha: 0.3);
      border-radius: 0;
      width: 60px;
      height: 4px;

      &.v-btn--active {
        background-color: $primary;
      }

      .v-btn__content {
        display: none;
      }
    }
  }
}
</style>
