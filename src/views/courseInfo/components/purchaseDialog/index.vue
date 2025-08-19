<template>
  <v-dialog v-model="purchaseDialog" class="purchase-dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        width="186"
        height="48"
        elevation="0"
        :disabled="courseInfo.is_bought"
        class="default--text"
        v-bind="attrs"
        v-on="on"
      >
        {{ $t('courseInfo.buyAndLearn') }}
      </v-btn>
    </template>
    <!-- 彈窗內容 從0到2，-1為餘額不足狀態 -->
    <PurchaseCheck
      :course-info="courseInfo"
      v-if="process === 0"
      @check-button-onclick="toNextStep"
      @close-button-onclick="close"
    />
    <SecurityCheckDialogCard
      :course-info="courseInfo"
      v-else-if="process === 1"
      @check-button-onclick="purchaseCourse"
      @close-button-onclick="close"
    />
    <PurchaseSuccess
      :course-info="courseInfo"
      v-else-if="process === 2"
      @close-button-onclick="close"
    />
    <PurchaseWarning v-else-if="process === -1" @close-button-onclick="close" />
  </v-dialog>
</template>

<script>
import PurchaseCheck from './components/purchaseCheck'
import SecurityCheckDialogCard from '@/components/dialogs/securityCheckDialogCard'
import PurchaseSuccess from './components/purchaseSuccess'
import PurchaseWarning from './components/purchaseWarning'

export default {
  name: 'PurchaseDialog',
  components: {
    PurchaseCheck,
    SecurityCheckDialogCard,
    PurchaseSuccess,
    PurchaseWarning,
  },
  props: {
    courseInfo: {
      type: Object,
      default() {
        return {
          id: null,
          is_bought: false,
          cate: '',
          type: 1,
          title: '',
          cover: '',
          describe: '',
          tags: '',
          duration: 0,
          price: '0',
          sections: 0,
          clicks: 0,
          status: 1,
          sort: 0,
          created_time: '2021-09-15T13:42:02.929437',
          updated_time: '2021-09-15T13:42:02.929459',
          user: null,
          coin: null,
        }
      },
    },
  },
  data() {
    return {
      purchaseDialog: false,
      process: 0,
      // accout資料 須從 VueX拉入
      account: {
        name: 'Arya_8888',
        id: '1JJRCPgWWBL1DJexzWTYKYCWvSqR5u VK8F',
      },
    }
  },
  watch: {
    // 每次重新打開時回到付費步驟1
    purchaseDialog(newValue) {
      if (newValue) {
        this.resetProcess()
      }
    },
  },
  methods: {
    toNextStep() {
      this.process += 1
    },
    resetProcess() {
      this.process = 0
    },
    close() {
      this.purchaseDialog = false
    },
    // 購買課程
    async purchaseCourse(securityCode) {
      try {
        const courseId = this.$route.params.id
        const res = await this.$request({
          url: '/subject/buy/',
          method: 'post',
          data: this.$qs.stringify({
            id: courseId,
            security_code: securityCode,
          }),
        })
        console.log(res)
        // 到下一步驟
        this.toNextStep()
      } catch (err) {
        console.log(err)
        // 餘額不足
        if (err.code == 20103) {
          this.process = -1
          return
        }
        // TODO 之後要更換提醒樣式
        console.log(this)
        this.$alert.toast.fire({
          icon: 'error',
          title: this.$t(`errorCode.${err.code}`)
        })
        this.close()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

::v-deep .v-dialog {
  width: auto !important;
}
</style>
