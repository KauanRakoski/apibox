<template>
  <div>
    <Header :img="getUser().photoURL" :mode="'white'" />
    <div class="main">
      <form id="payment-form" class="payment shadow">
        <h3 class="subscribe-text">Subscribe for just $0,50</h3>
        <div ref="card" class="form-control"></div>
        <input
          :disabled="lockSubmit"
          class="button big btn-main shadow-sm"
          type="submit"
          value="Subscribe"
          v-on:click.prevent="purchase"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Header from "../components/multi-pages/Header";
/* import utilities from '../helpers/utilites' */

export default {
  name: "Subscription",
  components: {
    Header,
  },
  data() {
    return {
      backendUrl:
        "https://3030-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io/payment/",
      spk:
        "pk_test_51HuKA0J1YBMak5vmu4kTKH0t32DNFWrkjaZIe2Tzcu6KF2lqzro7KJp6kA9G29wkCGWafrlILXAweAZHuFJdUxg600WqPMhPpa",
      stripe: undefined,
      card: undefined,
      lockSubmit: false,
      api: "https://yourdomain.com/api/",
    };
  },
  methods: {
    getUser() {
      let userInfo = JSON.parse(localStorage.getItem("AuthUser"));

      return userInfo;
    },
    async purchase() {
      this.lockSubmit = true;

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
        console.log(result.error.message);
      } else {
        const res = await axios.post(`${this.backendUrl}sub`, {
          payment_method: result.paymentMethod.id,
          email: userEmail,
        });

        const status = res.data.status;
        console.log(res.data);

        if (status == "active") this.$router.push("/dashboard");
      }
    },
  },
  /* beforeMount(){
    let userInfo = JSON.parse(localStorage.getItem("AuthUser"));
    let userEmail = userInfo.email;

    let subscription = utilities.checkUserSubscription(userEmail).then(sub => {return sub})
    if(subscription != undefined) this.$router.push('/dashboard') 
  }, */
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
  font-weight: bold;
}
.payment {
  width: 400px;
  border-radius: 4px;
  padding: 3em 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-control {
  padding: 1em;
  margin: 10px;
}
.big {
  width: 365px;
  padding: 0.5em 0;
}
</style>