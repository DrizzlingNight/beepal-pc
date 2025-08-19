const port = process.env.port || process.env.npm_config_port || 8888 // dev port

module.exports = {
  transpileDependencies: ['vuetify'],

  publicPath: '/',

  devServer: {
    port,
    overlay: {
      warnings: false,
      errors: true,
    },

    // proxy 代理客戶端伺服器
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://beepal-dev-api-2.ap-northeast-1.elasticbeanstalk.com',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '',
        },
      },
    },
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
}
// console.log('123')
// console.log(process.env.VUE_APP_BASE_API)
