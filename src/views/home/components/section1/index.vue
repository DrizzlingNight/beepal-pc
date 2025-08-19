<template>
  <div class="hero-section-wrapper">
    <div class="content-wrapper d-flex py-15">
      <DemoCard class="mr-16" />
      <div class="text-wrapper pt-10">
        <p class="text-title mb-5">
          <span>{{ $t('homepage.section1.text.title1') }}</span>
          <span style="font-family: 'TC-bold';"> Bee</span><span class="primary--text" style="font-family: 'TC-bold';">Pal </span>
          <span>{{ $t('homepage.section1.text.title2') }}</span>
        </p>
        <p class="description mb-10">{{ $t('homepage.section1.text.description1') }}</p>
        <p class="description mb-3">{{ $t('homepage.section1.text.description2') }}</p>
        <div class="chips-wrapper">
          <v-chip label outlined class="chip  mr-5">{{ $t('homepage.section1.text.chip1') }}</v-chip>
          <v-chip label outlined class="chip mr-5">{{ $t('homepage.section1.text.chip2') }}</v-chip>
          <v-chip label outlined class="chip">{{ $t('homepage.section1.text.chip3') }}</v-chip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DemoCard from './components/demoCard'

export default {
  name: 'HeroSection',
  components: {
    DemoCard
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.hero-section-wrapper {
  width: 1200px;
  min-height: 615px;
  margin: 0 auto;
  position: relative;

  .content-wrapper {
    

    .text-wrapper {

      .text-title {
        max-width: 520px;

        span {
          font-size: 50px;
          line-height: 70px;
          color: $secondary;
        }
      }

      .description {
        max-width: 520px;
        line-height: 32px;
        font-size: 16px;
      }

      .chips-wrapper {
        .chip {
          width: 90px !important;
          height: 32px;
          justify-content: center;
          background: $default !important;
        }
      }
      
    }
  }
}

</style>