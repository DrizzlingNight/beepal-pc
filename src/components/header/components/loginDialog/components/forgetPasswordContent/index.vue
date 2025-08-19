<template>
  <div class="login-content-wrapper d-flex flex-column align-center">
    <!-- tabs -->
    <v-tabs v-model="verificationType" centered height="36" class="login-types mb-7">
      <v-tab class="login-type">{{ $t('header.loginDialog.forgetPassword_email') }}</v-tab>
      <v-spacer class="spacer"></v-spacer>
      <v-tab class="login-type">{{ $t('header.loginDialog.forgetPassword_phone') }}</v-tab>
    </v-tabs>
    <!-- 對話框輸入表單 -->
    <form
      class="dialog-form"
      @submit.prevent="submit"
    >
      <!-- 信箱 -->
      <div v-if="verificationType == 0" class="account-group mb-7">
        <p class="mb-3 input-title gray--text">{{ $t('header.loginDialog.emailAddress') }}</p>
        <input
          v-model="email"
          type="email"
          class="text-field email px-5"
          :class="{ 'account-error': errorCode || invalidUserAccount || isEmailInvalid }"
          :placeholder="$t('header.loginDialog.emailLabel')"
        >
        <!-- 錯誤提示 -->
        <span v-if="errorCode" class="user-account-hint error--text">{{ $t(`errorCode.${errorCode}`) }}</span>
        <span v-if="isEmailInvalid" class="user-account-hint error--text">{{ $t('header.loginDialog.emailHint') }}</span>
      </div>
      <!-- 手機 -->
      <div v-if="verificationType == 1" class="account-group mb-7">
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
          :class="{ 'account-error': errorCode || invalidUserAccount }"
          :placeholder="$t('header.loginDialog.phoneLabel')"
        >
        <!-- 錯誤提示 -->
        <span v-if="errorCode" class="user-account-hint error--text">{{ $t(`errorCode.${errorCode}`) }}</span>
        <span v-if="invalidUserAccount" class="user-account-hint error--text">{{ $t(`errorCode.20001`) }}</span>
      </div>
      <!-- 驗證碼 -->
      <div class="verification-group">
        <p class="mb-3 input-title gray--text">{{ $t('header.loginDialog.verification') }}</p>
        <div class="input-wrapper d-flex ">
          <input
            v-model="verification"
            class="text-field verification px-5 mr-1"
            :placeholder="$t('header.loginDialog.verificationLabel')"
            ref="verification"
          >
          <!-- 發送驗證碼 -->
          <v-btn
            width="164"
            height="64"
            depressed
            class="verification-btn"
            :class="{ 'available': !isAccountInputEmpty && !timer }"
            :disabled="isAccountInputEmpty || Boolean(timer)"
            :loading="isSending"
            @click="sendVerification"
          >
            <span v-if="Boolean(timer)">{{ $t('header.loginDialog._resend', [time]) }}</span>
            <span v-else>{{ $t('header.loginDialog.sendVerification') }}</span>
          </v-btn>
        </div>
      </div>
      <!-- 送出鈕 -->
      <v-btn
        width="100%"
        height="54"
        color="primary"
        depressed
        :disabled="isCurrentInputEmpty"
        class="submit-btn mb-8"
        type="submit"
        :loading="isLoading"
      >
        <span>{{ $t('header.loginDialog.send') }}</span>
      </v-btn>
    </form>
    <!-- 送出後確認對話框 -->
    <v-dialog v-model="isConfirmDialogShow" width="360">
      <v-card height="200" rounded="lg" class="confirm-card">
        <p class="confirm-text d-flex justify-center align-center">
          <span v-if="isVerificationSuccess">{{ $t('header.loginDialog.verificationResult_success') }}</span>
          <span v-else>{{ errorMessage }}，{{ $t('base.pleaseTryLater') }}</span>
        </p>
        <div class="actions">
          <v-btn
            width="50%"
            height="50"
            color="bg"
            depressed
            class="action rounded-0"
            @click="isConfirmDialogShow = false"
          >
            {{ $t('base.cancel') }}
          </v-btn>
          <v-btn
            width="50%"
            height="50"
            color="primary"
            depressed
            class="action rounded-0"
            @click="confirmOkOnclick"
          >
            {{ $t('base.ok') }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'resetPasswordContent',
  data() {
    return {
      verificationType: 0, // 0: email, 1: phone
      email: '',
      phone: '',
      countryCode: '886',
      countryCodes: ['886', '852'], // TW, HK
      countryMenuShow: false,
      verification: '',
      // isCurrentInputEmpty: true,
      isLoading: false,
      isSending: false,
      isEmailInvalid: false,
      invalidUserAccount: false,
      errorCode: null,
      errorMessage: '',
      // TODO 時間要存到專案全域才不會因為關閉對話框而重置
      time: 60, // 從60秒開始倒數
      timer: null,

      // 確認對話框
      isConfirmDialogShow: false,
      isVerificationSuccess: false
    }
  },
  computed: {
    // 是否有任何輸入是空白
    isCurrentInputEmpty() {
      if (this.verificationType) { // phone
        return !this.phone.trim().length || !this.verification.trim().length
      } else { // email
        return !this.email.trim().length || !this.verification.trim().length
      }
    },
    // 信箱或手機是否空白
    isAccountInputEmpty() {
      if (this.verificationType) { // phone
        return !this.phone.trim().length
      } else { // email
        return !this.email.trim().length
      }
    }
  },
  methods: {

    // 清空所有輸入欄
    clearAllInput() {
      this.email = ''
      this.phone = ''
      this.verification = ''
      this.errorCode = null
      this.invalidUserAccount = false
    },

    // 檢查字串是否為 不合法 email
    checkIsEmailInvalid() {
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email)) {
        this.isEmailInvalid = false
      } else {
        console.log('email is invalid')
        this.isEmailInvalid = true
      }
    },

    // 發送驗證碼
    async sendVerification() {
      try {
        // 檢查 email 欄位 是否 合法
        if (this.verificationType === 0) {
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
            sms_type: 2, // 2 為修改密碼
            username: this.verificationType === 0 ? this.email : this.phone,
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
        // TODO 先用一個alert檔著，之後要調整全部alert
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

    // 送出 驗證 sms_code 是否與帳號匹配 ( 透過sms登入的方式 )
    async submit() {
      try {
        this.isEmailInvalid = false
        this.isLoading = true
        const res = await this.$request({
          url: '/user/login/',
          method: 'post',
          data: this.$qs.stringify({
            sms_code: this.verification,
            username: this.verificationType === 0 ? this.email : this.phone,
            idd_code: this.countryCode
          })
        })
        console.log(res)
        // 有成功登入
        const token = res.access_token
        this.$storage.setLocal('token', token)
        this.isVerificationSuccess = true
        this.isConfirmDialogShow = true
        this.errorMessage = ''
        this.isLoading = false
      } catch(err) {
        console.log(err)
        this.isVerificationSuccess = false
        this.isConfirmDialogShow = true
        this.errorMessage = this.$t(`errorCode.${err.code}`)
        this.isLoading = false
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
        this.$storage.setLocal('time_forget_password', this.time)
        this.$storage.setLocal('timestamp_forget_password', currentTimestamp)
      }
    },
    
    // 發送後彈窗確認選項
    confirmOkOnclick() {
      if (this.isVerificationSuccess) {
        this.$emit('to-reset-password')
      } else {
        this.isConfirmDialogShow = false
      }
    },

  },
  watch: {
    verificationType() {
      this.clearAllInput()
    },
    isDialogOpen(newVal) {
      if (!newVal) { // 關閉時做狀態重置
        this.loginType = 0
        this.clearAllInput()
        this.resetTimer()
      }
    },
    time(newVal) {
      if (!newVal) { // 倒數到0時
        clearInterval(this.timer)
        this.resetTimer()
        this.$storage.removeLocal('time_forget_password')
      }
    }
  },
  created() {
    // 處理尚未倒數完就關閉的 倒數事件
    const storageTime = this.$storage.getLocal('time_forget_password')
    const storageTimestamp = this.$storage.getLocal('timestamp_forget_password')
    if (storageTime) {
      // 當下時間戳
      const currentTime = Date.now()
      // 從 上次關閉到打開過了多少 毫秒
      const timeDuration = currentTime - storageTimestamp
      // 從 上次關閉到打開過了多少 秒
      const durationSeconds = Math.round(timeDuration / 1000)
      // 如果已經超過剩餘時間 就 清空 不做事
      if (durationSeconds >= storageTime) {
        this.$storage.removeLocal('time_forget_password')
        this.$storage.removeLocal('timestamp_forget_password')
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

.login-content-wrapper {
  width: 100%;

  .login-types {
    // width: 240px;
    max-width: 260px;
    .login-type {
      font-size: 16px;
      color: $secondary;
      font-family: 'TC-bold';
    }
  }

  .dialog-form {
    width: 100%;
    position: relative;

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

      &.account-error {
        outline: 2px solid $error;
      }
    }

    .account-group {
      position: relative;

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

      .user-account-hint {
        position: absolute;
        left: 0px;
        bottom: -20px;
      }

    }

    .verification-group {
      position: relative;
      margin-bottom: 68px;

      .input-wrapper {
        
        .verification-btn {

          &.available {
            background: linear-gradient(163deg, #FFF07C 0%, #FFC100 100%);
          }

          span {
            font-size: 16px;
          }
        }
      }
    }

  }

  .submit-btn span {
    font-size: 18px;
  }

}
.confirm-card {
  overflow: hidden;

  .confirm-text {
    width: 100%;
    height: 150px !important;

    span {
      font-size: 18px;
    }
  }
}
</style>