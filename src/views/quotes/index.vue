<template>
  <div class="quotes-wrapper">
    <Carousel :banners="banners" />
    <DataBoard />
    <Banner />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Carousel from './components/carousel'
import DataBoard from './components/databoard'
import Banner from './components/banner'

export default {
  name: 'Quotes',
  components: {
    Carousel,
    DataBoard,
    Banner,
  },
  data() {
    return {
      banners: [],
    }
  },
  methods: {
    ...mapActions('coin', ['coinsInit', 'quotesInit']),
    // 取得全部幻燈片圖片
    async getBannersInit() {
      try {
        const res = await this.$request({ url: '/site_resources/banners/?ordering=sort', methos: 'get' })
        const data = res.results
        this.banners = [...data]
        console.log(res)
      } catch(err) {
        console.log(err)
      }
    },
  },
  created() {
    this.getBannersInit()
    this.coinsInit()
    this.quotesInit()
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
</style>
