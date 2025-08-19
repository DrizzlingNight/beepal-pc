<template>
  <v-card
    width="468"
    class="pt-12 pb-11 d-flex flex-column align-center rounded-lg"
  >
    <div class="secondary--text warning-title mb-10">
      {{ $t('purchaseDialog.warningPrompt') }}
    </div>
    <p class="warning-content mb-15">
      {{ $t('purchaseDialog.warningDescription') }}
    </p>
    <v-btn
      width="320"
      height="48"
      @click="closeButtonOnclick"
      color="primary"
      elevation="0"
      class="default--text"
      >{{ $t('base.confirm') }}</v-btn
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
  methods: {
    closeButtonOnclick() {
      this.$emit('close-button-onclick')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.warning-title {
  font-family: 'TC-bold';
  font-size: 34px;
  line-height: 48px;
}

.warning-content {
  font-size: 24px;
}
</style>
