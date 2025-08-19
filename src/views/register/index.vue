<template>
  <div class="register-wrapper">
    <!-- 標題 -->
    <div class="register-title d-flex flex-start align-center w-100 mb-6">
      <v-img height="48" max-width="186" contain :src="require(`@/assets/imgs/logo_text.png`)" class="mr-2"></v-img>
      <span class="title-text">{{ $t('register.title') }}</span>
    </div>
    <p class="greeting mb-6">{{ $t('register.greeting') }}</p>
    <!-- 註冊方式選擇器 -->
    <div class="tabs w-100 d-flex align-center mb-10">
      <v-btn @click="registerType = 0" text width="100" height="32" class="tab register-email mr-5">
        <span class="tab-text" :class="{ active: registerType === 0 }">
          {{ $t('register.emailRegister') }}
        </span>
      </v-btn>
      <v-btn @click="registerType = 1" width="100" height="32" text class="tab register-phone">
        <span class="tab-text" :class="{ active: registerType === 1 }">
          {{ $t('register.phoneRegister') }}
        </span>
      </v-btn>
    </div>
    <!-- 註冊表單 -->
    <form class="form-wrapper" @submit.prevent="register">
      <!-- 帳號 -->
      <!-- email -->
      <div v-if="registerType === 0" class="form-group email-wrapper">
        <label class="group-title email-title" for="email">{{ $t('register.email') }}</label>
        <input v-model="email" type="email" id="email" class="input email-input" :placeholder="$t('register.emailLabel')">
        <!-- 錯誤處裡 -->
        <!-- // TODO 這邊先hardcode errorCode 如果是20303就是驗證碼錯誤 -->
        <span v-if="errorCode && errorCode !== 20303 && errorCode !== 20302" class="user-account-hint error--text">{{ $t(`errorCode.${errorCode}`) }}</span>
        <span v-if="isEmailInvalid" class="user-account-hint error--text">{{ $t('header.loginDialog.emailHint') }}</span>
      </div>
      <!-- 手機 -->
      <div v-if="registerType === 1" class="form-group phone-wrapper">
        <label class="group-title phone-title" for="phone">{{ $t('register.phone') }}</label>
        <input v-model="phone" type="text" id="phone" class="input phone-input" :placeholder="$t('register.phoneLabel')">
        <!-- // TODO 這邊先hardcode errorCode 如果是20303就是驗證碼錯誤 -->
        <span v-if="errorCode && errorCode !== 20303 && errorCode !== 20302" class="user-account-hint error--text">{{ $t(`errorCode.${errorCode}`) }}</span>
        <span v-if="invalidUserAccount" class="user-account-hint error--text">{{ $t('register.phoneHint') }}</span>
        <!-- 國家選擇器 -->
        <v-menu offset-y v-model="countryMenuShow">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              height="64"
              min-width="100"
              absolute
              v-bind="attrs"
              v-on="on"
              text
              class="d-flex justify-space-between align-center country-select-btn"
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
              <v-list-item-title class="d-flex justify-start align-center">+ {{ code }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <!-- email / phone 驗證 -->
      <div class="form-group verification-wrapper">
        <label class="group-title verification-title" for="verification">{{ $t('register.verification') }}</label>
        <input
          v-model="verification"
          type="text"
          id="verification"
          ref="verification"
          class="input verification-input"
          :placeholder="registerType === 0 ? $t('register.emailVerificationLabel') : $t('register.phoneVerificationLabel')"
        >
        <!-- // TODO 這邊先hardcode errorCode 如果是20303就是驗證碼錯誤 -->
        <span v-if="errorCode && (errorCode === 20303 || errorCode === 20302)" class="user-account-hint error--text">{{ $t(`errorCode.${errorCode}`) }}</span>
        <!-- 取得驗證碼 按鈕 -->
        <v-btn
          absolute
          right
          top
          width="164"
          height="64"
          color="primary"
          depressed
          class="send-verification-btn rounded-pill"
          @click="sendVerification"
          :disabled="isAccountInputEmpty || Boolean(timer)"
          :loading="isSending"
        >
          <span v-if="Boolean(timer)">{{ $t('header.loginDialog._resend', [time]) }}</span>
          <span v-else>{{ $t('header.loginDialog.sendVerification') }}</span>
        </v-btn>
      </div>
      <!-- 密碼 -->
      <div class="form-group password-wrapper">
        <label class="group-title password-title" for="password">{{ $t('register.createPassword') }}</label>
        <input v-model="password" :type="isPasswordSeeable ? 'text' : 'password'" id="password" class="input password-input" :placeholder="$t('register.createPasswordLabel')">
        <!-- 錯誤提示 -->
        <span v-if="isPasswordLengthInvalid" class="user-account-hint error--text">{{ $t('register.createPasswordHint') }}</span>
        <!-- toggle 密碼顯示 -->
        <v-btn
          text
          icon
          absolute
          right
          bottom
          large
          @click="isPasswordSeeable = !isPasswordSeeable"
        >
          <v-icon v-if="!isPasswordSeeable">mdi-eye</v-icon>
          <v-icon v-else>mdi-eye-off</v-icon>
        </v-btn>
      </div>
      <!-- 密買確認 -->
      <div class="form-group password-confirm-wrapper">
        <label class="group-title password-confirm-title" for="passwordConfirm">{{ $t('register.confirmPassword') }}</label>
        <input v-model="passwordConfirm" :type="isPasswordConfirmSeeable ? 'text' : 'password'" id="passwordConfirm" class="input password-confirm-input" :placeholder="$t('register.confirmPasswordLabel')">
        <!-- 錯誤提示 -->
        <span v-if="isPasswordConfirmNotSame" class="user-account-hint error--text">{{ $t('register.confirmPasswordHint') }}</span>
        <!-- toggle 密碼顯示 -->
        <v-btn
          text
          icon
          absolute
          right
          bottom
          large
          @click="isPasswordConfirmSeeable = !isPasswordConfirmSeeable"
        >
          <v-icon v-if="!isPasswordConfirmSeeable">mdi-eye</v-icon>
          <v-icon v-else>mdi-eye-off</v-icon>
        </v-btn>
      </div>
      <!-- 提交按鈕 -->
      <v-btn
        width="100%"
        height="64"
        depressed 
        color="primary"
        :disabled="isCurrentInputEmpty"
        class="submit-btn mt-10"
        type="submit"
        :loading="isLoading"
      >
        <span>{{ $t('register.registerNow') }}</span>
      </v-btn>
    </form>
    <div class="statement d-flex flex-column justify-center align-center">
      <p class="mb-3 gray_light--text">{{ $t('register.companyName') }}</p>
      <p class="d-flex align-center">
        <span class="gray_light--text">{{ $t('register.agreement_l') }}</span>
        <v-btn text to="" height="14" class="statement-btn px-0">{{ $t('register.agreement_r') }}</v-btn>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      registerType: 0, // 0: email, 1: phone
      // 信箱地址
      email: '',
      // 手機號碼
      phone: '',
      // 選中的國碼
      countryCode: '886',
      // 全部國碼選項
      countryCodes: ['886', '852'],
      // 國碼 drop-down 是否開啟
      countryMenuShow: false,
      // 驗證碼
      verification: '',
      // 密碼
      password: '',
      // 密碼確認
      passwordConfirm: '',
      // 密碼是否可見
      isPasswordSeeable: false,
      // 密碼確認是否可見
      isPasswordConfirmSeeable: false,
      // 是否正在傳送驗證碼
      isSending: false,
      // 是否正在傳輸註冊表單
      isLoading: false,
      // 請求回傳的錯誤碼(伺服器判斷)
      errorCode: null,
      // 判斷email是否格式錯誤(本地判斷) - 發送驗證碼時判斷
      isEmailInvalid: false,
      // 判斷用戶帳號格式是否錯誤(伺服器判斷) - 送出表單時判斷
      invalidUserAccount: false,
      // 密碼長度是否異常(本地判斷) - 送出表單時判斷
      isPasswordLengthInvalid: false,
      // 密碼與密碼確認是否不一致(本地判斷) - 送出表單時判斷
      isPasswordConfirmNotSame: false,
      // 計時器相關
      time: 60, // 從60秒開始倒數
      timer: null, // 計時器
    }
  },
  computed: {

    // 返回是否有任何輸入欄沒有輸入
    isCurrentInputEmpty() {
      if (this.registerType === 0) { // email 註冊
        return !this.email.trim().length ||
              !this.password.trim().length ||
              !this.verification.trim().length ||
              !this.passwordConfirm.trim().length
      } else { // 手機註冊
        return !this.phone.trim().length ||
              !this.password.trim().length ||
              !this.verification.trim().length ||
              !this.passwordConfirm.trim().length
      }
    },

    // 用戶帳號是否為空
    isAccountInputEmpty() {
      if (this.registerType === 0) { // email 註冊
        return !this.email.trim().length
      } else { // 手機註冊
        return !this.phone.trim().length
      }
    }
  },
  methods: {
    // 重置輸入狀態 (切換註冊類型時)
    resetStatus() {
      this.email = ''
      this.phone = ''
      this.countryCode = '886',
      this.verification = ''
      this.password = ''
      this.passwordConfirm = ''
      this.isPasswordSeeable = false
      this.isPasswordConfirmSeeable = false
      this.errorCode = null
      this.isEmailInvalid = false
      this.invalidUserAccount = false
      this.isPasswordLengthInvalid = false
      this.isPasswordConfirmNotSame = false
    },

    // 檢查字串是否為 不合法 email (驗證與註冊)
    checkIsEmailInvalid() {
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email)) {
        this.isEmailInvalid = false
      } else {
        console.log('email is invalid')
        this.isEmailInvalid = true
      }
    },

    // 檢驗密碼長度是否正確 (註冊)
    checkIsPasswordLengthInValid() {
      if (this.password.length > 14 || this.password.length < 6) {
        this.isPasswordLengthInvalid = true
      } else {
        this.isPasswordLengthInvalid = false
      }
    },

    // 檢驗密碼與確認密碼是否一樣 (註冊)
    checkIsNewPasswordConfirmNotSame() {
      if (this.password !== this.passwordConfirm) {
        this.isPasswordConfirmNotSame = true
      } else {
        this.isPasswordConfirmNotSame = false
      }
    },

    // 發送驗證碼
    async sendVerification() {
      try {
        // 檢查 email 欄位 是否 合法
        if (this.registerType === 0) {
          this.checkIsEmailInvalid()
        }
        if (this.isEmailInvalid) {
          return
        }
        this.isEmailInvalid = false
        this.isSending = true
        // 發送請求
        const res = await this.$request({
          url: '/common/sms/send_code/',
          method: 'post',
          data: this.$qs.stringify({
            sms_type: 1, // 1 為註冊
            username: this.registerType === 0 ? this.email : this.phone,
            idd_code: this.countryCode
          })
        })

        console.log(res)
        this.$refs.verification.focus()
        this.errorCode = null
        this.invalidUserAccount = false
        this.isSending = false
        this.startCountdown()
        this.recordTimeToLocalStorage()
        
        this.$alert.toast.fire({
          icon: 'success',
          title: this.$t('alert.verificationSent')
        })
      } catch(err) {
        console.log(err)
        this.errorCode = err.code
        if (err.status === 400) {
          this.invalidUserAccount = true
        }
        this.isSending = false
        this.startCountdown()
        this.recordTimeToLocalStorage()
      }
    },

    // 送出註冊申請
    async register() {
      try {
        this.checkIsPasswordLengthInValid()
        this.checkIsNewPasswordConfirmNotSame()
        console.log('register')
        // 判斷阻擋
        if (this.isPasswordLengthInvalid || this.isPasswordConfirmNotSame) {
          console.log('password or passwordConfirm not valid')
          return
        }
        // 發送請求
        this.isLoading = true
        const res = await this.$request({
          url: '/user/signup/',
          method: 'post',
          data: {
            username: this.registerType === 0 ? this.email : this.phone,
            password: this.password,
            idd_code: this.countryCode,
            sms_code: this.verification,
          }
        })
        console.log(res)
        this.isLoading = false
        this.$alert.toast.fire({
          icon: 'success',
          title: this.$t('alert.registerSuccess')
        })
        // 跳轉到登入頁
        this.$router.push('/home').catch(() => {})
        this.$store.commit('system/setLoginDialogStatus', true)
        
      } catch(err) {
        console.log(err)
        this.errorCode = err.code
        this.isLoading = false
        // 失敗不要清空 不然不會跳提示
        // this.resetStatus()
      }
    },

    // ******** 計時器 ******** //
    countdown() {
      this.time --
    },

    // 開始倒數
    startCountdown() {
      const vueInstance = this
      this.timer = setInterval(() => {
        vueInstance.countdown()
      }, 1000)
    },

    // 終止倒數
    resetTimer() {
      this.time = 60
      this.timer = null
    },

    // 紀錄時間到 localStorage
    recordTimeToLocalStorage() {
      // 離開前如果還沒到屬完就把當下時間戳記存到 localStorage
      if (this.timer) {
        const currentTimestamp = Date.now()
        this.$storage.setLocal('time_register', this.time)
        this.$storage.setLocal('timestamp_register', currentTimestamp)
      }
    }

  },
  watch: {

    registerType() {
      this.resetStatus()
    },

    time(newVal) {
      if (!newVal) { // 倒數到0時
        clearInterval(this.timer)
        this.resetTimer()
        this.$storage.removeLocal('time_register')
      }
    }

  },
  created() {
    // 處理尚未倒數完就關閉的 倒數事件
    const storageTime = this.$storage.getLocal('time_register')
    const storageTimestamp = this.$storage.getLocal('timestamp_register')
    if (storageTime) {
      // 當下時間戳
      const currentTime = Date.now()
      // 從 上次關閉到打開過了多少 毫秒
      const timeDuration = currentTime - storageTimestamp
      // 從 上次關閉到打開過了多少 秒
      const durationSeconds = Math.round(timeDuration / 1000)
      // 如果已經超過剩餘時間 就 清空 不做事
      if (durationSeconds >= storageTime) {
        this.$storage.removeLocal('time_register')
        this.$storage.removeLocal('timestamp_register')
        return
      }
      this.time = storageTime - durationSeconds
      this.startCountdown()
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.register-wrapper {
  width: 1200px;
  margin: 0 auto;
  padding: 64px 0px 0px 0px;

  .register-title {
    .title-text {
      font-size: 48px;
      font-family: 'TC-bold';
      color: $secondary;
    }
  }

  .greeting {
    font-size: 24px;
    line-height: 50px;
  }

  .tabs {
    height: 33px;
    .tab {
      .tab-text {
        font-size: 20px;
        transform-origin: center;
        transition: all .3s;
        
        &.active {
          transform: scale(1.3);
          font-family: 'TC-bold';
        }
      }
    }
  }

  // 表單
  .form-wrapper {

    // 表單群組
    .form-group {
      position: relative;
      width: 100%;
      height: 100px;
      margin-bottom: 25px;

      .group-title {
        font-size: 24px;
        line-height: 32px;
        
        &::after {
          content: '*';
          padding-left: 8px;
          color: $error;
          
        }
      }

      &.phone-wrapper {
        position: relative;

        .country-select-btn {
          position: absolute;
          left: 0px;
          bottom: 4px;

          span {
            font-size: 24px;
          }

          &.select-open {
            .drop-icon {
              transform: rotate(180deg);
            }
          }
        }
      }

      &.email-wrapper {
        position: relative;
      }

      &.verification-wrapper {

        .send-verification-btn span {
          font-size: 20px;
        }
      }

      .input {
        width: 100%;
        height: 64px;
        outline: none !important;
        border-bottom: 1px solid $gray;
        font-size: 20px;

        &.phone-input {
          padding-left: 120px;
        }

        &.verification-input {
          padding-right: 240px;
        }
      }

      .user-account-hint {
        position: absolute;
        left: 0px;
        bottom: -20px;
      }
    }

    .submit-btn span {
      font-size: 28px;
    }
  }

  .statement {
    width: 100%;
    height: 140px;

    .statement-btn {
      color: #6153EB;
    }
  }
}
</style>