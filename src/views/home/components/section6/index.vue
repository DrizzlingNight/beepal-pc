<template>
  <div class="intro-join-wrapper intro-wrapper">
    <div class="intro-join-content intro-content pt-16">
      <!-- 標題 -->
      <p class="section-title mb-2">
        <span>{{ $t('homepage.section6.sectionTitle1') }} </span>
        <span class="secondary--text">Bee</span>
        <span class="primary--text">Pal </span>
        <span>{{ $t('homepage.section6.sectionTitle2') }} </span>
      </p>
      <!-- 副標 -->
      <p class="section-description text-center gray--text mb-9">{{ $t('homepage.section6.description') }}</p>
      <!-- more 按紐 -->
      <v-btn depressed color="primary" class="more-btn">{{ $t('homepage.section6.moreButton') }}</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Section6',
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

  .section-description {
    max-width: 716px;
    line-height: 20px;
  }

  .more-btn {
    margin-bottom: 72px;
  }
}
</style>