import Vue from 'vue'
import App from './App.vue'
import { firebaseConfig } from './helpers/firebaseConfig'
import firebase from 'firebase'
import router from './router'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

Vue.use(PerfectScrollbar)

Vue.config.productionTip = false

new Vue({
  router,
  created() {
    firebase.initializeApp(firebaseConfig)
    
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/dashboard').catch(() => {})
      }
      else if(user == null) {
        this.$router.push('/auth').catch(() => {})
      }
      else{
        this.$router.push('/auth').catch(() => {})
      }
    })
  },
  render: h => h(App)
}).$mount('#app')