<template>
  <div class="reset-password-wrapper">
    <!-- 重置密碼表單 -->
    <form
      class="dialog-form"
      @submit.prevent="submitOnclick"
    >
      <!-- 密碼 -->
      <div class="password-group mb-13">
        <p class="mb-3 input-title gray--text">{{ $t('header.loginDialog.password') }}</p>
        <input
          v-model="newPassword"
          type="text"
          class="text-field password px-5"
          :class="{ 'login-error': isError || isNewPasswordLengthInvalid }"
          :placeholder="$t('header.loginDialog.newPasswordLabel')"
        >
        <span v-if="isNewPasswordLengthInvalid" class="confirm-new-password-hint error--text">{{ $t('header.loginDialog.newPasswordHint') }}</span>
      </div>

      <!-- 確認密碼 -->
      <div class="password-group mb-13">
        <p class="mb-3 input-title gray--text">{{ $t('header.loginDialog.confirmNewPassword') }}</p>
        <input
          v-model="newPasswordConfirm"
          type="text"
          class="text-field password px-5"
          :class="{ 'login-error': isError || isNewPasswordConfirmNotSame }"
          :placeholder="$t('header.loginDialog.confirmNewPasswordLabel')"
        >
        <span v-if="isNewPasswordConfirmNotSame" class="confirm-new-password-hint error--text">{{ $t('header.loginDialog.confirmNewPasswordHint') }}</span>
      </div>
      <!-- 送出鈕 -->
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
        <span>{{ $t('header.loginDialog.confirmReset') }}</span>
      </v-btn>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ResetPasswordContent',
  data() {
    return {
      newPassword: '',
      newPasswordConfirm: '',
      isError: false, // 重置失敗
      isLoading: false,
      isNewPasswordConfirmNotSame: false, // 密碼不一致
      isNewPasswordLengthInvalid: false, // 密碼長度不合法
    }
  },
  computed: {
    isCurrentInputEmpty() {
      return !this.newPassword.trim().length || !this.newPasswordConfirm.trim().length
    },
  },
  methods: {
    // 重置密碼請求
    async resetPassword() {
      try {
        this.isLoading = true

        const res = await this.$request({
          url: '/user/reset_password/',
          method: 'post',
          data: this.$qs.stringify({
            new_password: this.newPassword,
          }),
        })
        console.log(res)
        // 重置成功
        this.isError = false
        this.isLoading = false
        this.$emit('reset-success')
        this.$alert.toast.fire({
          icon: 'success',
          title: this.$t('header.loginDialog.resetSuccess')
        })
      } catch(err) {
        console.log(err)
        this.isError = true
        this.isLoading = false
        // 關閉對話框
        this.$emit('reset-failed')
        this.$alert.toast.fire({
          icon: 'success',
          title: this.$t('header.loginDialog.resetSuccess')
        })
      }
    },
    // 檢驗密碼長度是否正確
    checkIsPasswordLengthInValid() {
      if (this.newPassword.length > 12 || this.newPassword.length < 6) {
        this.isNewPasswordLengthInvalid = true
      } else {
        this.isNewPasswordLengthInvalid = false
      }
    },
    // 檢驗密碼與確認密碼是否一樣
    checkIsNewPasswordConfirmNotSame() {
      if (this.newPassword !== this.newPasswordConfirm) {
        this.isNewPasswordConfirmNotSame = true
      } else {
        this.isNewPasswordConfirmNotSame = false
      }
    },
    // 送出被點按
    submitOnclick() {
      this.checkIsNewPasswordConfirmNotSame()
      this.checkIsPasswordLengthInValid()
      if (this.isNewPasswordConfirmNotSame) {
        return
      }
      if(this.isNewPasswordLengthInvalid) {
        return
      }
      this.resetPassword()
    }
  },
  watch: {
    newPassword(newVal) {
      this.newPassword = newVal.trim()
    },
    newPasswordConfirm(newVal) {
      this.newPasswordConfirm = newVal.trim()
    },
  }
}
</script>


<style lang="scss" scoped>
@import '@/styles/variables.scss';

.reset-password-wrapper {
  width: 100%;

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

      &.login-error {
        outline: 2px solid $error;
      }
    }

    .password-group {
      position: relative;

      .confirm-new-password-hint {
        position: absolute;
        left: 0px;
        bottom: -20px;
      }
    }

  }

  .login-btn span {
    font-size: 18px;
  }
}
</style>