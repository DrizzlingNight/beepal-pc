<template>
  <div class="home-wrapper">
    <!--  HERO 畫面  -->
    <Section1 />
    <!-- 服務全球超過1000w用戶 -->
    <Section2 />
    <v-divider></v-divider>
    <!-- 超過350種買賣比特幣的方式 -->
    <Section3 />
    <v-divider></v-divider>
    <!-- 通過BeePal，您可以 -->
    <Section4 />
    <!-- 用戶聲音 -->
    <Section5 />
    <!-- 成為BeePal上比特幣賣家 -->
    <Section6 />
    <!-- banner -->
    <Banner />
  </div>
</template>

<script>
import Section1 from './components/section1'
import Section2 from './components/section2'
import Section3 from './components/section3'
import Section4 from './components/section4'
import Section5 from './components/section5'
import Section6 from './components/section6'
import Banner from './components/banner'

export default {
  name: 'Home',
  components: {
    Section1,
    Section2,
    Section3,
    Section4,
    Section5,
    Section6,
    Banner
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.intro-wrapper {
  background: $default;
  
}



</style>