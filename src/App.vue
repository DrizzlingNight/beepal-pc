<template>
  <v-app>
    <Header />
    <v-main style="background: #f7f7f7;">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'

// 偵測當前裝置
// import device from 'current-device'


export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },

  data: () => ({
    //
    isMobile: false
  }),
  mataInfo() {
    return {
      title: '',
      meta: [
        { property: 'og:title', content: 'BeePal' }
      ]
    }
  },
  created() {
    // 如果是手機就跳轉到H5版
    // if (device.mobile()) {
    //   this.isMobile = true
    //   // TODO 要換成正式服的位址
    //   window.location.href = 'http://h5.baax.uk'
    // }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/variables.scss';

// 把 html - overflow-x, body - min-width: 1300px 加在index.html裡面了

p,
a,
span {
  margin: 0px;
  padding: 0px;
}
</style>
