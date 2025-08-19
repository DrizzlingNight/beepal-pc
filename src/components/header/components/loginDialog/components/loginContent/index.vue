<template>
  <div class="login-content-wrapper d-flex flex-column align-center">
    <!-- tabs -->
    <v-tabs v-model="loginType" centered height="36" class="login-types mb-7">
      <v-tab class="login-type">{{ $t('header.loginDialog.email') }}</v-tab>
      <v-spacer class="spacer"></v-spacer>
      <v-tab class="login-type">{{ $t('header.loginDialog.phone') }}</v-tab>
    </v-tabs>
    <!-- 對話框輸入表單 -->
    <form
      class="dialog-form"
      @submit.prevent="login"
    >
      <!-- 信箱 -->
      <div v-if="loginType == 0" class="account-group mb-7">
        <p class="mb-3 input-title gray--text">{{ $t('header.loginDialog.emailAddress') }}</p>
        <input
          v-model="email"
          type="email"
          class="text-field email px-5"
          :class="{ 'login-error': isError }"
          :placeholder="$t('header.loginDialog.emailLabel')"
        >
      </div>
      <!-- 手機 -->
      <div v-if="loginType == 1" class="account-group mb-7">
        <p class="mb-3 input-title gray--text">{{ $t('header.loginDialog.phone') }}</p>
        <v-menu offset-y v-model="countryMenuShow">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              height="64"
              max-width="80"
              absolute
              v-bind="attrs"
              v-on="on"
              text
              class="d-flex justify-space-between align-center px-3 country-select-btn"
              :class="{ 'select-open': countryMenuShow }"
            >
              <span>+{{ countryCode }}</span>
              <v-icon class="drop-icon">mdi-menu-down</v-icon>
            </v-btn>  
          </template>
          <v-list>
            <!-- 顯示全部國家選項 -->
            <v-list-item
              v-for="code in countryCodes"
              :key="code"
              class="country-option"
              @click="countryCode = code"
            >
              <v-list-item-title class="d-flex justify-start align-center">+{{ code }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-divider vertical></v-divider>
        <input
          v-model="phone"
          type="text"
          class="text-field phone"
          :class="{ 'login-error': isError }"
          :placeholder="$t('header.loginDialog.phoneLabel')"
        >
      </div>
      <!-- 密碼 -->
      <div class="password-group">
        <p class="mb-3 input-title gray--text">{{ $t('header.loginDialog.password') }}</p>
        <input
          v-model="password"
          :type="isPasswordSeeable ? 'text' : 'password'"
          class="text-field password px-5"
          :class="{ 'login-error': isError }"
          :placeholder="$t('header.loginDialog.passwordLabel')"
        >
        <span v-if="isError" class="password-hint error--text">{{ $t('header.loginDialog.passwordHint') }}</span>
        <!-- toggle 密碼顯示 -->
        <v-btn
          text
          icon
          absolute
          @click="isPasswordSeeable = !isPasswordSeeable"
          class="input-see-btn"
        >
          <v-icon v-if="!isPasswordSeeable">mdi-eye</v-icon>
          <v-icon v-else>mdi-eye-off</v-icon>
        </v-btn>
        <!-- 忘記密碼 -->
        <v-btn @click="forgetPasswordOnclick" text height="20" absolute right color="primary" class="pa-0 forget-password">
          {{ $t('header.loginDialog.forgetPassword') }}
        </v-btn>
      </div>
      <!-- 登入鈕 -->
      <v-btn
        width="100%"
        height="54"
        color="primary"
        depressed
        :disabled="isCurrentInputEmpty"
        class="login-btn mb-8"
        type="submit"
        :loading="isLoading"
      >
        <span>{{ $t('header.login') }}</span>
      </v-btn>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LoginContent',
  data() {
    return {
      loginType: 0, // 0: email, 1: phone
      email: '',
      phone: '',
      countryCode: '886',
      countryCodes: ['886', '852'],
      countryMenuShow: false,
      password: '',
      // isCurrentInputEmpty: true,
      isPasswordSeeable: false,
      isLoading: false,
      isError: false,
    }
  },
  computed: {
    ...mapGetters(['getIsLoginDialogActive']),
    isCurrentInputEmpty() {
      if (this.loginType) { // phone
        return !this.phone.trim().length || !this.password.trim().length
      } else { // email
        return !this.email.trim().length || !this.password.trim().length
      }
    }
  },
  methods: {
    ...mapActions('user', ['currentUserInfoInit', 'currentUserWalletInit', 'currentUserBalancesInit', 'resetUserState']),
    ...mapActions('coin', ['coinsInit', 'quotesInit', 'resetCoinState']),

    // 清空所有輸入欄
    clearAllInput() {
      this.email = ''
      this.phone = ''
      this.password = ''
      this.isError = false
    },
    // 忘記密碼被點按
    forgetPasswordOnclick() {
      this.$emit('forget-password-onclick')
    },
    // 登入
    async login() {
      try {
        this.isLoading = true
        const res = await this.$request({
          url: '/user/login/',
          method: 'post',
          data: this.$qs.stringify({
            username: this.loginType === 0 ? this.email : this.phone,
            password: this.password,
            idd_code: this.countryCode
          }),
        })
        console.log(res)
        this.$storage.setLocal('token', res.access_token)
        // 清空輸入
        this.clearAllInput()
        // 取得使用者基本資料
        this.currentUserInfoInit()
        // 取得幣種列表
        this.coinsInit()
        // 取得幣種匯率
        this.quotesInit()
        // 取得使用者錢包資訊
        this.currentUserWalletInit()
        // 取得使用者餘額
        this.currentUserBalancesInit()

        // 那些 "不能"被登入使用者造訪的 限定頁面
        const pathWithNoLogin = ['Register']

        if (pathWithNoLogin.includes(this.$route.name)) {
          this.$router.push('/home').catch(() => {})
        }

        this.isLoading = false
        this.$alert.toast.fire({
          icon: 'success',
          title: this.$t('alert.greeting')
        })
      } catch (err) {
        console.log('err: ' ,err)
        this.clearAllInput()
        this.isError = true
        this.isLoading = false
        this.$alert.toast.fire({
          icon: 'error',
          title: this.$t(`errorCode.${err.code}`)
        })
      }
    },
  },
  watch: {
    loginType() {
      this.clearAllInput()
    },
    getIsLoginDialogActive(newVal) {
      if (!newVal) { // 關閉時做狀態重置
        this.loginType = 0
        this.clearAllInput()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.login-content-wrapper {
  width: 100%;

  .login-types {
    width: 240px;
    .login-type {
      font-size: 16px;
      color: $secondary;
      font-family: 'TC-bold';
    }
  }

  .dialog-form {
    width: 100%;

    .input-title {
      font-size: 16px;
      line-height: 24px;
    }

    .text-field {
      width: 100%;
      height: 64px;
      border: 1px solid $gray_bright;
      border-radius: 6px;

      &.phone {
        padding-left: 100px !important;
      }

      &.login-error {
        outline: 2px solid $error;
      }
    }

    .account-group {
      .country-select-btn {
        width: 100px;

        &.select-open {
          .drop-icon {
            transform: rotate(180deg);
          }
        }
        &::after {
          content: '';
          display: block;
          width: 1px;
          height: 36px;
          background: $gray_light;
          position: absolute;
          right: 0px;
        }
      }
    }

    .password-group {
      position: relative;
      margin-bottom: 68px;

      .input-see-btn {
        width: 42px;
        height: 42px;
        bottom: 32px;
        transform: translate(0, 50%);
        right: 0;
      }

      .password-hint {
        position: absolute;
        left: 0px;
        bottom: -20px;
      }

      .forget-password {
        right: 0;
        bottom: -28px;
      }
    }

  }

  .login-btn span {
    font-size: 18px;
  }
}
</style>