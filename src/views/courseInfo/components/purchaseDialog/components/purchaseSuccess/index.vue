<template>
  <v-card
    min-width="522"
    class="rounded-lg d-flex flex-column align-center success-dialog"
  >
    <v-img
      width="100"
      height="100"
      src="./imgs/success.png"
      class="mb-9"
    ></v-img>
    <p class="success-text success--text mb-4">{{ $t('base.congrats') }}</p>
    <p class="gray_light--text success-text-sub">
      {{ $t('purchaseDialog.successDescription') }} !
    </p>
    <v-btn
      width="320"
      height="48"
      elevation="0"
      color="primary"
      :to="`/courses/${courseInfo.id}`"
      class="default--text"
      >{{ $t('courseInfo.learnProgress_0') }}</v-btn
    >
    <!-- close button -->
    <v-btn
      min-width="24"
      height="24"
      elevation="0"
      rounded
      absolute
      top
      right
      class="pa-0"
      style="background-color: #cccccc;"
      @click="closeButtonOnclick"
    >
      <v-icon dense color="gray">mdi-close</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  props: {
    courseInfo: {
      type: Object,
      default() {
        return {
          id: null,
        }
      },
    },
  },
  methods: {
    closeButtonOnclick() {
      this.$emit('close-button-onclick')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.success-dialog {
  padding-top: 74px;
  padding-bottom: 65px;

  .success-text {
    font-size: 35px;
    font-family: 'TC-bold';
    line-height: 50px;
  }
  .success-text-sub {
    font-size: 25px !important;
    line-height: 36px;
    margin-bottom: 70px !important;
  }
}
</style>
