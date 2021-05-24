import Vue from 'vue'
import App from './App.vue'
import { firebaseConfig } from './helpers/firebaseConfig'
import firebase from 'firebase'
import utilities from './helpers/utilities'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  created() {
    firebase.initializeApp(firebaseConfig)
    
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        localStorage.setItem('apibox-user', JSON.stringify(user))
        var isSubscribed = await utilities.checkUserSubscription(user.email)

        if(isSubscribed == undefined){
             this.$router.push('/subscribe').catch(() => {})
        }
        
        else this.$router.push('/dashboard').catch(() => {})
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