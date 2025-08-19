<template>
  <!-- 交易下拉選單群 -->
  <div class="dropdowns d-flex justify-space-between mx-9">
    <!-- 購買按鈕 -->
    <v-menu v-model="isBuyOpen" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="default"
          class="trade-button"
          :class="{ 'action-active': isBuyOpen }"
          outlined
          v-bind="attrs"
          v-on="on"
        >
          <div
            class="button-content-wrapper d-flex justify-space-between align-center"
          >
            <span class="pl-3 action-text">{{ $t('header.purchase') }}</span>
            <div class="icon-wrapper">
              <v-icon class="dropdown-icon">mdi-chevron-down</v-icon>
            </div>
            
          </div>
        </v-btn>
      </template>
      <DropdownList :action-type="0" />
    </v-menu>
    <!-- 出售按鈕 -->
    <v-menu v-model="isSellOpen" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="default"
          class="trade-button"
          :class="{ 'action-active': isSellOpen }"
          outlined
          v-bind="attrs"
          v-on="on"
        >
          <div
            class="button-content-wrapper d-flex justify-space-between align-center"
          >
            <span class="pl-3 action-text">{{ $t('header.sell') }}</span>
            <div class="icon-wrapper">
              <v-icon class="dropdown-icon">mdi-chevron-down</v-icon>
            </div>
          </div>
        </v-btn>
      </template>
      <DropdownList :action-type="1" />
    </v-menu>
  </div>
</template>

<script>
import DropdownList from './components/dropdownList'

export default {
  name: 'TradeActions',
  components: {
    DropdownList
  },
  data() {
    return {
      isBuyOpen: false,
      isSellOpen: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';


.dropdowns {
  width: 205px;

  .trade-button {
    width: 90px;
    height: 32px !important;

    &.action-active {
      background: $primary;

      .dropdown-icon {
        transform: rotate(180deg);
      }
    }

    .button-content-wrapper {
      width: 90px;
      height: 32px;

      .action-text {
        padding-left: 10px;
      }

      .icon-wrapper {
        border-left: 1px solid $default;
      }

      .dropdown-icon {
        width: 32px;
        height: 32px;
        // border-left: 1px solid $default;
      }
    }
  }

}



</style>