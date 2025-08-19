<template>
  <div class="intro-trade-wrapper intro-wrapper">
    <div class="intro-trade-content intro-content py-16">
      <!-- 標題 -->
      <p class="section-title mb-2">
        <span>{{ $t('homepage.section3.sectionTitle1') }}</span>
        <span class="primary--text">350</span>
        <span>{{ $t('homepage.section3.sectionTitle2') }}</span>
      </p>
      <!-- 副標 -->
      <p class="gray--text mb-9">{{ $t('homepage.section3.description') }}</p>
      <!-- tabs -->
      <v-tabs centered class="mb-10">
        <v-tab>{{ $t('homepage.section3.tab1') }}</v-tab>
        <v-tab>{{ $t('homepage.section3.tab2') }}</v-tab>
      </v-tabs>
      <!-- 卡片群 -->
      <div class="cards-wrapper d-flex flex-wrap justify-space-between mb-1">
        <v-card width="380" height="200" outlined v-for="index in 6" :key="index" class="subject-card px-8 pt-8 mb-9">
          <div class="subject-icon mb-5"></div>
          <p class="card-title mb-3">{{ $t('homepage.section3.cardTitle') }}</p>
          <p class="card-text">{{ $t('homepage.section3.cardText') }}</p>
        </v-card>
      </div>
      <!-- 更多按紐 -->
      <v-btn depressed color="primary">{{ $t('homepage.section3.moreButton') }}</v-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Section3',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.intro-content {
  width: 1200px;
  min-height: 200px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .section-title {
    line-height: 45px;
    span {
      font-size: 32px !important;
    }
  }

  .subject-card {
    .subject-icon {
      width: 52px;
      height: 40px;
      background-image: url('./imgs/section3.png');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
    .card-title {
      font-size: 20px;
      line-height: 28px;
    }
    .card-text {
      max-width: 292px;
      line-height: 20px;
      color: $gray;
    }

    &:hover {
      box-shadow: 0px 5px 11px 0px rgba(151, 151, 151, 0.5);
      background: $primary;
      border-color: $primary;

      .subject-icon {
        background-image: url('./imgs/section3_active.png');
      }
      .card-title,
      .card-text {
        color: $default;
      }
    }

  }

}
</style>