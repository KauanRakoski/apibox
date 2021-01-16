import Vue from 'vue'
import App from './App.vue'
import { firebaseConfig } from './helpers/firebase'
import firebase from 'firebase'
import router from './router'


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