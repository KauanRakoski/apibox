<template>
  <div>
    <Header mode="white" :img="getUser().photoURL" />
    <main>
      <div class="basic-info shadow">
        <img
          :src="getUser().photoURL"
          class="rounded"
          width="150px"
          height="150px"
        />

        <div>
          <h3>{{ user.displayName }}</h3>
          <span>
              <i class="fi-rr-envelope"></i>
              <p>{{user.email}}</p>
          </span>
          
          <div>
              <button class="button btn-main mx-3" id="li1" @click="logOut(true)">Sign Out</button>
              <button @click="deleteCustomer()" id="li2" class="button btn-second">Unsubscribe</button>
          </div>
        </div>
      </div>

      <div class="routes rounded shadow">
        <h3 class="mb-1">Allowed routes</h3>
        <span class="mb-1 ml-2 text-muted">These are the routes that are allowed to send requests and run your tasks. 
            <span class="add-route" @click="registerApiRoute()">Add a route by clicking here</span>
        </span><br>

        
        <a class="btn btn-main mb-1 ml-2" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
            Show routes
        </a>    

        <div class="collapse mt-2" id="collapseExample">
            <div class="card card-body mb-2 d-flex flex-row justify-content-between align-items-center" v-for="r in usR" :key="r">
                {{ r }}                
                <button @click="deleteRoute(r)" class="btn btn-danger">
                    Delete
                </button>
            </div>
        </div>
        
      </div>
      
    </main>
  </div>
</template>

<script>
import Header from "../components/multi-pages/Header";
import axios from "axios";
import firebase from 'firebase'
import Swal from 'sweetalert2'
import utilities from '../helpers/utilities';

export default {
  name: "Settings",
  components: {
    Header,
  },
  data() {
    return {
      usR: null,
      customerId: '',
      baseURL: `${process.env.VUE_APP_DOMAIN}`
    };
  },
  computed: {
      user(){
          return this.getUser()
      }
  },
  methods: {
    getUser() {
      return JSON.parse(localStorage.getItem("apibox-user"));
    },
    spinner(id) {
      let item = document.getElementById(id);
      item.removeChild(item.childNodes[0]);

      item.innerHTML = `<div class="text-center"><div class="spinner-border text-primary" style="width: 1.2rem; height: 1.2rem;" role="status"></div></div>`;
    },
    validateUrl(str) {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    },
    async registerApiRoute() {
    const user = JSON.parse(localStorage.getItem('apibox-user'))

    const {value: url} = await Swal.fire({
        input: 'url',
        inputLabel: 'URL address',
        inputPlaceholder: 'Enter the URL'
    })

    if(url){
        console.log(url)
        axios.post(`${this.baseURL}/user/route`, { uid: user.uid, route: url })
    }
    },
    logOut(param) {
      if (param) this.spinner("li1");
      firebase.auth().signOut();
      localStorage.removeItem("AuthUser");
    },
    deleteCustomer(){
        Swal.fire({
            title: 'Are you sure?',
            text: "This action can not be undone. All your data will be deleted",
            icon: 'warning',
        })
        .then(result => {
            if(result.isConfirmed){
                this.spinner("li2")

                let userData = JSON.parse(localStorage.getItem("AuthUser"))
                axios.post( `${this.baseURL}/payment/cancel`,
                    {cid: this.customerId, uid: userData.uid}
                ).then(this.logOut(false))
            }
        })
    },
    deleteRoute(route){
        const user = JSON.parse(localStorage.getItem('AuthUser'))
        var index = this.usR.indexOf(route)
        
        axios.post(`${this.baseURL}/user/del-route`, { uid: user.uid, index})
        .then((res) => {
            if(!res.error){
                axios.post(`${this.baseURL}/user/routes`,
                    { uid: user.uid }
                )
                .then((routes) => {this.usR = routes.data})
            }
        }).catch(e => utilities.showError(e))
    }
  },
  
  mounted() {
      utilities.checkUserSubscription(this.getUser().email)
      .then(async(sub) => {
          let subscription = await sub
        if (subscription == undefined) this.$router.push("/subscribe")
        else this.customerId = subscription.id
      })
      .catch((e) => utilities.showError(e))

    axios
      .post(
        `${this.baseURL}/user/routes`,
        { uid: this.getUser().uid }
      )
      .then((routes) => {
        this.usR = routes.data
      })
  },
};
</script>

<style scoped>
main {
  margin-top: 150px;  
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
}
.basic-info {
  display: flex;
  border-radius: 10px;
  background-color: #ffffff;
  width: 500px;
}
.basic-info h3 {
  font-family: "Inter", sans-serif;
  margin: 10px 0 5px 15px;
}
.basic-info span {
  margin: 10px 0 15px 15px;
  display: flex;
  align-items: center;
}
.basic-info p{
    margin: -3px 0 0 5px;
    font-size: 18px;
}
.routes {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 1em;
}
.routes h3 {
  font-family: "Inter", sans-serif;
  margin-top: 10px;
  margin-left: 10px;
}
.routes p {
  padding: 0.1em;
  margin-left: 16px;
  font-family: "Inter", sans-serif;
}
.add-route{
    color: #0056b3;
    cursor: pointer;
}
.route-container {
  display: flex;
  align-items: center;
}
@media only screen and (max-width: 600px){
    main{
        margin-top: 60px;
    }
    .basic-info{
        padding: 1em;
        width: 360px;
    }
    img{
        display: none;
    }
    .routes{
        width: 360px;
    }
}
</style>