<template>
  <div>
    <Header :img="getUser().photoURL" :mode="'white'" />
    <div class="main">
      <form @submit.prevent="purchase" id="payment-form" class="payment shadow">
        <h3 class="subscribe-text">Subscribe for just $0,50/month</h3>

        <div ref="card" class="form-control pt-3 px-3 text-center"></div>

        <button
          :disabled="lockSubmit"
          class="button big btn-main shadow-sm"
          id="subBtn"
          type="submit"
          value="Subscribe"
        >Subscribe</button>
      </form>
    </div>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Header from "../components/multi-pages/Header";
import swal from 'sweetalert'
import utilities from '../helpers/utilities'
import firebase from 'firebase'
export default {
  name: "Subscription",
  components: {
    Header,
  },
  data() {
    return {
      backendUrl:
        `${process.env.VUE_APP_DOMAIN}/payment/`,
      spk:
        "pk_test_51HuKA0J1YBMak5vmu4kTKH0t32DNFWrkjaZIe2Tzcu6KF2lqzro7KJp6kA9G29wkCGWafrlILXAweAZHuFJdUxg600WqPMhPpa",
      stripe: undefined,
      card: undefined,
      lockSubmit: false,
    };
  },
  methods: {
    buttonLoad() {
        let btn = document.getElementById("subBtn")
        let item = btn.childNodes[0]

        btn.removeChild(item)
        btn.innerHTML = `<div class="text-center"><div class="spinner-border text-light" style="width: 1.2rem; height: 1.2rem;"  role="status"></div></div>`
    },
    getUser() {
      let userInfo = JSON.parse(localStorage.getItem("AuthUser"));
      return userInfo;
    },
    async purchase() {      
      this.lockSubmit = true
      
      let userInfo = JSON.parse(localStorage.getItem("AuthUser"));
      let userEmail = userInfo.email;

      const result = await this.stripe.createPaymentMethod({
        type: "card",
        card: this.card,
        billing_details: {
          email: userEmail,
        },
      });

      if (result.error) {
        swal("Oops..",`${result.error.message}`, "error");
      } else {
          this.buttonLoad()
        const res = await axios.post(`${this.backendUrl}sub`, {
          payment_method: result.paymentMethod.id,
          email: userEmail,
        });

        const status = res.data.status;
       
        if (status == "active") this.$router.push("/dashboard");
      }
    },
  },
  async beforeMount(){
    var user = firebase.auth().currentUser
    if(user != undefined && user != null) var userInfo = user
    else  userInfo = JSON.parse(localStorage.getItem("AuthUser"))

    let userEmail = userInfo.email;
    utilities.checkUserSubscription(userEmail)
      .then(async (sub) => {
          let subscription = await sub 
        if (subscription != undefined) this.$router.push("/dashboard")
        else console.log('ㅤㅤㅤㅤㅤWelcome!')
      })
      .catch((e) => utilities.showError(e));
  },
  async mounted() {
    this.stripe = await loadStripe(this.spk);
    this.card = this.stripe.elements().create("card");
    this.card.mount(this.$refs.card);
  },
};
</script>

<style scoped>
.main {
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 83vh;
  justify-content: center;
}
.subscribe-text {
  font-family: "Inter", sans-serif;
  font-size: 23px;
  font-weight: bold;
}
.payment {
  width: 400px;
  height: 300px;
  border-radius: 4px;
  padding: 3em 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.form-control{
    min-height: 50px;
}
.big {
  width: 365px;
  height: 50.4px;
  padding: 0.5em 0;
}
.big:active {
  background-color: aliceblue;
}
@media only screen and (max-width: 550px){
    .payment{
        width: 350px;
    }
    .subscribe-text{
        font-size: 20px;
    }
    .big{
        width: 325px;
    }
}
</style>