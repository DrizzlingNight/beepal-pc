<template>
  <div class="chart-wrapper">
    <!-- stroke sparkline -->
    <v-sparkline
      :value="chartData"
      color="#ffe183"
      :smooth="20"
      line-width="3"
      padding
      class="stroke"
    >
    </v-sparkline>
    <!-- fill sparkline -->
    <v-sparkline
      :value="chartData"
      :gradient="gradient"
      :smooth="20"
      fill
      auto-line-width
      padding
      class="fill"
    >
    </v-sparkline>
  </div>
</template>

<script>
export default {
  props: {
    weeklyQuoteData: {
      type: Array,
      default() {
        return []
      },
    },
    data() {}
  },
  data() {
    return {
      gradient: ['#ffda00', '#ffffff'],
      chartData: []
    }
  },
  watch: {
    weeklyQuoteData(newVal) {
      // this.chartData = newVal.map(quoteData => {
      //   return quoteData.close
      // })
      let data = []
      for (let i = newVal.length - 1; i >= 0; i --) {
        data.push(newVal[i].close)
      }
      this.chartData = data
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.chart-wrapper {
  width: 142px !important;
  height: 34px !important;
  position: relative;

  .fill {
    position: absolute;
    top: 0px;
    left: 0px;
    opacity: 0.4;
  }
}
</style>
