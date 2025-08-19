<template>
  <!-- 彈窗 -->
  <v-card width="520" class="rounded-lg px-12 pt-12 card">
    <!-- 驗證表單 -->
    <form @submit.prevent="formOnSubmit">
      <p class="card-title mb-8">
        {{ $t('securityCheckDialog.securityCheck') }}
      </p>
      <p class="input-hint gray_light--text mb-3">
        {{ $t('securityCheckDialog.securityCode') }}
      </p>
      <div class="input-wrapper">
        <input
          v-model="securityCode"
          type="password"
          ref="securityCodeInput"
          required
          class="input-field rounded-lg pl-5 pr-15"
        />
        <!-- toggle 看密碼按鈕 -->
        <v-btn
          text
          icon
          absolute
          @click="toggleSecurityCodeSeeable"
          class="input-see-btn"
        >
          <v-icon v-if="isCodeHide">mdi-eye</v-icon>
          <v-icon v-else>mdi-eye-off</v-icon>
        </v-btn>
        <!-- 忘記密碼 -->
        <v-btn
          text
          x-small
          absolute
          to=""
          class="primary--text pa-0 forget-password-btn"
          >{{ $t('user.forgetPassword') }}</v-btn
        >
      </div>
      <div class="buttons-wrapper d-flex justify-center">
        <v-btn
          width="142"
          height="38"
          color="gray_light"
          elevation="0"
          @click="closeButtonOnclick"
          class="default--text mr-15"
          >{{ $t('base.cancel') }}</v-btn
        >
        <v-btn
          width="142"
          height="38"
          color="primary"
          elevation="0"
          type="submit"
          class="default--text"
          >{{ $t('base.confirm') }}</v-btn
        >
      </div>
    </form>
    <!-- close button -->
    <v-btn
      min-width="24"
      height="24"
      elevation="0"
      rounded
      absolute
      top
      right
      class="pa-0"
      style="background-color: #cccccc;"
      @click="closeButtonOnclick"
    >
      <v-icon dense color="gray">mdi-close</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: 'SecurityCheckDialogCard',
  data() {
    return {
      securityCode: '',
      isCodeHide: true
    }
  },
  methods: {
    closeButtonOnclick() {
      this.$emit('close-button-onclick')
    },
    formOnSubmit() {
      if (!this.securityCode.length) {
        
        this.$alert.toast.fire({
          icon: 'warning',
          title: this.$t('user.pleaseEnterPassword')
        })

        return
      }
      // pass
      this.checkButtonOnclick()
    },
    checkButtonOnclick() {
      // 確認時向父層傳遞安全碼
      this.$emit('check-button-onclick', this.securityCode)
    },
    toggleSecurityCodeSeeable() {
      const securityCodeInput = this.$refs.securityCodeInput
      if (securityCodeInput.type === 'password') {
        this.isCodeHide = false
        securityCodeInput.type = 'text'
      } else {
        this.isCodeHide = true
        securityCodeInput.type = 'password'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.card {
  padding-bottom: 72px;
}

.card-title {
  font-family: 'TC-bold';
  font-size: 34px;
  line-height: 48px;
}

.input-hint {
  font-size: 16px;
  line-height: 24px;
}

.input-wrapper {
  position: relative;
  margin-bottom: 80px;

  .input-field {
    position: relative;
    width: 100%;
    height: 64px;
    border: 1px solid #dbdbdb;
    font-size: 24px;
  }

  .input-see-btn {
    width: 42px;
    height: 42px;
    top: 50%;
    transform: translate(0, -50%);
    right: 0;
  }
}

.forget-password-btn {
  right: 0px;
  bottom: -30px;
}
</style>
