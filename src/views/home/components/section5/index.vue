<template>
  <div class="intro-feedback-wrapper intro-wrapper">
    <div class="intro-feedback-content intro-content py-16">
      <!-- 標題 -->
      <p class="section-title mb-2">
        <span>{{ $t('homepage.section5.sectionTitle') }} </span>
      </p>
      <!-- 副標 -->
      <p class="section-description text-center gray--text mb-9">{{ $t('homepage.section5.description') }}</p>
      <!-- 回饋 slider -->
      <v-slide-group
        class="pa-4"
        show-arrows
      >
        <v-slide-item
          v-for="index in 3"
          :key="index"
        >
          <!-- 回饋區塊 -->
          <v-card
            class="ma-4"
            height="168"
            width="324"
            color="transparent"
            flat
          >
            <!-- 對話框 -->
            <v-card flat width="324" height="112" color="#f4f4f4" class="feedback-card rounded-lg pa-5 mb-5">
              <p class="feedback">{{ $t(`homepage.section5.feedback${index}.feedback`) }}</p>
            </v-card>
            <div class="user-wrapper d-flex pl-9">
              <v-img max-width="40" height="40" src="https://i.pravatar.cc/40" class="rounded-circle mr-2" style="background: gray;"></v-img>
              <div class="user-info d-flex flex-column justify-center">
                <p class="mb-2">{{ $t(`homepage.section5.feedback${index}.userName`) }}</p>
                <p class="gray--text">{{ $t(`homepage.section5.feedback${index}.userTitle`) }}</p>
              </div>
            </div>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Section5',
  date() {
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

  .section-description {
    max-width: 380px;
    line-height: 20px;
  }

  .feedback-card {
    position: relative;

    .feedback {
      line-height: 16px;
      font-size: 12px;
      color: $gray;
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 40px;
      bottom: -15px;
      background: #f4f4f4;
      width: 30px;
      height: 20px;
      clip-path: polygon(0% 0%, 100% 0%, 50% 100%, 0% 0%);
    }
  }
}
</style>