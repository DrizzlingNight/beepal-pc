<template>
  <div class="intro-function-wrapper intro-wrapper">
    <div class="intro-function-content intro-content py-16">
      <!-- 標題 -->
      <p class="section-title mb-2">
        <span>{{ $t('homepage.section4.sectionTitle1') }} </span>
        <span class="secondary--text">Bee</span><span class="primary--text">Pal</span>
        <span>{{ $t('homepage.section4.sectionTitle2') }}</span>
      </p>
      <!-- 副標 -->
      <p class="gray--text mb-9">{{ $t('homepage.section4.description') }}</p>
      <!-- 卡片群 -->
      <div class="cards-wrapper d-flex flex-wrap justify-space-between mb-1">
        <v-card flat width="380" height="200" color="transparent" v-for="index in 6" :key="index" class="subject-card d-flex flex-column align-center px-8 pt-8 mb-9">
          <div class="subject-icon mb-5"></div>
          <p class="card-title mb-3">{{ $t(`homepage.section4.subject${index}`) }}</p>
          <p class="card-text text-center">{{ $t(`homepage.section4.text${index}`) }}</p>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Section4',
  data() {
    return {}
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
      min-width: 62px;
      min-height: 80px;
      background-image: url('./imgs/section4.png');
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

  }

}
</style>