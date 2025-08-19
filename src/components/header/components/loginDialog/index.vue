<template>
  <v-dialog
    v-model="isDialogOpen"
    width="522"
    :persistent="loginDialogStatus !== 0"
    @click:outside="clickOutside"
  >
    <!-- 登入鈕 -->
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        max-width="60"
        height="32"
        color="primary"
        class="default--text"
      >
        {{ $t('header.login') }}
      </v-btn>
    </template>
    <!-- 登入對話框 -->
    <v-card class="dialog rounded-lg d-flex flex-column align-center">
      <!-- 取回密碼時的返回鍵 -->
      <v-btn v-if="loginDialogStatus === 1" @click="loginDialogStatus = 0" text icon absolute top left>
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <!-- 標題 -->
      <div class="dialog-title d-flex align-center mb-6">
        <v-img max-width="116" height="32" :src="require(`@/assets/imgs/logo_text.png`)" contain class="mr-1"></v-img>
        <span v-if="loginDialogStatus === 2" class="dialog-title-text secondary--text">{{ $t('header.resetPassword') }}</span>
        <span v-if="loginDialogStatus === 1" class="dialog-title-text secondary--text">{{ $t('header.loginDialog.forgetPassword') }}</span>
        <span v-else class="dialog-title-text secondary--text">{{ $t('header.login') }}</span>
        
      </div>
      <!-- 主內容 -->
      <LoginContent v-if="loginDialogStatus === 0" @forget-password-onclick="loginDialogStatus = 1" />
      <ForgetPasswordContent v-if="loginDialogStatus === 1" @to-reset-password="loginDialogStatus = 2" />
      <ResetPasswordContent v-if="loginDialogStatus === 2" @reset-success="loginDialogStatus = 0" @reset-failed="isDialogOpen = false" />
      <!-- 註冊 -->
      <p class="register-suggestion">
        <span class="gray--text">{{ $t('header.loginDialog.registerText') }}</span>
        <v-btn @click="isDialogOpen = false" text height="14" to="/register" class="primary--text px-0 ml-1">
          <span>{{ $t('header.loginDialog.registerNow') }}</span>
        </v-btn>
      </p>
    </v-card>
    <!-- 關閉確認彈窗 -->
    <v-dialog v-model="isCloseConfirmOpen" width="360">
      <v-card height="200" rounded="lg" class="confirm-card">
        <p class="confirm-text d-flex justify-center align-center">
          <span>{{ $t('alert.dialogClose.text') }}</span>
        </p>
        <div class="actions">
          <v-btn
            width="50%"
            height="50"
            color="primary"
            depressed
            class="action rounded-0"
            @click="isDialogOpen = false"
          >
            {{ $t('base.ok') }}
          </v-btn>
          <v-btn
            width="50%"
            height="50"
            color="bg"
            depressed
            class="action rounded-0"
            @click="isCloseConfirmOpen = false"
          >
            {{ $t('base.cancel') }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
import LoginContent from './components/loginContent'
import ForgetPasswordContent from './components/forgetPasswordContent'
import ResetPasswordContent from './components/resetPasswordContent'

import { mapGetters } from 'vuex'

export default {
  name: 'LoginDialog',
  components: {
    LoginContent,
    ForgetPasswordContent,
    ResetPasswordContent
  },
  data() {
    return {
    isDialogOpen: false,
    isCloseConfirmOpen: false,
    loginDialogStatus: 0 // 0: 登入, 1: 找回密碼, 2: 重設密碼
    }
  },
  computed: {
    ...mapGetters(['getIsLoginDialogActive'])
  },
  methods: {
    clickOutside() {
      if (!this.loginDialogStatus) { // 登入頁不動做
        return
      }
      this.isCloseConfirmOpen = true
    }
  },
  watch: {
    // 對話框關閉時同步 vuex 的 狀態
    isDialogOpen(newVal) {
        this.$store.commit('system/setLoginDialogStatus', newVal)
      // 重設 dialog 狀態回到登入狀態
      this.loginDialogStatus = 0
    },
    // 當 vuex 對話框狀態改變表示被要求打開
    getIsLoginDialogActive(newVal) {
      this.isDialogOpen = newVal
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.dialog {
  padding: 56px 48px 32px 48px;

  .dialog-title {
    .dialog-title-text {
      font-size: 32px;
      line-height: 48px;
      font-family: 'TC-bold';
    }
  }

  .register-suggestion span {
    font-size: 12px !important;
    width: auto;
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