// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMaterial from 'vue-material'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VeeValidate from 'vee-validate';

import { ValidationProvider } from 'vee-validate';
Vue.component('ValidationProvider', ValidationProvider);
Vue.use(VeeValidate);
Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.use(VueMaterial)
Vue.use(VueAxios, axios);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App />',
  watch: {
    "$route": 'checkLogin'
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      this.axios
        .post("/api/check")
        .then(successResponse => {
          this.responseResult = JSON.stringify(successResponse.data)
          if (successResponse.data.code === 200 && successResponse.data.message === '认证成功') {
            this.$router.push({ path: '/home' })
          } else {
            this.$router.push({ path: '/' })
          }
          //console.log(successResponse.data.message)
        })
        .catch(failResponse => { });
      // //检查是否存在session
      // if (!this.getCookie('JSESSIONID')) {
      //   this.$router.push('/home');
      // } else {
      //   this.$router.push('/home');
      //}
    }
  }
})