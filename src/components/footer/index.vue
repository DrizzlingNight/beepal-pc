<template>
  <v-footer min-width="1300px" padless class="footer d-flex justify-center">
    <div class="d-flex flex-column footer-wrapper">
      <v-card color="transparent" flat tile>
        <v-img
          width="120px"
          height="40px"
          contain
          color="transparent"
          src="./../../assets/imgs/logo.png"
          class="logo"
        ></v-img>
      </v-card>
      <v-card
        color="transparent"
        flat
        tile
        class="d-flex justify-space-between align-center links-wrapper"
      >
        <v-card-text class="default--text pa-0">
          <router-link to="/home" class="default--text footer-link-page">{{
            $t('footer.nav_1')
          }}</router-link>
          <!-- // TODO 還沒有，先隱藏 -->
          <!-- <router-link to="/about" class="default--text footer-link-page">{{
            $t('footer.nav_2')
          }}</router-link> -->
          <router-link to="/download" class="default--text footer-link-page">{{
            $t('footer.nav_3')
          }}</router-link>
        </v-card-text>
        <v-card-text class="pa-0 d-flex justify-end">
          <v-btn
            icon
            color="transparent"
            to=""
            class="footer-link-more contact"
          ></v-btn>
          <v-btn
            icon
            color="transparent"
            to=""
            class="footer-link-more information"
          ></v-btn>
          <v-btn
            icon
            color="transparent"
            to=""
            class="footer-link-more twitter"
          ></v-btn>
        </v-card-text>
      </v-card>
      <v-card flat tile color="transparent" class="mb-5">
        <v-card-subtitle class="partnership-title pa-0">{{
          $t('footer.partners')
        }}</v-card-subtitle>
        <v-item-group>
          <v-img
            width="200"
            height="40"
            contain
            v-for="partner in partners"
            :key="partner.id"
            class="d-inline-block mr-3 mb-5"
            :src="partner.thumb"
          ></v-img>
        </v-item-group>
      </v-card>
      <v-card flat tile color="transparent" class="copyright">
        &#169; 2020 Beex. All rights reserved.
      </v-card>
    </div>
    <!-- // TODO 還沒做，先藏起來 -->
    <!-- <v-btn icon class="message-button noti-active"> </v-btn> -->
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      partners: [],
    }
  },
  methods: {
    // 取得全部合作夥伴資料
    async getPartnersInit() {
      try {
        const res = await this.$request({ url: '/site_resources/links/?ordering=sort', methos: 'get' })
        const data = res.results
        this.partners = [...data]
        console.log(res)
      } catch(err) {
        console.log(err)
      }
    },
  },
  created() {
    this.getPartnersInit()
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.footer {
  position: relative;
  padding: 50px 0 55px 0;
  background-color: $footer-bg !important;

  .footer-wrapper {
    width: 1200px;
  }
}

.logo {
  margin-bottom: 38px;
}

.links-wrapper {
  margin-bottom: 52px;
}

.footer-link-page {
  border-bottom: 1px solid $default;
  margin-right: 43px;
  font-size: 16px !important;
}

.footer-link-more {
  display: block;
  width: 40px;
  height: 40px;
  margin-left: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  &.contact {
    background-image: url('./imgs/contact.png');
  }
  &.information {
    background-image: url('./imgs/information.png');
  }
  &.twitter {
    background-image: url('./imgs/twitter.png');
  }
}

.partnership-title {
  color: $footer_text_darken !important;
  margin-bottom: 38px;
  font-size: 18px;
}

.copyright {
  font-size: 1rem;
  color: $footer_text_darken !important;
}

// 右上方訊息按鈕
.message-button {
  width: 54px;
  height: 54px;
  background-image: url('./imgs/message.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;

  &.noti-active::after {
    content: '';
    display: block;
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: $error;
    top: -3px;
    right: -3px;
  }
}
</style>
