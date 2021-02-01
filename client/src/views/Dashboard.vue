<template>
  <div>
    <Header />
    <div class="hello">
      <h1>Welcome, {{ getUser().displayName }}.</h1>
      <h2>Here are your tasks:</h2>
    </div>

    <div class="tasks">
      <div class="task-container" v-for="task in UserTasks" :key="task">
        <transition name="appear">
          <Task v-bind:content="task" v-on:refresh-tasks="f" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import Header from "../components/Header"
import Task from "../components/Task"
import utilities from '../helpers/utilites'


export default {
  name: "Dashboard",
  components: {
    Header,
    Task,
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
  mounted() {
    var subscription = utilities.checkUserSubscription(this.getUser().email)
    console.log(subscription)
    
    
    this.user = firebase.auth().currentUser;

    if (this.user !== null && this.user !== undefined) {
      localStorage.setItem("AuthUser", JSON.stringify(this.user));
      this.fetchUserData(this.user.uid);
    } else {
      this.fetchUserData(this.getUser().uid);
    }
  },
};
</script>

<style>
.hello {
  padding: 1.5em 1em;
  font-family: "Inter", sans-serif;
}
h1 {
  font-weight: 400;
  font-size: 30px;
  margin-bottom: 9px;
}
h2 {
  font-weight: 300;
  font-size: 25px;
}
.tasks {
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.task-container {
  margin-bottom: 1em;
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
