import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        // common
        primary: '#ffc100',
        secondary: '#010a31',
        secondary_light: '#141c3f',
        default: '#ffffff',
        disable: '#cccccc',
        success: '#20a763',
        error: '#ed0000',
        // gray
        gray_dark: '#2a2c38',
        gray: '#5d5b5b',
        gray_light: '#a6a8b3',
        gray_bright: '#f7f7f7',
      },
    },
  },
})
