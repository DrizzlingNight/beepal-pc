<template>
  <v-menu v-model="isDropdownOpen" left offset-y>
    <template v-slot:activator="{ on, attrs }">
      <!-- 帳號資訊按鈕 -->
      <v-btn
        color="secondary_light"
        width="126px"
        class="rounded-pill account-dropdown-button disable--text d-flex justify-space-between align-center mr-5 px-3"
        :class="{ 'btn-active': isDropdownOpen }"
        v-bind="attrs"
        v-on="on"
      >
        <div class="btn-content-wrapper d-flex justify-space-between align-center">
          <!-- 頭像 -->
          <v-img width="18" height="18" :src="getCurrentUserInfo.avatar" class="avatar mr-1 rounded-circle"></v-img>
          <span class="nickname" style="font-size: 12px;">{{ getCurrentUserInfo.nickname }}</span>
        </div>
        <v-icon class="icon" color="primary" small>mdi-menu-down</v-icon>
      </v-btn>
    </template>
    <!-- dropdown -->
    <v-list color="secondary" class="account-dropdown text-left">
      <!-- 錢包總餘額(USDT) -->
      <v-list-item class="default--text account-balance">
        <span class="mr-1 py-5 default--text">{{ $t('header.walletTotal') }}:</span
        ><span class="primary--text py-5">{{ getCurrentUserWalletTotal | toFixedNumber | toLocaleString }} USDT</span>
      </v-list-item>
      <v-list-item>
        <!-- 餘額卡片 -->
        <v-card width="100%" class="balances-card rounded-lg">
          <div v-for="balance in getCurrentUserBalances" :key="balance.coin">
            <!-- 先濾掉數量為0的 -->
            <p v-if="balance.amount != 0" class="d-flex align-center pa-4 primary--text">
              <v-img max-width="20" height="20" :src="require(`@/assets/imgs/coins/coin_${balance.coin}.png`)" class="mr-2"></v-img>
              <span class="mr-1">{{ balance.amount | simplifyPrice }}</span>
              <span>{{ balance.coin | translateCoinName }}</span>
            </p>
          </div>
        </v-card>
      </v-list-item>
      <!-- dropdown連結 -->
      <v-list-item :to="dropdownLink.link" v-for="dropdownLink in dropdownLinks" :key="dropdownLink.id" class="d-flex align-center link">
        <v-icon size="28" color="gray" class="mr-2">{{ dropdownLink.icon }}</v-icon>
        <span class="default--text">{{ $t(`header.dropdownLink_${dropdownLink.id}`) }}</span>
      </v-list-item>
      <!-- divider -->
      <div class="divider mx-4"></div>
      <!-- 登出 -->
      <v-list-item @click="logout" class="d-flex align-center link">
        <v-icon size="28" color="gray" class="mr-2">mdi-logout</v-icon>
        <span class="default--text">{{ $t('header.logout') }}</span>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { priceFilters, coinFilters } from '@/utils/mixins'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AccountDropdown',
  data() {
    return {
      isDropdownOpen: false,
      dropdownLinks: [
        // {
        //   id: 1,
        //   icon: 'mdi-account',
        //   link: '/account'
        // },
        {
          id: 2,
          icon: 'mdi-text-box-search',
          link: '/wallet?tab=1'
        },
        // {
        //   id: 3,
        //   icon: 'mdi-newspaper-variant-outline',
        //   link: '/advertisers'
        // }
      ]
    }
  },
  computed: {
    ...mapGetters(['getCurrentUserInfo', 'getCurrentUserWalletTotal', 'getCurrentUserBalances'])
  },
  mixins: [priceFilters, coinFilters],
  methods: {
    ...mapActions('user', ['currentUserBalancesInit', 'resetUserState']),
    ...mapActions('coin', ['quotesInit']),

    logout() {
      // localStorage.removeItem('token')
      this.$storage.removeLocal('token')
      this.resetUserState()
      const pathWithoutLogin = ['Home', 'Quotes', 'CourseInfo', 'Course']
      // TODO 判斷是否再開放頁面，是就不做跳轉
      const currentRouterName = this.$route.name
      if (!pathWithoutLogin.includes(currentRouterName)) {
        this.$router.push('/home').catch(() => {})
      }

      this.$alert.toast.fire({
        icon: 'success',
        title: this.$t('alert.logout')
      })
    },
  },
  watch: {
    isDropdownOpen(newVal) {
      // 打開dropdown時更新資料
      if (newVal) {
        this.currentUserBalancesInit()
        this.quotesInit()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';


.account-dropdown-button {
  height: 27px !important;
  text-transform: none;
  font-size: 12px !important;

  &.btn-active {
    
    .icon {
      transform: rotate(180deg)
    }
  }

  .btn-content-wrapper {

    .nickname {
      max-width: 64px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.account-dropdown {
  min-width: 255px;

  .balances-card {
    background: rgba($default, .1)
  }

  .link {
    cursor: pointer;
  }

  .divider {
    width: auto;
    height: 1px;
    background: $gray;
  }
}

::v-deep .v-list-item {
  color: transparent !important;
}

</style>