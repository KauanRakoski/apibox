<template>
  <div>
    <Header v-bind:img="getUser().photoURL" :mode="'blue'"/>
    <div class="hello">
      <h1><span class="secondary">Welcome,</span><br> {{ getUser().displayName }}.</h1>
    </div>

    <div class="tasks">
        <h2>Here are your tasks:</h2>
      <div class="task-container" v-for="task in UserTasks" :key="task">
        <transition name="appear">
          <Task v-bind:content="task" v-on:refresh-tasks="f" />
        </transition>
      </div>

    </div>
    
    <div class="newTask" >
    <router-link to="/new">
        <button class="add-btn">Create a New Task</button>
    </router-link>
    </div>

    <Footer/>
  </div>
</template>

<script>
import firebase from "firebase";
import Header from "../components/multi-pages/Header";
import Footer from '../components/multi-pages/Footer'
import Task from "../components/Task";
import utilities from "../helpers/utilites";

export default {
  name: "Dashboard",
  components: {
    Header,
    Task,
    Footer
  },
  data() {
    return {
      fetchUrl:
        "https://3030-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io/getdata/",
      UserTasks: null,
    };
  },
  methods: {
    getUser() {
      let userInfo = localStorage.getItem("AuthUser");
      return JSON.parse(userInfo);
    },
    async fetchUserData(user) {
      try {
        let tasks = await fetch(`${this.fetchUrl + user}/`, { method: "POST" });
        let json = await tasks.json();

        this.UserTasks = json;
        console.log(this.UserTasks);
      } catch (e) {
        console.log(e);
      }
    },
    async f(taskId) {
      fetch(
        `https://3030-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io/delete/${taskId}`,
        { method: "POST" }
      ).then(() => {
        this.fetchUserData(this.getUser().uid);
      });
    },
  },
  async mounted() {
    this.user = firebase.auth().currentUser || false;

    if (this.user) {
      localStorage.setItem("AuthUser", JSON.stringify(this.user));

      let subscription = await utilities.checkUserSubscription(this.user.email);
      if (subscription == undefined) this.$router.push("/subscribe");
      console.log("Subscription is " + subscription)
      this.fetchUserData(this.user.uid);
    } else {
      let subscription = await utilities.checkUserSubscription(this.user.email);
      console.log("Subscription is " + subscription)
      if (subscription == undefined) this.$router.push("/subscribe");
      this.fetchUserData(this.getUser().uid);
    }
  },
};
</script>

<style scoped>
.hello {
  padding: 1.5em 1em;
  font-family: "Inter", sans-serif;
  background-color: #4460f1;
}
.hello .secondary{
  font-size: 21px;
  font-weight: 500;
}
.newTask{
    width: 100%;
    display: flex;
    justify-content: center;
    text-decoration: none;
}
.add-btn{
    margin-top: 20px;
    cursor: pointer;
    border-radius: 40px;
    padding: 0.9em 1.2em;
    background-color: #ffffff;
    border: 2px solid #4460f1;
    font-family: "Inter", sans-serif;
    font-size: 17px;
    color: #4460f1;
    text-decoration: none;
    font-weight: 400;
    font-family: "Inter", sans-serif;
}
h1 {
  font-weight: 400;
  font-size: 30px;
  margin-bottom: 9px;
  color: white;
}
h2 {
  color: white;
  font-weight: 300;
  font-size: 20px;
}
.tasks {
  background-image: linear-gradient(
    to bottom,
    #4460f1,
    #4460f1 100px,
    transparent 100px,
    transparent 100px
  );
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.task-container {
  margin-bottom: 1em;
  z-index: 99;
}
.appear-enter-active,
.appear-leave-active {
  transition: opacity 0.5s;
}
.appear-enter,
.appear-leave-to {
  opacity: 0;
}
</style>
