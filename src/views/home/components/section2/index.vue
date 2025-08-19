<template>
  <div class="intro-service-wrapper intro-wrapper">
      <div class="intro-service-content intro-content py-16">
        <!-- 標題 -->
        <p class="section-title mb-15">
          <span>{{ $t('homepage.section2.sectionTitle1') }}</span>
          <span class="primary--text">{{ $t('homepage.section2.sectionTitle2') }}</span>
          <span>{{ $t('homepage.section2.sectionTitle3') }}</span>
        </p>
        <!-- 內容 -->
        <div class="subject-wrapper d-flex justify-space-between">
          <!-- subject1 -->
          <div class="subject d-flex flex-column align-center">
            <v-img height="60" contain src="./imgs/section2_1.png" class="mb-5"></v-img>
            <p class="subject-title mb-5">{{ $t('homepage.section2.subject1') }}</p>
            <p class="subject-description">{{ $t('homepage.section2.text1') }}</p>
          </div>
          <!-- subject2 -->
          <div class="subject d-flex flex-column align-center">
            <v-img height="60" contain src="./imgs/section2_2.png" class="mb-5"></v-img>
            <p class="subject-title mb-5">{{ $t('homepage.section2.subject2') }}</p>
            <p class="subject-description">{{ $t('homepage.section2.text2') }}</p>
          </div>
          <!-- subject3 -->
          <div class="subject d-flex flex-column align-center">
            <v-img height="60" contain src="./imgs/section2_3.png" class="mb-5"></v-img>
            <p class="subject-title mb-5">{{ $t('homepage.section2.subject3') }}</p>
            <p class="subject-description">{{ $t('homepage.section2.text3') }}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Sectoin2',
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

  .subject-wrapper {
    width: 100%;

    .subject {
      width: 300px;
  
      .subject-title {
        font-size: 20px;
      }
      .subject-description {
        color: $gray;
        text-align: center;
        line-height: 20px;
      }
    }
  }

}

</style>