<template>
  <v-app-bar
    app
    height="70px"
    min-width="1300px"
    flat
    color="secondary"
    class="default--text d-flex justify-center align-center pa-0"
  >
    <div class="header-content d-flex justify-space-between align-center">
      <!-- HEADER 左側小夥伴們 -->
      <div class="header-content-left d-flex align-center">
        <!-- // TODO 因為沒有引入 TradeActions 所以先加上 mr-9 把右邊推開 -->
        <router-link class="logo mr-15" to="/home"></router-link>
        <!-- 交易下拉選單群 -->
        <!-- // TODO 先不引入 -->
          <!-- <TradeActions /> -->
        <!-- 主標籤群 -->
        <div
          class="d-flex align-center justify-space-between tabs"
        >
          <router-link
            v-for="tab in tabs"
            :key="tab.id"
            :to="tab.page"
            class="tab"
          >
            <span>{{ $t(`header.nav_${tab.id}`) }}</span>
          </router-link>
        </div>
      </div>
      <!-- HEADER 右側小夥伴們 -->
      <div class="header-content-right d-flex align-center">
        <!-- 語系切換 -->
        <LangSwitch />
        <!-- 登入狀態下 帳號 dropdown 與通知 -->
        <template v-if="getIsLogin">
          <!-- 帳號dropdown -->
          <AccountDropdown v-if="getIsLogin" />
          <!-- 通知 -->
          <!-- // TODO 隱藏 通知 -->
          <!-- <v-btn
          v-if="getIsLogin"
            icon
            to="/notification"
            class="icon-notification d-flex justify-center align-center noti-active"
          >
            <v-icon color="default">mdi-bell-outline</v-icon>
          </v-btn> -->
        </template>
        <!-- 登出狀態下 登入鈕 -->
        <LoginDialog v-else />
      </div>
    </div>
  </v-app-bar>
</template>

<script>
// TODO 沒有要上現
// import TradeActions from './components/tradeActions'
import LangSwitch from './components/langSwitch'
import AccountDropdown from './components/accountDropdown'
import LoginDialog from './components/loginDialog'
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  components: {
    // TradeActions,
    LangSwitch,
    AccountDropdown,
    LoginDialog
  },
  data() {
    return {
      tabs: [
        {
          id: 1,
          page: '/quotes',
        },
        // {
        //   id: 2,
        //   page: '/exchange',
        // },
        {
          id: 3,
          page: '/wallet',
        },
        // {
        //   id: 4,
        //   page: '/information',
        // },
        // {
        //   id: 5,
        //   page: '/explore',
        // },
      ],
    }
  },
  computed: {
    ...mapGetters(['getIsLogin'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.header-content {
  width: 1200px;
}
.logo {
  width: 120px;
  height: 40px;
  background-image: url('./../../assets/imgs/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.tabs {
  // TODO 因為隱藏了部分 tab 所以先把寬度從 396px 改到 120px
  width: 120px;
  .tab {
    font-size: 1rem;
    color: $disable;
    &.active {
      color: $primary;
      position: relative;
      &::after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        height: 2px;
        bottom: -6px;
        background: $primary;
      }
    }
  }
}
.icon-notification {
  position: relative;
  width: 30px !important;
  height: 30px !important;
  cursor: pointer;
  &.noti-active::after {
    content: '';
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    top: 0;
    right: 0;
    background: red;
  }
}
</style>