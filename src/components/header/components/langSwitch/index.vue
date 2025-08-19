<template>
  <div class="lang-switch d-flex justify-space-between align-center">
    <div @click="setLocale('en')" class="lang-item">{{ langs['en'] }}</div>
    <div class="lang-divider"></div>
    <div @click="setLocale('tw')" class="lang-item">{{ langs['tw'] }}</div>
  </div>
</template>

<script>
import { settings } from '@/config'

export default {
  name: 'LangSwitch',
  data() {
    return {
      langs: {
        tw: '繁體中文',
        en: 'English',
      },
      langShow: settings.lang,
      locale: this.$i18n.locale,
    }
  },
  methods: {
    setLocale(lang) {
      console.log('set locale: ', lang)
      this.locale = lang
      this.$i18n.locale = lang
      this.$storage.setLocal('locale', lang)
      this.$store.commit('system/setLocale', lang)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.lang-switch {
  font-family: 'TC-bold';
  margin-right: 28px;
  white-space: nowrap;

  .lang-item {
    font-size: 1rem;
    cursor: pointer;
  }
  .lang-divider {
    width: 1px;
    height: 17px;
    background: $default;
    margin: 0 8px;
  }
}
</style>
